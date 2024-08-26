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

export declare namespace RewardsDataTypes {
  export type RewardsConfigInputStruct = {
    emissionPerSecond: BigNumberish;
    totalSupply: BigNumberish;
    distributionEnd: BigNumberish;
    asset: AddressLike;
    reward: AddressLike;
    transferStrategy: AddressLike;
    rewardOracle: AddressLike;
  };

  export type RewardsConfigInputStructOutput = [
    emissionPerSecond: bigint,
    totalSupply: bigint,
    distributionEnd: bigint,
    asset: string,
    reward: string,
    transferStrategy: string,
    rewardOracle: string
  ] & {
    emissionPerSecond: bigint;
    totalSupply: bigint;
    distributionEnd: bigint;
    asset: string;
    reward: string;
    transferStrategy: string;
    rewardOracle: string;
  };
}

export interface RewardsControllerInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "EMISSION_MANAGER"
      | "REVISION"
      | "claimAllRewards"
      | "claimAllRewardsOnBehalf"
      | "claimAllRewardsToSelf"
      | "claimRewards"
      | "claimRewardsOnBehalf"
      | "claimRewardsToSelf"
      | "configureAssets"
      | "getAllUserRewards"
      | "getAssetDecimals"
      | "getAssetIndex"
      | "getClaimer"
      | "getDistributionEnd"
      | "getEmissionManager"
      | "getRewardOracle"
      | "getRewardsByAsset"
      | "getRewardsData"
      | "getRewardsList"
      | "getTransferStrategy"
      | "getUserAccruedRewards"
      | "getUserAssetIndex"
      | "getUserRewards"
      | "handleAction"
      | "initialize"
      | "setClaimer"
      | "setDistributionEnd"
      | "setEmissionPerSecond"
      | "setRewardOracle"
      | "setTransferStrategy"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "Accrued"
      | "AssetConfigUpdated"
      | "ClaimerSet"
      | "RewardOracleUpdated"
      | "RewardsClaimed"
      | "TransferStrategyInstalled"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "EMISSION_MANAGER",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "REVISION", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "claimAllRewards",
    values: [AddressLike[], AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "claimAllRewardsOnBehalf",
    values: [AddressLike[], AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "claimAllRewardsToSelf",
    values: [AddressLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "claimRewards",
    values: [AddressLike[], BigNumberish, AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "claimRewardsOnBehalf",
    values: [AddressLike[], BigNumberish, AddressLike, AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "claimRewardsToSelf",
    values: [AddressLike[], BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "configureAssets",
    values: [RewardsDataTypes.RewardsConfigInputStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getAllUserRewards",
    values: [AddressLike[], AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getAssetDecimals",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getAssetIndex",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getClaimer",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getDistributionEnd",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getEmissionManager",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getRewardOracle",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getRewardsByAsset",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getRewardsData",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getRewardsList",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTransferStrategy",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserAccruedRewards",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserAssetIndex",
    values: [AddressLike, AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserRewards",
    values: [AddressLike[], AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "handleAction",
    values: [AddressLike, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setClaimer",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setDistributionEnd",
    values: [AddressLike, AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setEmissionPerSecond",
    values: [AddressLike, AddressLike[], BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setRewardOracle",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setTransferStrategy",
    values: [AddressLike, AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "EMISSION_MANAGER",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "REVISION", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimAllRewards",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimAllRewardsOnBehalf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimAllRewardsToSelf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimRewards",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimRewardsOnBehalf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimRewardsToSelf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "configureAssets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAllUserRewards",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAssetDecimals",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAssetIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getClaimer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getDistributionEnd",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEmissionManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRewardOracle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRewardsByAsset",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRewardsData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRewardsList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTransferStrategy",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserAccruedRewards",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserAssetIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserRewards",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "handleAction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setClaimer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setDistributionEnd",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setEmissionPerSecond",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRewardOracle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTransferStrategy",
    data: BytesLike
  ): Result;
}

export namespace AccruedEvent {
  export type InputTuple = [
    asset: AddressLike,
    reward: AddressLike,
    user: AddressLike,
    assetIndex: BigNumberish,
    userIndex: BigNumberish,
    rewardsAccrued: BigNumberish
  ];
  export type OutputTuple = [
    asset: string,
    reward: string,
    user: string,
    assetIndex: bigint,
    userIndex: bigint,
    rewardsAccrued: bigint
  ];
  export interface OutputObject {
    asset: string;
    reward: string;
    user: string;
    assetIndex: bigint;
    userIndex: bigint;
    rewardsAccrued: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace AssetConfigUpdatedEvent {
  export type InputTuple = [
    asset: AddressLike,
    reward: AddressLike,
    oldEmission: BigNumberish,
    newEmission: BigNumberish,
    oldDistributionEnd: BigNumberish,
    newDistributionEnd: BigNumberish,
    assetIndex: BigNumberish
  ];
  export type OutputTuple = [
    asset: string,
    reward: string,
    oldEmission: bigint,
    newEmission: bigint,
    oldDistributionEnd: bigint,
    newDistributionEnd: bigint,
    assetIndex: bigint
  ];
  export interface OutputObject {
    asset: string;
    reward: string;
    oldEmission: bigint;
    newEmission: bigint;
    oldDistributionEnd: bigint;
    newDistributionEnd: bigint;
    assetIndex: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ClaimerSetEvent {
  export type InputTuple = [user: AddressLike, claimer: AddressLike];
  export type OutputTuple = [user: string, claimer: string];
  export interface OutputObject {
    user: string;
    claimer: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RewardOracleUpdatedEvent {
  export type InputTuple = [reward: AddressLike, rewardOracle: AddressLike];
  export type OutputTuple = [reward: string, rewardOracle: string];
  export interface OutputObject {
    reward: string;
    rewardOracle: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RewardsClaimedEvent {
  export type InputTuple = [
    user: AddressLike,
    reward: AddressLike,
    to: AddressLike,
    claimer: AddressLike,
    amount: BigNumberish
  ];
  export type OutputTuple = [
    user: string,
    reward: string,
    to: string,
    claimer: string,
    amount: bigint
  ];
  export interface OutputObject {
    user: string;
    reward: string;
    to: string;
    claimer: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TransferStrategyInstalledEvent {
  export type InputTuple = [reward: AddressLike, transferStrategy: AddressLike];
  export type OutputTuple = [reward: string, transferStrategy: string];
  export interface OutputObject {
    reward: string;
    transferStrategy: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface RewardsController extends BaseContract {
  connect(runner?: ContractRunner | null): RewardsController;
  waitForDeployment(): Promise<this>;

  interface: RewardsControllerInterface;

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

  EMISSION_MANAGER: TypedContractMethod<[], [string], "view">;

  REVISION: TypedContractMethod<[], [bigint], "view">;

  claimAllRewards: TypedContractMethod<
    [assets: AddressLike[], to: AddressLike],
    [
      [string[], bigint[]] & { rewardsList: string[]; claimedAmounts: bigint[] }
    ],
    "nonpayable"
  >;

  claimAllRewardsOnBehalf: TypedContractMethod<
    [assets: AddressLike[], user: AddressLike, to: AddressLike],
    [
      [string[], bigint[]] & { rewardsList: string[]; claimedAmounts: bigint[] }
    ],
    "nonpayable"
  >;

  claimAllRewardsToSelf: TypedContractMethod<
    [assets: AddressLike[]],
    [
      [string[], bigint[]] & { rewardsList: string[]; claimedAmounts: bigint[] }
    ],
    "nonpayable"
  >;

  claimRewards: TypedContractMethod<
    [
      assets: AddressLike[],
      amount: BigNumberish,
      to: AddressLike,
      reward: AddressLike
    ],
    [bigint],
    "nonpayable"
  >;

  claimRewardsOnBehalf: TypedContractMethod<
    [
      assets: AddressLike[],
      amount: BigNumberish,
      user: AddressLike,
      to: AddressLike,
      reward: AddressLike
    ],
    [bigint],
    "nonpayable"
  >;

  claimRewardsToSelf: TypedContractMethod<
    [assets: AddressLike[], amount: BigNumberish, reward: AddressLike],
    [bigint],
    "nonpayable"
  >;

  configureAssets: TypedContractMethod<
    [config: RewardsDataTypes.RewardsConfigInputStruct[]],
    [void],
    "nonpayable"
  >;

  getAllUserRewards: TypedContractMethod<
    [assets: AddressLike[], user: AddressLike],
    [
      [string[], bigint[]] & {
        rewardsList: string[];
        unclaimedAmounts: bigint[];
      }
    ],
    "view"
  >;

  getAssetDecimals: TypedContractMethod<[asset: AddressLike], [bigint], "view">;

  getAssetIndex: TypedContractMethod<
    [asset: AddressLike, reward: AddressLike],
    [[bigint, bigint]],
    "view"
  >;

  getClaimer: TypedContractMethod<[user: AddressLike], [string], "view">;

  getDistributionEnd: TypedContractMethod<
    [asset: AddressLike, reward: AddressLike],
    [bigint],
    "view"
  >;

  getEmissionManager: TypedContractMethod<[], [string], "view">;

  getRewardOracle: TypedContractMethod<[reward: AddressLike], [string], "view">;

  getRewardsByAsset: TypedContractMethod<
    [asset: AddressLike],
    [string[]],
    "view"
  >;

  getRewardsData: TypedContractMethod<
    [asset: AddressLike, reward: AddressLike],
    [[bigint, bigint, bigint, bigint]],
    "view"
  >;

  getRewardsList: TypedContractMethod<[], [string[]], "view">;

  getTransferStrategy: TypedContractMethod<
    [reward: AddressLike],
    [string],
    "view"
  >;

  getUserAccruedRewards: TypedContractMethod<
    [user: AddressLike, reward: AddressLike],
    [bigint],
    "view"
  >;

  getUserAssetIndex: TypedContractMethod<
    [user: AddressLike, asset: AddressLike, reward: AddressLike],
    [bigint],
    "view"
  >;

  getUserRewards: TypedContractMethod<
    [assets: AddressLike[], user: AddressLike, reward: AddressLike],
    [bigint],
    "view"
  >;

  handleAction: TypedContractMethod<
    [user: AddressLike, totalSupply: BigNumberish, userBalance: BigNumberish],
    [void],
    "nonpayable"
  >;

  initialize: TypedContractMethod<[arg0: AddressLike], [void], "nonpayable">;

  setClaimer: TypedContractMethod<
    [user: AddressLike, caller: AddressLike],
    [void],
    "nonpayable"
  >;

  setDistributionEnd: TypedContractMethod<
    [asset: AddressLike, reward: AddressLike, newDistributionEnd: BigNumberish],
    [void],
    "nonpayable"
  >;

  setEmissionPerSecond: TypedContractMethod<
    [
      asset: AddressLike,
      rewards: AddressLike[],
      newEmissionsPerSecond: BigNumberish[]
    ],
    [void],
    "nonpayable"
  >;

  setRewardOracle: TypedContractMethod<
    [reward: AddressLike, rewardOracle: AddressLike],
    [void],
    "nonpayable"
  >;

  setTransferStrategy: TypedContractMethod<
    [reward: AddressLike, transferStrategy: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "EMISSION_MANAGER"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "REVISION"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "claimAllRewards"
  ): TypedContractMethod<
    [assets: AddressLike[], to: AddressLike],
    [
      [string[], bigint[]] & { rewardsList: string[]; claimedAmounts: bigint[] }
    ],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "claimAllRewardsOnBehalf"
  ): TypedContractMethod<
    [assets: AddressLike[], user: AddressLike, to: AddressLike],
    [
      [string[], bigint[]] & { rewardsList: string[]; claimedAmounts: bigint[] }
    ],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "claimAllRewardsToSelf"
  ): TypedContractMethod<
    [assets: AddressLike[]],
    [
      [string[], bigint[]] & { rewardsList: string[]; claimedAmounts: bigint[] }
    ],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "claimRewards"
  ): TypedContractMethod<
    [
      assets: AddressLike[],
      amount: BigNumberish,
      to: AddressLike,
      reward: AddressLike
    ],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "claimRewardsOnBehalf"
  ): TypedContractMethod<
    [
      assets: AddressLike[],
      amount: BigNumberish,
      user: AddressLike,
      to: AddressLike,
      reward: AddressLike
    ],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "claimRewardsToSelf"
  ): TypedContractMethod<
    [assets: AddressLike[], amount: BigNumberish, reward: AddressLike],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "configureAssets"
  ): TypedContractMethod<
    [config: RewardsDataTypes.RewardsConfigInputStruct[]],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getAllUserRewards"
  ): TypedContractMethod<
    [assets: AddressLike[], user: AddressLike],
    [
      [string[], bigint[]] & {
        rewardsList: string[];
        unclaimedAmounts: bigint[];
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "getAssetDecimals"
  ): TypedContractMethod<[asset: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getAssetIndex"
  ): TypedContractMethod<
    [asset: AddressLike, reward: AddressLike],
    [[bigint, bigint]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getClaimer"
  ): TypedContractMethod<[user: AddressLike], [string], "view">;
  getFunction(
    nameOrSignature: "getDistributionEnd"
  ): TypedContractMethod<
    [asset: AddressLike, reward: AddressLike],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "getEmissionManager"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getRewardOracle"
  ): TypedContractMethod<[reward: AddressLike], [string], "view">;
  getFunction(
    nameOrSignature: "getRewardsByAsset"
  ): TypedContractMethod<[asset: AddressLike], [string[]], "view">;
  getFunction(
    nameOrSignature: "getRewardsData"
  ): TypedContractMethod<
    [asset: AddressLike, reward: AddressLike],
    [[bigint, bigint, bigint, bigint]],
    "view"
  >;
  getFunction(
    nameOrSignature: "getRewardsList"
  ): TypedContractMethod<[], [string[]], "view">;
  getFunction(
    nameOrSignature: "getTransferStrategy"
  ): TypedContractMethod<[reward: AddressLike], [string], "view">;
  getFunction(
    nameOrSignature: "getUserAccruedRewards"
  ): TypedContractMethod<
    [user: AddressLike, reward: AddressLike],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "getUserAssetIndex"
  ): TypedContractMethod<
    [user: AddressLike, asset: AddressLike, reward: AddressLike],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "getUserRewards"
  ): TypedContractMethod<
    [assets: AddressLike[], user: AddressLike, reward: AddressLike],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "handleAction"
  ): TypedContractMethod<
    [user: AddressLike, totalSupply: BigNumberish, userBalance: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "initialize"
  ): TypedContractMethod<[arg0: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setClaimer"
  ): TypedContractMethod<
    [user: AddressLike, caller: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setDistributionEnd"
  ): TypedContractMethod<
    [asset: AddressLike, reward: AddressLike, newDistributionEnd: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setEmissionPerSecond"
  ): TypedContractMethod<
    [
      asset: AddressLike,
      rewards: AddressLike[],
      newEmissionsPerSecond: BigNumberish[]
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setRewardOracle"
  ): TypedContractMethod<
    [reward: AddressLike, rewardOracle: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setTransferStrategy"
  ): TypedContractMethod<
    [reward: AddressLike, transferStrategy: AddressLike],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "Accrued"
  ): TypedContractEvent<
    AccruedEvent.InputTuple,
    AccruedEvent.OutputTuple,
    AccruedEvent.OutputObject
  >;
  getEvent(
    key: "AssetConfigUpdated"
  ): TypedContractEvent<
    AssetConfigUpdatedEvent.InputTuple,
    AssetConfigUpdatedEvent.OutputTuple,
    AssetConfigUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "ClaimerSet"
  ): TypedContractEvent<
    ClaimerSetEvent.InputTuple,
    ClaimerSetEvent.OutputTuple,
    ClaimerSetEvent.OutputObject
  >;
  getEvent(
    key: "RewardOracleUpdated"
  ): TypedContractEvent<
    RewardOracleUpdatedEvent.InputTuple,
    RewardOracleUpdatedEvent.OutputTuple,
    RewardOracleUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "RewardsClaimed"
  ): TypedContractEvent<
    RewardsClaimedEvent.InputTuple,
    RewardsClaimedEvent.OutputTuple,
    RewardsClaimedEvent.OutputObject
  >;
  getEvent(
    key: "TransferStrategyInstalled"
  ): TypedContractEvent<
    TransferStrategyInstalledEvent.InputTuple,
    TransferStrategyInstalledEvent.OutputTuple,
    TransferStrategyInstalledEvent.OutputObject
  >;

  filters: {
    "Accrued(address,address,address,uint256,uint256,uint256)": TypedContractEvent<
      AccruedEvent.InputTuple,
      AccruedEvent.OutputTuple,
      AccruedEvent.OutputObject
    >;
    Accrued: TypedContractEvent<
      AccruedEvent.InputTuple,
      AccruedEvent.OutputTuple,
      AccruedEvent.OutputObject
    >;

    "AssetConfigUpdated(address,address,uint256,uint256,uint256,uint256,uint256)": TypedContractEvent<
      AssetConfigUpdatedEvent.InputTuple,
      AssetConfigUpdatedEvent.OutputTuple,
      AssetConfigUpdatedEvent.OutputObject
    >;
    AssetConfigUpdated: TypedContractEvent<
      AssetConfigUpdatedEvent.InputTuple,
      AssetConfigUpdatedEvent.OutputTuple,
      AssetConfigUpdatedEvent.OutputObject
    >;

    "ClaimerSet(address,address)": TypedContractEvent<
      ClaimerSetEvent.InputTuple,
      ClaimerSetEvent.OutputTuple,
      ClaimerSetEvent.OutputObject
    >;
    ClaimerSet: TypedContractEvent<
      ClaimerSetEvent.InputTuple,
      ClaimerSetEvent.OutputTuple,
      ClaimerSetEvent.OutputObject
    >;

    "RewardOracleUpdated(address,address)": TypedContractEvent<
      RewardOracleUpdatedEvent.InputTuple,
      RewardOracleUpdatedEvent.OutputTuple,
      RewardOracleUpdatedEvent.OutputObject
    >;
    RewardOracleUpdated: TypedContractEvent<
      RewardOracleUpdatedEvent.InputTuple,
      RewardOracleUpdatedEvent.OutputTuple,
      RewardOracleUpdatedEvent.OutputObject
    >;

    "RewardsClaimed(address,address,address,address,uint256)": TypedContractEvent<
      RewardsClaimedEvent.InputTuple,
      RewardsClaimedEvent.OutputTuple,
      RewardsClaimedEvent.OutputObject
    >;
    RewardsClaimed: TypedContractEvent<
      RewardsClaimedEvent.InputTuple,
      RewardsClaimedEvent.OutputTuple,
      RewardsClaimedEvent.OutputObject
    >;

    "TransferStrategyInstalled(address,address)": TypedContractEvent<
      TransferStrategyInstalledEvent.InputTuple,
      TransferStrategyInstalledEvent.OutputTuple,
      TransferStrategyInstalledEvent.OutputObject
    >;
    TransferStrategyInstalled: TypedContractEvent<
      TransferStrategyInstalledEvent.InputTuple,
      TransferStrategyInstalledEvent.OutputTuple,
      TransferStrategyInstalledEvent.OutputObject
    >;
  };
}
