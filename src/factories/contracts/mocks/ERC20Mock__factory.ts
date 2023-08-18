/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  BigNumberish,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type {
  ERC20Mock,
  ERC20MockInterface,
} from "../../../contracts/mocks/ERC20Mock";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_cap",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000ea238038062000ea2833981016040819052620000349162000277565b838360036200004483826200039a565b5060046200005382826200039a565b505050620000706200006a6200009160201b60201c565b62000095565b6200007c8183620000e7565b620000878162000095565b505050506200048e565b3390565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b038216620001425760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b806002600082825462000156919062000466565b90915550506001600160a01b038216600081815260208181526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b505050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620001da57600080fd5b81516001600160401b0380821115620001f757620001f7620001b2565b604051601f8301601f19908116603f01168101908282118183101715620002225762000222620001b2565b816040528381526020925086838588010111156200023f57600080fd5b600091505b8382101562000263578582018301518183018401529082019062000244565b600093810190920192909252949350505050565b600080600080608085870312156200028e57600080fd5b84516001600160401b0380821115620002a657600080fd5b620002b488838901620001c8565b95506020870151915080821115620002cb57600080fd5b50620002da87828801620001c8565b60408701516060880151919550935090506001600160a01b03811681146200030157600080fd5b939692955090935050565b600181811c908216806200032157607f821691505b6020821081036200034257634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620001ad57600081815260208120601f850160051c81016020861015620003715750805b601f850160051c820191505b8181101562000392578281556001016200037d565b505050505050565b81516001600160401b03811115620003b657620003b6620001b2565b620003ce81620003c784546200030c565b8462000348565b602080601f831160018114620004065760008415620003ed5750858301515b600019600386901b1c1916600185901b17855562000392565b600085815260208120601f198616915b82811015620004375788860151825594840194600190910190840162000416565b5085821015620004565787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b808201808211156200048857634e487b7160e01b600052601160045260246000fd5b92915050565b610a04806200049e6000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c8063715018a61161008c578063a457c2d711610066578063a457c2d7146101cd578063a9059cbb146101e0578063dd62ed3e146101f3578063f2fde38b1461020657600080fd5b8063715018a6146101a05780638da5cb5b146101aa57806395d89b41146101c557600080fd5b806323b872dd116100c857806323b872dd14610142578063313ce56714610155578063395093511461016457806370a082311461017757600080fd5b806306fdde03146100ef578063095ea7b31461010d57806318160ddd14610130575b600080fd5b6100f7610219565b604051610104919061084e565b60405180910390f35b61012061011b3660046108b8565b6102ab565b6040519015158152602001610104565b6002545b604051908152602001610104565b6101206101503660046108e2565b6102c5565b60405160128152602001610104565b6101206101723660046108b8565b6102e9565b61013461018536600461091e565b6001600160a01b031660009081526020819052604090205490565b6101a861030b565b005b6005546040516001600160a01b039091168152602001610104565b6100f761031f565b6101206101db3660046108b8565b61032e565b6101206101ee3660046108b8565b6103ae565b610134610201366004610940565b6103bc565b6101a861021436600461091e565b6103e7565b60606003805461022890610973565b80601f016020809104026020016040519081016040528092919081815260200182805461025490610973565b80156102a15780601f10610276576101008083540402835291602001916102a1565b820191906000526020600020905b81548152906001019060200180831161028457829003601f168201915b5050505050905090565b6000336102b9818585610460565b60019150505b92915050565b6000336102d3858285610584565b6102de8585856105fe565b506001949350505050565b6000336102b98185856102fc83836103bc565b61030691906109ad565b610460565b6103136107a2565b61031d60006107fc565b565b60606004805461022890610973565b6000338161033c82866103bc565b9050838110156103a15760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084015b60405180910390fd5b6102de8286868403610460565b6000336102b98185856105fe565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6103ef6107a2565b6001600160a01b0381166104545760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610398565b61045d816107fc565b50565b6001600160a01b0383166104c25760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610398565b6001600160a01b0382166105235760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610398565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b600061059084846103bc565b905060001981146105f857818110156105eb5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610398565b6105f88484848403610460565b50505050565b6001600160a01b0383166106625760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610398565b6001600160a01b0382166106c45760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610398565b6001600160a01b0383166000908152602081905260409020548181101561073c5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610398565b6001600160a01b03848116600081815260208181526040808320878703905593871680835291849020805487019055925185815290927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a36105f8565b6005546001600160a01b0316331461031d5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610398565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600060208083528351808285015260005b8181101561087b5785810183015185820160400152820161085f565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b03811681146108b357600080fd5b919050565b600080604083850312156108cb57600080fd5b6108d48361089c565b946020939093013593505050565b6000806000606084860312156108f757600080fd5b6109008461089c565b925061090e6020850161089c565b9150604084013590509250925092565b60006020828403121561093057600080fd5b6109398261089c565b9392505050565b6000806040838503121561095357600080fd5b61095c8361089c565b915061096a6020840161089c565b90509250929050565b600181811c9082168061098757607f821691505b6020821081036109a757634e487b7160e01b600052602260045260246000fd5b50919050565b808201808211156102bf57634e487b7160e01b600052601160045260246000fdfea26469706673582212205b2554c2443637cf2f23b65f00c36f5814c4451eedb18d58b53b91d4dcd64b3364736f6c63430008120033";

type ERC20MockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC20MockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC20Mock__factory extends ContractFactory {
  constructor(...args: ERC20MockConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    name: string,
    symbol: string,
    _cap: BigNumberish,
    owner: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      name,
      symbol,
      _cap,
      owner,
      overrides || {}
    );
  }
  override deploy(
    name: string,
    symbol: string,
    _cap: BigNumberish,
    owner: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(name, symbol, _cap, owner, overrides || {}) as Promise<
      ERC20Mock & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ERC20Mock__factory {
    return super.connect(runner) as ERC20Mock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20MockInterface {
    return new Interface(_abi) as ERC20MockInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): ERC20Mock {
    return new Contract(address, _abi, runner) as unknown as ERC20Mock;
  }
}
