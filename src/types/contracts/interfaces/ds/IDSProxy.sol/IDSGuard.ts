/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../../../../common";

export interface IDSGuardInterface extends Interface {
  getFunction(
    nameOrSignature: "canCall" | "forbid" | "permit"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "canCall",
    values: [AddressLike, AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "forbid",
    values: [AddressLike, AddressLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "permit",
    values: [AddressLike, AddressLike, BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "canCall", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "forbid", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;
}

export interface IDSGuard extends BaseContract {
  connect(runner?: ContractRunner | null): IDSGuard;
  waitForDeployment(): Promise<this>;

  interface: IDSGuardInterface;

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

  canCall: TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike, arg2: BytesLike],
    [boolean],
    "view"
  >;

  forbid: TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike, arg2: BytesLike],
    [void],
    "nonpayable"
  >;

  permit: TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike, arg2: BytesLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "canCall"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike, arg2: BytesLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "forbid"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike, arg2: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "permit"
  ): TypedContractMethod<
    [arg0: AddressLike, arg1: AddressLike, arg2: BytesLike],
    [void],
    "nonpayable"
  >;

  filters: {};
}
