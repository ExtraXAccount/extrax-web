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
} from "../../../../common";

export interface MockAggregatorInterface extends Interface {
  getFunction(
    nameOrSignature: "decimals" | "getTokenType" | "latestAnswer"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "AnswerUpdated"): EventFragment;

  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getTokenType",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "latestAnswer",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTokenType",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "latestAnswer",
    data: BytesLike
  ): Result;
}

export namespace AnswerUpdatedEvent {
  export type InputTuple = [
    current: BigNumberish,
    roundId: BigNumberish,
    updatedAt: BigNumberish
  ];
  export type OutputTuple = [
    current: bigint,
    roundId: bigint,
    updatedAt: bigint
  ];
  export interface OutputObject {
    current: bigint;
    roundId: bigint;
    updatedAt: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface MockAggregator extends BaseContract {
  connect(runner?: ContractRunner | null): MockAggregator;
  waitForDeployment(): Promise<this>;

  interface: MockAggregatorInterface;

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

  decimals: TypedContractMethod<[], [bigint], "view">;

  getTokenType: TypedContractMethod<[], [bigint], "view">;

  latestAnswer: TypedContractMethod<[], [bigint], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "decimals"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getTokenType"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "latestAnswer"
  ): TypedContractMethod<[], [bigint], "view">;

  getEvent(
    key: "AnswerUpdated"
  ): TypedContractEvent<
    AnswerUpdatedEvent.InputTuple,
    AnswerUpdatedEvent.OutputTuple,
    AnswerUpdatedEvent.OutputObject
  >;

  filters: {
    "AnswerUpdated(int256,uint256,uint256)": TypedContractEvent<
      AnswerUpdatedEvent.InputTuple,
      AnswerUpdatedEvent.OutputTuple,
      AnswerUpdatedEvent.OutputObject
    >;
    AnswerUpdated: TypedContractEvent<
      AnswerUpdatedEvent.InputTuple,
      AnswerUpdatedEvent.OutputTuple,
      AnswerUpdatedEvent.OutputObject
    >;
  };
}
