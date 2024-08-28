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
} from "../../../common";

export interface FlashLoanSimpleReceiverBaseInterface extends Interface {
  getFunction(
    nameOrSignature: "ADDRESSES_PROVIDER" | "POOL" | "executeOperation"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "ADDRESSES_PROVIDER",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "POOL", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "executeOperation",
    values: [AddressLike, BigNumberish, BigNumberish, AddressLike, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "ADDRESSES_PROVIDER",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "POOL", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "executeOperation",
    data: BytesLike
  ): Result;
}

export interface FlashLoanSimpleReceiverBase extends BaseContract {
  connect(runner?: ContractRunner | null): FlashLoanSimpleReceiverBase;
  waitForDeployment(): Promise<this>;

  interface: FlashLoanSimpleReceiverBaseInterface;

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

  ADDRESSES_PROVIDER: TypedContractMethod<[], [string], "view">;

  POOL: TypedContractMethod<[], [string], "view">;

  executeOperation: TypedContractMethod<
    [
      asset: AddressLike,
      amount: BigNumberish,
      premium: BigNumberish,
      initiator: AddressLike,
      params: BytesLike
    ],
    [boolean],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "ADDRESSES_PROVIDER"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "POOL"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "executeOperation"
  ): TypedContractMethod<
    [
      asset: AddressLike,
      amount: BigNumberish,
      premium: BigNumberish,
      initiator: AddressLike,
      params: BytesLike
    ],
    [boolean],
    "nonpayable"
  >;

  filters: {};
}