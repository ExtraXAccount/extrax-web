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
} from "../../../../common";

export interface ScaledBalanceTokenBaseInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "POOL"
      | "allowance"
      | "approve"
      | "balanceOf"
      | "decimals"
      | "decreaseAllowance"
      | "getIncentivesController"
      | "getPreviousIndex"
      | "getScaledUserBalanceAndSupply"
      | "increaseAllowance"
      | "name"
      | "scaledBalanceOf"
      | "scaledTotalSupply"
      | "setIncentivesController"
      | "symbol"
      | "totalSupply"
      | "transfer"
      | "transferFrom"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "Approval" | "Burn" | "Mint" | "Transfer"
  ): EventFragment;

  encodeFunctionData(functionFragment: "POOL", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "allowance",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "decreaseAllowance",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getIncentivesController",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPreviousIndex",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getScaledUserBalanceAndSupply",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "increaseAllowance",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "scaledBalanceOf",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "scaledTotalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setIncentivesController",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "POOL", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "decreaseAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getIncentivesController",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPreviousIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getScaledUserBalanceAndSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "increaseAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "scaledBalanceOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "scaledTotalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setIncentivesController",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
}

export namespace ApprovalEvent {
  export type InputTuple = [
    owner: AddressLike,
    spender: AddressLike,
    value: BigNumberish
  ];
  export type OutputTuple = [owner: string, spender: string, value: bigint];
  export interface OutputObject {
    owner: string;
    spender: string;
    value: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace BurnEvent {
  export type InputTuple = [
    from: AddressLike,
    target: AddressLike,
    value: BigNumberish,
    balanceIncrease: BigNumberish,
    index: BigNumberish
  ];
  export type OutputTuple = [
    from: string,
    target: string,
    value: bigint,
    balanceIncrease: bigint,
    index: bigint
  ];
  export interface OutputObject {
    from: string;
    target: string;
    value: bigint;
    balanceIncrease: bigint;
    index: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace MintEvent {
  export type InputTuple = [
    caller: AddressLike,
    onBehalfOf: AddressLike,
    value: BigNumberish,
    balanceIncrease: BigNumberish,
    index: BigNumberish
  ];
  export type OutputTuple = [
    caller: string,
    onBehalfOf: string,
    value: bigint,
    balanceIncrease: bigint,
    index: bigint
  ];
  export interface OutputObject {
    caller: string;
    onBehalfOf: string;
    value: bigint;
    balanceIncrease: bigint;
    index: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TransferEvent {
  export type InputTuple = [
    from: AddressLike,
    to: AddressLike,
    value: BigNumberish
  ];
  export type OutputTuple = [from: string, to: string, value: bigint];
  export interface OutputObject {
    from: string;
    to: string;
    value: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface ScaledBalanceTokenBase extends BaseContract {
  connect(runner?: ContractRunner | null): ScaledBalanceTokenBase;
  waitForDeployment(): Promise<this>;

  interface: ScaledBalanceTokenBaseInterface;

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

  POOL: TypedContractMethod<[], [string], "view">;

  allowance: TypedContractMethod<
    [owner: AddressLike, spender: AddressLike],
    [bigint],
    "view"
  >;

  approve: TypedContractMethod<
    [spender: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  balanceOf: TypedContractMethod<[account: AddressLike], [bigint], "view">;

  decimals: TypedContractMethod<[], [bigint], "view">;

  decreaseAllowance: TypedContractMethod<
    [spender: AddressLike, subtractedValue: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  getIncentivesController: TypedContractMethod<[], [string], "view">;

  getPreviousIndex: TypedContractMethod<[user: AddressLike], [bigint], "view">;

  getScaledUserBalanceAndSupply: TypedContractMethod<
    [user: AddressLike],
    [[bigint, bigint]],
    "view"
  >;

  increaseAllowance: TypedContractMethod<
    [spender: AddressLike, addedValue: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  name: TypedContractMethod<[], [string], "view">;

  scaledBalanceOf: TypedContractMethod<[user: AddressLike], [bigint], "view">;

  scaledTotalSupply: TypedContractMethod<[], [bigint], "view">;

  setIncentivesController: TypedContractMethod<
    [controller: AddressLike],
    [void],
    "nonpayable"
  >;

  symbol: TypedContractMethod<[], [string], "view">;

  totalSupply: TypedContractMethod<[], [bigint], "view">;

  transfer: TypedContractMethod<
    [recipient: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  transferFrom: TypedContractMethod<
    [sender: AddressLike, recipient: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "POOL"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "allowance"
  ): TypedContractMethod<
    [owner: AddressLike, spender: AddressLike],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "approve"
  ): TypedContractMethod<
    [spender: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "balanceOf"
  ): TypedContractMethod<[account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "decimals"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "decreaseAllowance"
  ): TypedContractMethod<
    [spender: AddressLike, subtractedValue: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getIncentivesController"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getPreviousIndex"
  ): TypedContractMethod<[user: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getScaledUserBalanceAndSupply"
  ): TypedContractMethod<[user: AddressLike], [[bigint, bigint]], "view">;
  getFunction(
    nameOrSignature: "increaseAllowance"
  ): TypedContractMethod<
    [spender: AddressLike, addedValue: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "name"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "scaledBalanceOf"
  ): TypedContractMethod<[user: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "scaledTotalSupply"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "setIncentivesController"
  ): TypedContractMethod<[controller: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "symbol"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "totalSupply"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "transfer"
  ): TypedContractMethod<
    [recipient: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferFrom"
  ): TypedContractMethod<
    [sender: AddressLike, recipient: AddressLike, amount: BigNumberish],
    [boolean],
    "nonpayable"
  >;

  getEvent(
    key: "Approval"
  ): TypedContractEvent<
    ApprovalEvent.InputTuple,
    ApprovalEvent.OutputTuple,
    ApprovalEvent.OutputObject
  >;
  getEvent(
    key: "Burn"
  ): TypedContractEvent<
    BurnEvent.InputTuple,
    BurnEvent.OutputTuple,
    BurnEvent.OutputObject
  >;
  getEvent(
    key: "Mint"
  ): TypedContractEvent<
    MintEvent.InputTuple,
    MintEvent.OutputTuple,
    MintEvent.OutputObject
  >;
  getEvent(
    key: "Transfer"
  ): TypedContractEvent<
    TransferEvent.InputTuple,
    TransferEvent.OutputTuple,
    TransferEvent.OutputObject
  >;

  filters: {
    "Approval(address,address,uint256)": TypedContractEvent<
      ApprovalEvent.InputTuple,
      ApprovalEvent.OutputTuple,
      ApprovalEvent.OutputObject
    >;
    Approval: TypedContractEvent<
      ApprovalEvent.InputTuple,
      ApprovalEvent.OutputTuple,
      ApprovalEvent.OutputObject
    >;

    "Burn(address,address,uint256,uint256,uint256)": TypedContractEvent<
      BurnEvent.InputTuple,
      BurnEvent.OutputTuple,
      BurnEvent.OutputObject
    >;
    Burn: TypedContractEvent<
      BurnEvent.InputTuple,
      BurnEvent.OutputTuple,
      BurnEvent.OutputObject
    >;

    "Mint(address,address,uint256,uint256,uint256)": TypedContractEvent<
      MintEvent.InputTuple,
      MintEvent.OutputTuple,
      MintEvent.OutputObject
    >;
    Mint: TypedContractEvent<
      MintEvent.InputTuple,
      MintEvent.OutputTuple,
      MintEvent.OutputObject
    >;

    "Transfer(address,address,uint256)": TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
    Transfer: TypedContractEvent<
      TransferEvent.InputTuple,
      TransferEvent.OutputTuple,
      TransferEvent.OutputObject
    >;
  };
}
