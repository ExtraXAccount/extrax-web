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
} from "../../common";

export interface IPoolAddressesProviderRegistryInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "getAddressesProviderAddressById"
      | "getAddressesProviderIdByAddress"
      | "getAddressesProvidersList"
      | "registerAddressesProvider"
      | "unregisterAddressesProvider"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "AddressesProviderRegistered"
      | "AddressesProviderUnregistered"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "getAddressesProviderAddressById",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getAddressesProviderIdByAddress",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getAddressesProvidersList",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "registerAddressesProvider",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "unregisterAddressesProvider",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "getAddressesProviderAddressById",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAddressesProviderIdByAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAddressesProvidersList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerAddressesProvider",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unregisterAddressesProvider",
    data: BytesLike
  ): Result;
}

export namespace AddressesProviderRegisteredEvent {
  export type InputTuple = [addressesProvider: AddressLike, id: BigNumberish];
  export type OutputTuple = [addressesProvider: string, id: bigint];
  export interface OutputObject {
    addressesProvider: string;
    id: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace AddressesProviderUnregisteredEvent {
  export type InputTuple = [addressesProvider: AddressLike, id: BigNumberish];
  export type OutputTuple = [addressesProvider: string, id: bigint];
  export interface OutputObject {
    addressesProvider: string;
    id: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IPoolAddressesProviderRegistry extends BaseContract {
  connect(runner?: ContractRunner | null): IPoolAddressesProviderRegistry;
  waitForDeployment(): Promise<this>;

  interface: IPoolAddressesProviderRegistryInterface;

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

  getAddressesProviderAddressById: TypedContractMethod<
    [id: BigNumberish],
    [string],
    "view"
  >;

  getAddressesProviderIdByAddress: TypedContractMethod<
    [addressesProvider: AddressLike],
    [bigint],
    "view"
  >;

  getAddressesProvidersList: TypedContractMethod<[], [string[]], "view">;

  registerAddressesProvider: TypedContractMethod<
    [provider: AddressLike, id: BigNumberish],
    [void],
    "nonpayable"
  >;

  unregisterAddressesProvider: TypedContractMethod<
    [provider: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "getAddressesProviderAddressById"
  ): TypedContractMethod<[id: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "getAddressesProviderIdByAddress"
  ): TypedContractMethod<[addressesProvider: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getAddressesProvidersList"
  ): TypedContractMethod<[], [string[]], "view">;
  getFunction(
    nameOrSignature: "registerAddressesProvider"
  ): TypedContractMethod<
    [provider: AddressLike, id: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "unregisterAddressesProvider"
  ): TypedContractMethod<[provider: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "AddressesProviderRegistered"
  ): TypedContractEvent<
    AddressesProviderRegisteredEvent.InputTuple,
    AddressesProviderRegisteredEvent.OutputTuple,
    AddressesProviderRegisteredEvent.OutputObject
  >;
  getEvent(
    key: "AddressesProviderUnregistered"
  ): TypedContractEvent<
    AddressesProviderUnregisteredEvent.InputTuple,
    AddressesProviderUnregisteredEvent.OutputTuple,
    AddressesProviderUnregisteredEvent.OutputObject
  >;

  filters: {
    "AddressesProviderRegistered(address,uint256)": TypedContractEvent<
      AddressesProviderRegisteredEvent.InputTuple,
      AddressesProviderRegisteredEvent.OutputTuple,
      AddressesProviderRegisteredEvent.OutputObject
    >;
    AddressesProviderRegistered: TypedContractEvent<
      AddressesProviderRegisteredEvent.InputTuple,
      AddressesProviderRegisteredEvent.OutputTuple,
      AddressesProviderRegisteredEvent.OutputObject
    >;

    "AddressesProviderUnregistered(address,uint256)": TypedContractEvent<
      AddressesProviderUnregisteredEvent.InputTuple,
      AddressesProviderUnregisteredEvent.OutputTuple,
      AddressesProviderUnregisteredEvent.OutputObject
    >;
    AddressesProviderUnregistered: TypedContractEvent<
      AddressesProviderUnregisteredEvent.InputTuple,
      AddressesProviderUnregisteredEvent.OutputTuple,
      AddressesProviderUnregisteredEvent.OutputObject
    >;
  };
}
