/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../../common";

export declare namespace ISwapHandler {
  export type SwapParamsStruct = {
    underlyingIn: AddressLike;
    underlyingOut: AddressLike;
    mode: BigNumberish;
    amountIn: BigNumberish;
    amountOut: BigNumberish;
    payload: BytesLike;
  };

  export type SwapParamsStructOutput = [
    underlyingIn: string,
    underlyingOut: string,
    mode: bigint,
    amountIn: bigint,
    amountOut: bigint,
    payload: string
  ] & {
    underlyingIn: string;
    underlyingOut: string;
    mode: bigint;
    amountIn: bigint;
    amountOut: bigint;
    payload: string;
  };
}

export interface UniV3SwapperInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addFeeTier"
      | "executeSwap"
      | "getFeeTier"
      | "owner"
      | "removeFeeTier"
      | "renounceOwnership"
      | "transferOwnership"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "OwnershipTransferred" | "Swap"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "addFeeTier",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "executeSwap",
    values: [ISwapHandler.SwapParamsStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "getFeeTier",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "removeFeeTier",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(functionFragment: "addFeeTier", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "executeSwap",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getFeeTier", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeFeeTier",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SwapEvent {
  export type InputTuple = [
    assetIn: AddressLike,
    assetOut: AddressLike,
    assetInAmount: BigNumberish,
    assetOutAmount: BigNumberish
  ];
  export type OutputTuple = [
    assetIn: string,
    assetOut: string,
    assetInAmount: bigint,
    assetOutAmount: bigint
  ];
  export interface OutputObject {
    assetIn: string;
    assetOut: string;
    assetInAmount: bigint;
    assetOutAmount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface UniV3Swapper extends BaseContract {
  connect(runner?: ContractRunner | null): UniV3Swapper;
  waitForDeployment(): Promise<this>;

  interface: UniV3SwapperInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  addFeeTier: TypedContractMethod<
    [fromToken: AddressLike, toToken: AddressLike, fee: BigNumberish],
    [void],
    "nonpayable"
  >;

  executeSwap: TypedContractMethod<
    [params: ISwapHandler.SwapParamsStruct],
    [bigint],
    "nonpayable"
  >;

  getFeeTier: TypedContractMethod<
    [fromToken: AddressLike, toToken: AddressLike],
    [bigint],
    "view"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  removeFeeTier: TypedContractMethod<
    [fromToken: AddressLike, toToken: AddressLike],
    [void],
    "nonpayable"
  >;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "addFeeTier"
  ): TypedContractMethod<
    [fromToken: AddressLike, toToken: AddressLike, fee: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "executeSwap"
  ): TypedContractMethod<
    [params: ISwapHandler.SwapParamsStruct],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getFeeTier"
  ): TypedContractMethod<
    [fromToken: AddressLike, toToken: AddressLike],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "removeFeeTier"
  ): TypedContractMethod<
    [fromToken: AddressLike, toToken: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "Swap"
  ): TypedContractEvent<
    SwapEvent.InputTuple,
    SwapEvent.OutputTuple,
    SwapEvent.OutputObject
  >;

  filters: {
    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "Swap(address,address,uint256,uint256)": TypedContractEvent<
      SwapEvent.InputTuple,
      SwapEvent.OutputTuple,
      SwapEvent.OutputObject
    >;
    Swap: TypedContractEvent<
      SwapEvent.InputTuple,
      SwapEvent.OutputTuple,
      SwapEvent.OutputObject
    >;
  };
}
