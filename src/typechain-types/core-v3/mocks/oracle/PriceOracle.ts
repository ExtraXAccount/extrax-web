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

export interface PriceOracleInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "getAssetPrice"
      | "getEthUsdPrice"
      | "setAssetPrice"
      | "setEthUsdPrice"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "AssetPriceUpdated" | "EthPriceUpdated"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "getAssetPrice",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getEthUsdPrice",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setAssetPrice",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setEthUsdPrice",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "getAssetPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEthUsdPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAssetPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setEthUsdPrice",
    data: BytesLike
  ): Result;
}

export namespace AssetPriceUpdatedEvent {
  export type InputTuple = [
    asset: AddressLike,
    price: BigNumberish,
    timestamp: BigNumberish
  ];
  export type OutputTuple = [asset: string, price: bigint, timestamp: bigint];
  export interface OutputObject {
    asset: string;
    price: bigint;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace EthPriceUpdatedEvent {
  export type InputTuple = [price: BigNumberish, timestamp: BigNumberish];
  export type OutputTuple = [price: bigint, timestamp: bigint];
  export interface OutputObject {
    price: bigint;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface PriceOracle extends BaseContract {
  connect(runner?: ContractRunner | null): PriceOracle;
  waitForDeployment(): Promise<this>;

  interface: PriceOracleInterface;

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

  getAssetPrice: TypedContractMethod<[asset: AddressLike], [bigint], "view">;

  getEthUsdPrice: TypedContractMethod<[], [bigint], "view">;

  setAssetPrice: TypedContractMethod<
    [asset: AddressLike, price: BigNumberish],
    [void],
    "nonpayable"
  >;

  setEthUsdPrice: TypedContractMethod<
    [price: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "getAssetPrice"
  ): TypedContractMethod<[asset: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getEthUsdPrice"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "setAssetPrice"
  ): TypedContractMethod<
    [asset: AddressLike, price: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setEthUsdPrice"
  ): TypedContractMethod<[price: BigNumberish], [void], "nonpayable">;

  getEvent(
    key: "AssetPriceUpdated"
  ): TypedContractEvent<
    AssetPriceUpdatedEvent.InputTuple,
    AssetPriceUpdatedEvent.OutputTuple,
    AssetPriceUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "EthPriceUpdated"
  ): TypedContractEvent<
    EthPriceUpdatedEvent.InputTuple,
    EthPriceUpdatedEvent.OutputTuple,
    EthPriceUpdatedEvent.OutputObject
  >;

  filters: {
    "AssetPriceUpdated(address,uint256,uint256)": TypedContractEvent<
      AssetPriceUpdatedEvent.InputTuple,
      AssetPriceUpdatedEvent.OutputTuple,
      AssetPriceUpdatedEvent.OutputObject
    >;
    AssetPriceUpdated: TypedContractEvent<
      AssetPriceUpdatedEvent.InputTuple,
      AssetPriceUpdatedEvent.OutputTuple,
      AssetPriceUpdatedEvent.OutputObject
    >;

    "EthPriceUpdated(uint256,uint256)": TypedContractEvent<
      EthPriceUpdatedEvent.InputTuple,
      EthPriceUpdatedEvent.OutputTuple,
      EthPriceUpdatedEvent.OutputObject
    >;
    EthPriceUpdated: TypedContractEvent<
      EthPriceUpdatedEvent.InputTuple,
      EthPriceUpdatedEvent.OutputTuple,
      EthPriceUpdatedEvent.OutputObject
    >;
  };
}
