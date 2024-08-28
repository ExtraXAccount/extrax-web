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
} from "../../common";

export interface IGnosisSafeProxyFactoryInterface extends Interface {
  getFunction(nameOrSignature: "createProxyWithNonce"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createProxyWithNonce",
    values: [AddressLike, BytesLike, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "createProxyWithNonce",
    data: BytesLike
  ): Result;
}

export interface IGnosisSafeProxyFactory extends BaseContract {
  connect(runner?: ContractRunner | null): IGnosisSafeProxyFactory;
  waitForDeployment(): Promise<this>;

  interface: IGnosisSafeProxyFactoryInterface;

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

  createProxyWithNonce: TypedContractMethod<
    [_singleton: AddressLike, initializer: BytesLike, saltNonce: BigNumberish],
    [string],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "createProxyWithNonce"
  ): TypedContractMethod<
    [_singleton: AddressLike, initializer: BytesLike, saltNonce: BigNumberish],
    [string],
    "nonpayable"
  >;

  filters: {};
}