import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import {
  deployBaseServices,
  deployVault,
} from "../common";


describe.only("Vault", function () {

    async function deployFunction() {

        const [owner, otherAccount] = await ethers.getSigners();
        const { erc20, proxyRegistry, weth, stack, serviceRegistry } = await deployBaseServices(owner.address);
    
        const serviceRegistryAddress = await serviceRegistry.getAddress();

        const Leverage = await ethers.getContractFactory("Leverage");
        const levarage = await Leverage.deploy();
        await levarage.waitForDeployment();
        const vault = await deployVault(owner.address, serviceRegistryAddress,await levarage.getAddress() );
        console.log("Deployed vault", await vault.getAddress());

        // 1. Deploy Flash Lender 
        const flashLender = await deployFlashLender(serviceRegistry, weth);
        console.log("Deployed Flash Lender", await flashLender.getAddress());
        

        // 2. Deploy stETH 
        const { stETH, STETH_MAX_SUPPLY } = await deployStEth(owner);
        console.log("Deployed stETH", await stETH.getAddress());
   
        // 3. Deploy WETH -> stETH Swapper
        const { swapperAddress, swapper } = await deploySwapper(weth, stETH, serviceRegistry, STETH_MAX_SUPPLY);
        console.log("Deployed swapper", await swapper.getAddress());

        // 4. Deploy AAVEv3 Mock Pool
        const aaveV3PoolMock = await deployAaveV3(stETH, weth, serviceRegistry, swapperAddress);
        
        return {
          erc20,
          stETH,
          weth,
          owner,
          otherAccount,
          proxyRegistry,
          stack,
          serviceRegistry,
          vault,
          swapper,
          aave3Pool: aaveV3PoolMock, 
          flashLender,
        };
      }
    

      it("Test Deposit", async function (){ 
        const {
            owner,
            erc20,
            weth,
            serviceRegistry,
            otherAccount,
            vault,
        } = await loadFixture(deployFunction);
        
        const depositAmount =  ethers.parseUnits("10", 18);

        await vault.deposit(otherAccount.address, {
            value: depositAmount,
        });

        expect(await vault.symbol()).to.equal("lndETH");
        expect(await vault.name()).to.equal("laundromat ETH");
        expect(await vault.totalSupply()).to.equal( ethers.parseUnits("10", 18));
        expect(await weth.balanceOf(await vault.getAddress())).to.equal(depositAmount);
        expect(await vault.balanceOf(otherAccount.address)).to.equal(depositAmount);

      })

})


async function deployAaveV3(stETH, weth, serviceRegistry, swapperAddress: string) {
    const AaveV3PoolMock = await ethers.getContractFactory("AaveV3PoolMock");
    const aaveV3PoolMock = await AaveV3PoolMock.deploy(
        await stETH.getAddress(),
        await weth.getAddress()
    );
    await aaveV3PoolMock.waitForDeployment();
    const aaveV3PoolAddress = await aaveV3PoolMock.getAddress();
    serviceRegistry.registerService(
        ethers.keccak256(Buffer.from("AAVE_V3")),
        swapperAddress
    );
    // Deposit 10000 ETH on the pool to be borrowed
    await weth.deposit?.call("", { value: ethers.parseUnits("10000", 18) });
    weth.transfer(aaveV3PoolAddress, ethers.parseUnits("10000", 18));
    return aaveV3PoolMock;
}

async function deploySwapper(weth, stETH, serviceRegistry, STETH_MAX_SUPPLY: bigint) {
    const SwapHandlerMock = await ethers.getContractFactory("SwapHandlerMock");
    const swapper = await SwapHandlerMock.deploy(
        await weth.getAddress(),
        await stETH.getAddress()
    );
    await swapper.waitForDeployment();
    const swapperAddress = await swapper.getAddress();
    serviceRegistry.registerService(
        ethers.keccak256(Buffer.from("SwapHandler")),
        swapperAddress
    );
    await stETH.transfer(STETH_MAX_SUPPLY, swapperAddress);
    console.log(" swapper",STETH_MAX_SUPPLY, swapperAddress);
    return { swapperAddress, swapper };
}

async function deployStEth(owner) {
    const STETHMock = await ethers.getContractFactory("ERC20Mock");
    const STETH_MAX_SUPPLY = ethers.parseUnits("1000000000", 18);
    const STETH_TOKEN_NAME = "Staked ETH";
    const STETH_TOKEN_SYMBOL = "stETH";

    const stETH = await STETHMock.deploy(
        STETH_TOKEN_NAME,
        STETH_TOKEN_SYMBOL,
        STETH_MAX_SUPPLY,
        owner
    );
    await stETH.waitForDeployment();
    return { stETH, STETH_MAX_SUPPLY };
}

async function deployFlashLender(serviceRegistry, weth) {
    const MockFlashLender = await ethers.getContractFactory("MockFlashLender");
    const flashLender = await MockFlashLender.deploy(await weth.getAddress());
    await flashLender.waitForDeployment();
    const flashLenderAddress = await flashLender.getAddress();
    serviceRegistry.registerService(
        ethers.keccak256(Buffer.from("FlashLender")),
        flashLenderAddress
    );
    
    // Deposit on Flash Lender 10000 WETH 
    await weth.deposit?.call("", { value: ethers.parseUnits("10000", 18) });
    weth.transfer(flashLender, ethers.parseUnits("10000", 18));
    return flashLender;
}
