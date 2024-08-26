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

export interface IInitializableDebtTokenInterface extends Interface {
  getFunction(nameOrSignature: "initialize"): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;

  encodeFunctionData(
    functionFragment: "initialize",
    values: [
      AddressLike,
      AddressLike,
      AddressLike,
      BigNumberish,
      string,
      string,
      BytesLike
    ]
  ): string;

  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
}

export namespace InitializedEvent {
  export type InputTuple = [
    underlyingAsset: AddressLike,
    pool: AddressLike,
    incentivesController: AddressLike,
    debtTokenDecimals: BigNumberish,
    debtTokenName: string,
    debtTokenSymbol: string,
    params: BytesLike
  ];
  export type OutputTuple = [
    underlyingAsset: string,
    pool: string,
    incentivesController: string,
    debtTokenDecimals: bigint,
    debtTokenName: string,
    debtTokenSymbol: string,
    params: string
  ];
  export interface OutputObject {
    underlyingAsset: string;
    pool: string;
    incentivesController: string;
    debtTokenDecimals: bigint;
    debtTokenName: string;
    debtTokenSymbol: string;
    params: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IInitializableDebtToken extends BaseContract {
  connect(runner?: ContractRunner | null): IInitializableDebtToken;
  waitForDeployment(): Promise<this>;

  interface: IInitializableDebtTokenInterface;

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

  initialize: TypedContractMethod<
    [
      pool: AddressLike,
      underlyingAsset: AddressLike,
      incentivesController: AddressLike,
      debtTokenDecimals: BigNumberish,
      debtTokenName: string,
      debtTokenSymbol: string,
      params: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "initialize"
  ): TypedContractMethod<
    [
      pool: AddressLike,
      underlyingAsset: AddressLike,
      incentivesController: AddressLike,
      debtTokenDecimals: BigNumberish,
      debtTokenName: string,
      debtTokenSymbol: string,
      params: BytesLike
    ],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "Initialized"
  ): TypedContractEvent<
    InitializedEvent.InputTuple,
    InitializedEvent.OutputTuple,
    InitializedEvent.OutputObject
  >;

  filters: {
    "Initialized(address,address,address,uint8,string,string,bytes)": TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;
    Initialized: TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;
  };
}
