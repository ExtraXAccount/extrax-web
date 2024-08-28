/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  FunctionFragment,
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
} from "../../../../common";

export interface EModeLogicInterface extends Interface {
  getEvent(nameOrSignatureOrTopic: "UserEModeSet"): EventFragment;
}

export namespace UserEModeSetEvent {
  export type InputTuple = [user: AddressLike, categoryId: BigNumberish];
  export type OutputTuple = [user: string, categoryId: bigint];
  export interface OutputObject {
    user: string;
    categoryId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface EModeLogic extends BaseContract {
  connect(runner?: ContractRunner | null): EModeLogic;
  waitForDeployment(): Promise<this>;

  interface: EModeLogicInterface;

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

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getEvent(
    key: "UserEModeSet"
  ): TypedContractEvent<
    UserEModeSetEvent.InputTuple,
    UserEModeSetEvent.OutputTuple,
    UserEModeSetEvent.OutputObject
  >;

  filters: {
    "UserEModeSet(address,uint8)": TypedContractEvent<
      UserEModeSetEvent.InputTuple,
      UserEModeSetEvent.OutputTuple,
      UserEModeSetEvent.OutputObject
    >;
    UserEModeSet: TypedContractEvent<
      UserEModeSetEvent.InputTuple,
      UserEModeSetEvent.OutputTuple,
      UserEModeSetEvent.OutputObject
    >;
  };
}