/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
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
} from "../../common";

export interface LockInterface extends Interface {
  getFunction(
    nameOrSignature: "isLocked" | "lock" | "unlock" | "whoLocked"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "isLocked", values?: undefined): string;
  encodeFunctionData(functionFragment: "lock", values?: undefined): string;
  encodeFunctionData(functionFragment: "unlock", values?: undefined): string;
  encodeFunctionData(functionFragment: "whoLocked", values?: undefined): string;

  decodeFunctionResult(functionFragment: "isLocked", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "lock", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "unlock", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "whoLocked", data: BytesLike): Result;
}

export interface Lock extends BaseContract {
  connect(runner?: ContractRunner | null): Lock;
  waitForDeployment(): Promise<this>;

  interface: LockInterface;

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

  isLocked: TypedContractMethod<[], [boolean], "view">;

  lock: TypedContractMethod<[], [void], "nonpayable">;

  unlock: TypedContractMethod<[], [void], "nonpayable">;

  whoLocked: TypedContractMethod<[], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "isLocked"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "lock"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "unlock"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "whoLocked"
  ): TypedContractMethod<[], [string], "view">;

  filters: {};
}
