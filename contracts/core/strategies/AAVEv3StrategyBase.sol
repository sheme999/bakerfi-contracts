// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC3156FlashBorrower.sol";
import "@openzeppelin/contracts/interfaces/IERC3156FlashLender.sol";
import {SafeMath} from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {ServiceRegistry} from "../../core/ServiceRegistry.sol";
import {IWETHAdapter} from "../../interfaces/core/IWETHAdapter.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {WETH_CONTRACT, PERCENTAGE_PRECISION, WSTETH_ETH_ORACLE, AAVE_V3, FLASH_LENDER, SWAP_HANDLER, ST_ETH_CONTRACT, WST_ETH_CONTRACT} from "../Constants.sol";
import {Rebase, RebaseLibrary} from "../../libraries/BoringRebase.sol";
import {IWETH} from "../../interfaces/tokens/IWETH.sol";
import {IOracle} from "../../interfaces/core/IOracle.sol";
import {IWStETH} from "../../interfaces/lido/IWStETH.sol";
import {IPoolV3} from "../../interfaces/aave/v3/IPoolV3.sol";
import {ISwapHandler} from "../../interfaces/core/ISwapHandler.sol";
import "../../interfaces/aave/v3/DataTypes.sol";
import {IStrategy} from "../../interfaces/core/IStrategy.sol";
import {Leverage} from "../../libraries/Leverage.sol";
import {UseOracle, UseWETH, UseStETH, UseFlashLender, UseWstETH, UseAAVEv3, UseServiceRegistry, UseSwapper, UseIERC20} from "../Hooks.sol";

abstract contract AAVEv3StrategyBase is
    Ownable,
    IStrategy,
    IERC3156FlashBorrower,
    UseServiceRegistry,
    UseWETH,
    UseIERC20,
    UseAAVEv3,
    UseSwapper,
    UseFlashLender,
    UseOracle    
{
    event StrategyProfit(uint256 amount, uint256 deployedAmount);
    event StrategyLoss(uint256 amount, uint256 deployedAmount);

    uint256 private LOAN_TO_VALUE = 800 * 1e6;

    struct FlashLoanData {
        uint256 originalAmount;
        address receiver;
    }

    bytes32 constant SUCCESS_MESSAGE = keccak256("ERC3156FlashBorrower.onFlashLoan");

    using SafeERC20 for IERC20;
    using Leverage for uint256;
    using SafeMath for uint256;

    uint256 internal _pendingAmount = 0;
    uint256 private _deployedAmount = 0;

    constructor(
        address owner,
        ServiceRegistry registry,
        bytes32 collateralIERC20,
        bytes32 oracle
    )
        Ownable()
        UseServiceRegistry(registry)
        UseWETH(registry)
        UseIERC20(registry, collateralIERC20)
        UseAAVEv3(registry)
        UseSwapper(registry)
        UseFlashLender(registry)       
        UseOracle(registry, oracle)
    {
        require(owner != address(0), "Invalid Owner Address");
        _transferOwnership(owner);
    }

    receive() external payable {}

    function getPosition()
        external
        view
        returns (uint256 totalCollateralInEth, uint256 totalDebtInEth)
    {
        return _getPosition();
    }

    /**
     * Current capital owned by Share Holders
     * The amount of capital is equal to Total Collateral Value - Total Debt Value
     */
    function totalAssets() public view returns (uint256 totalOwnedAssets) {
        (uint256 totalCollateralInEth, uint256 totalDebtInEth) = _getPosition();
        totalOwnedAssets = totalCollateralInEth - totalDebtInEth;
    }

    /**
     * Deploy new Capital on the pool making it productive on the Lido
     */
    function deploy() external payable onlyOwner returns (uint256 deployedAmount) {
        require(msg.value != 0, "No Zero deposit Allower");
        // 1. Wrap Ethereum
        wETH().deposit{value: msg.value}();
        // 2. Initiate a WETH Flash Loan
        uint256 leverage = Leverage.calculateLeverageRatio(msg.value, LOAN_TO_VALUE, 10);
        uint256 loanAmount = leverage - msg.value;
        uint256 fee = flashLender().flashFee(wETHA(), loanAmount);
        uint256 allowance = wETH().allowance(address(this), flashLenderA());
        wETH().approve(flashLenderA(), loanAmount + fee + allowance);
        require(
            flashLender().flashLoan(
                IERC3156FlashBorrower(this),
                wETHA(),
                loanAmount,
                abi.encode(msg.value, msg.sender)
            ),
            "Failed to run Flash Loan"
        );
        deployedAmount = _pendingAmount;
        _deployedAmount = _deployedAmount.add(deployedAmount);
        _pendingAmount = 0;
    }

    /**
     * Flash Loan Callback
     *
     * @param initiator Flash Loan Requester
     * @param token Asset requested on the loan
     * @param amount Amount of the loan
     * @param fee  Fee to be paid to flash lender
     * @param callData Call data passed by the requester
     */
    function onFlashLoan(
        address initiator,
        address token,
        uint256 amount,
        uint256 fee,
        bytes memory callData
    ) external returns (bytes32) {
        require(initiator == address(this), "FlashBorrower: Untrusted loan initiator");
        require(token == wETHA(), "Invalid Flash Loan Asset");
        require(ierc20A() != address(0), "Invalid Output");
        FlashLoanData memory data = abi.decode(callData, (FlashLoanData));
        uint256 colAmount = _convertFromWETH(data.originalAmount + amount);
        // 3. Deposit Collateral and Borrow ETH
        supplyAndBorrow(ierc20A(), colAmount, wETHA(), amount + fee);
        uint256 collateralInETH = _toWETH(colAmount);
        _pendingAmount = collateralInETH - amount + fee;
        return SUCCESS_MESSAGE;
    }

    /**
     * Exit the full position and move the funds to the owner
     */
    function exit() external override onlyOwner returns (uint256 undeployedAmount) {
        uint256 amount = totalAssets();
        undeployedAmount = _undeploy(amount, payable(owner()));
    }

    /**
     * Undeploy an amount from the current position returning ETH to the
     * owner of the shares
     * @param amount Amount undeployed
     * @param receiver Receiver of the capital
     */
    function undeploy(
        uint256 amount,
        address payable receiver
    ) external onlyOwner returns (uint256 undeployedAmount) {
        undeployedAmount = _undeploy(amount, receiver);
    }

    function _adjustDebt(
        uint256 totalCollateralBaseInEth,
        uint256 totalDebtBaseInEth
    ) internal returns (uint256 deltaDebt) {
        uint256 numerator = totalDebtBaseInEth -
            (LOAN_TO_VALUE.mul(totalCollateralBaseInEth).div(PERCENTAGE_PRECISION));
        uint256 divisor = (PERCENTAGE_PRECISION - LOAN_TO_VALUE);
        deltaDebt = numerator.mul(PERCENTAGE_PRECISION).div(divisor);
        uint256 colPaidInDebt = _fromWETH(deltaDebt);
        repayWithAToken(ierc20A(), colPaidInDebt);
    }

    /**
     * Harvest a profit when there is a difference between the amount the strategy
     * predicts that is deployed and the real value
     */
    function harvest() external override onlyOwner returns (int256 balanceChange) {
        (uint256 totalCollateralBaseInEth, uint256 totalDebtBaseInEth) = _getPosition();
        uint256 ltv = 0;
        uint256 deltaDebt = 0;

        if (totalDebtBaseInEth > 0) {
            ltv = totalDebtBaseInEth.mul(PERCENTAGE_PRECISION).div(totalCollateralBaseInEth);
            if (ltv > LOAN_TO_VALUE && ltv < PERCENTAGE_PRECISION) {
                // Pay Debt to rebalance the position
                deltaDebt = _adjustDebt(totalCollateralBaseInEth, totalDebtBaseInEth);
            }
        }

        uint256 newDeployedAmount = (totalCollateralBaseInEth.sub(deltaDebt)).sub(
            totalDebtBaseInEth.sub(deltaDebt)
        );

        require(deltaDebt < totalCollateralBaseInEth, "Invalid DeltaDeb Calculated");

        if (newDeployedAmount == _deployedAmount) {
            return 0;
        }

        if (newDeployedAmount > _deployedAmount) {
            uint256 profit = newDeployedAmount - _deployedAmount;
            emit StrategyProfit(profit, newDeployedAmount);
            balanceChange = int256(profit);
        } else if (newDeployedAmount < _deployedAmount) {
            uint256 loss = _deployedAmount - newDeployedAmount;
            emit StrategyLoss(loss, newDeployedAmount);
            balanceChange = -int256(loss);
        }
        _deployedAmount = newDeployedAmount;
    }

    function _getPosition()
        internal
        view
        returns (uint256 totalCollateralInEth, uint256 totalDebtInEth)
    {
        (uint256 totalCollateralBase, uint256 totalDebtBase, , , , ) = aaveV3().getUserAccountData(
            address(this)
        );
        totalCollateralInEth = totalCollateralBase;
        totalDebtInEth = totalDebtBase;
    }

    /**
     * Pay the debt on loan position and removes some deployed capital in order to
     * pay back to the deployer
     *
     * @param percentageToBurn The percentage deployed to be removed from collateral position
     * debt
     */
    function _payDebtAndWithdraw(
        uint256 percentageToBurn
    ) internal returns (uint256 returnedCollateral) {
        (uint256 totalCollateralBaseInEth, uint256 totalDebtBaseInEth) = _getPosition();
        // 1. Pay Debt
        uint256 deltaDebt = (totalDebtBaseInEth).mul(percentageToBurn).div(PERCENTAGE_PRECISION);
        uint256 collateralPaid = _fromWETH(deltaDebt);
        repayWithAToken(ierc20A(), collateralPaid);
        // 2. Withdraw from AAVE Pool
        uint256 deltaCollateral = (totalCollateralBaseInEth).mul(percentageToBurn).div(
            PERCENTAGE_PRECISION
        );
        returnedCollateral = _fromWETH(deltaCollateral) - collateralPaid;
        aaveV3().withdraw(ierc20A(), returnedCollateral, address(this));
    }

    /**
     * Undeploy an amount from the current position returning ETH to the
     * owner of the shares
     *
     * @param amount The Amount undeployed from the position
     * @param receiver The Receiver of the amount witdrawed
     */
    function _undeploy(
        uint256 amount,
        address payable receiver
    ) private returns (uint256 undeployedAmount) {
        uint256 percentageToBurn = (amount).mul(PERCENTAGE_PRECISION).div(totalAssets());
        // 1. Rebalance Collateral Balance and Debt and return Collateral
        uint256 returnedCollateral = _payDebtAndWithdraw(percentageToBurn);
        // 2. Convert Collateral to WETH
        uint256 wETHAmount = _convertToWETH(returnedCollateral);
        // 3. Unwrap wETH
        unwrapWETH(wETHAmount);
        // 4. Withdraw ETh to Receiver
        (bool success, ) = payable(receiver).call{value: wETHAmount}("");
        require(success, "Failed to Send ETH Back");
        undeployedAmount = wETHAmount;
        _deployedAmount = _deployedAmount.sub(wETHAmount);
    }

    function _convertFromWETH(uint256 amount) internal virtual returns (uint256);

    function _convertToWETH(uint256 amount) internal virtual returns (uint256);
    
    function _toWETH(uint256 amountIn) internal view  returns (uint256 amountOut) {
        amountOut = amountIn.mul(oracle().getLatestPrice()).div(oracle().getPrecision());
    }

    function _fromWETH(uint256 amountIn) internal view returns (uint256 amountOut) {
        amountOut = amountIn.mul(oracle().getPrecision()).div(oracle().getLatestPrice());
    }
}
