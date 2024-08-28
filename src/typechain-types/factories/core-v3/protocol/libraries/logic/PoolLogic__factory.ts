/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type {
  PoolLogic,
  PoolLogicInterface,
} from "../../../../../core-v3/protocol/libraries/logic/PoolLogic";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "asset",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalDebt",
        type: "uint256",
      },
    ],
    name: "IsolationModeTotalDebtUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "reserve",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountMinted",
        type: "uint256",
      },
    ],
    name: "MintedToTreasury",
    type: "event",
  },
] as const;

const _bytecode =
  "0x61253461003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361061007c5760003560e01c806369fc1bdf1161005a57806369fc1bdf1461010857806387b322b2146101385780639cf570231461015857600080fd5b80631e3b41451461008157806326ec273f146100a357806348c2ca8c146100e8575b600080fd5b81801561008d57600080fd5b506100a161009c366004611f92565b610178565b005b6100b66100b13660046120a2565b6102b0565b604080519687526020870195909552938501929092526060840152608083015260a082015260c0015b60405180910390f35b8180156100f457600080fd5b506100a161010336600461217b565b6102ed565b81801561011457600080fd5b5061012861012336600461220c565b6104c9565b60405190151581526020016100df565b81801561014457600080fd5b506100a16101533660046122e7565b6108b8565b81801561016457600080fd5b506100a1610173366004612323565b6108de565b73ffffffffffffffffffffffffffffffffffffffff811660009081526020838152604091829020825191820190925290549081905260d41c64ffffffffff1660408051808201909152600281527f38310000000000000000000000000000000000000000000000000000000000006020820152901561022d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102249190612358565b60405180910390fd5b5073ffffffffffffffffffffffffffffffffffffffff811660008181526020848152604080832060090180547fffffffffffffffffffffffffffffffff00000000000000000000000000000000169055519182527faef84d3b40895fd58c561f3998000f0583abb992a52fbdc99ace8e8de4d676a5910160405180910390a25050565b6000806000806000806102c58a8a8a8a610a1f565b50939950919750909450925090506102de868684610f8f565b93509499939850945094509450565b60005b818110156104c357600083838381811061030c5761030c6123c5565b905060200201602081019061032191906123f4565b73ffffffffffffffffffffffffffffffffffffffff8116600090815260208781526040918290208251918201909252815490819052919250906701000000000000001661036f5750506104bb565b60088101546fffffffffffffffffffffffffffffffff1680156104b7576008820180547fffffffffffffffffffffffffffffffff0000000000000000000000000000000016905560006103c183610fc3565b905060006103cf8383611052565b6004808601546040517f7df5bd3b00000000000000000000000000000000000000000000000000000000815292935073ffffffffffffffffffffffffffffffffffffffff1691637df5bd3b91610432918591879101918252602082015260400190565b600060405180830381600087803b15801561044c57600080fd5b505af1158015610460573d6000803e3d6000fd5b505050508473ffffffffffffffffffffffffffffffffffffffff167fbfa21aa5d5f9a1f0120a95e7c0749f389863cbdbfff531aa7339077a5bc919de826040516104ac91815260200190565b60405180910390a250505b5050505b6001016102f0565b50505050565b805160408051808201909152600181527f390000000000000000000000000000000000000000000000000000000000000060208201526000913b61053a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102249190612358565b5060208083015160408085015160608601516080870151875173ffffffffffffffffffffffffffffffffffffffff166000908152958a905292909420610582949093926110a9565b815173ffffffffffffffffffffffffffffffffffffffff166000908152602085905260408120600301547501000000000000000000000000000000000000000000900461ffff161515806105fe5750825160008080526020869052604090205473ffffffffffffffffffffffffffffffffffffffff9081169116145b905080156040518060400160405280600281526020017f313400000000000000000000000000000000000000000000000000000000000081525090610670576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102249190612358565b5060005b8360a0015161ffff168161ffff1610156107745761ffff811660009081526020869052604090205473ffffffffffffffffffffffffffffffffffffffff1661076c57835173ffffffffffffffffffffffffffffffffffffffff90811660009081526020888152604080832060030180547fffffffffffffffffff0000ffffffffffffffffffffffffffffffffffffffffff16750100000000000000000000000000000000000000000061ffff97909716968702179055875194835290889052812080547fffffffffffffffffffffffff0000000000000000000000000000000000000000169390921692909217905591506108b19050565b600101610674565b508260c0015161ffff168360a0015161ffff16106040518060400160405280600281526020017f3135000000000000000000000000000000000000000000000000000000000000815250906107f6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102249190612358565b50505060a081018051825173ffffffffffffffffffffffffffffffffffffffff90811660009081526020878152604080832060030180547fffffffffffffffffff0000ffffffffffffffffffffffffffffffffffffffffff16750100000000000000000000000000000000000000000061ffff978816021790558651955190941682528690529190912080547fffffffffffffffffffffffff0000000000000000000000000000000000000000169290911691909117905560015b9392505050565b6108d973ffffffffffffffffffffffffffffffffffffffff841683836111fc565b505050565b73ffffffffffffffffffffffffffffffffffffffff8116600090815260208490526040902061090e8382846112cf565b5073ffffffffffffffffffffffffffffffffffffffff166000818152602084815260408083206003810180547501000000000000000000000000000000000000000000900461ffff16855295835290832080547fffffffffffffffffffffffff0000000000000000000000000000000000000000908116909155938352949052808455600184018190556002840181905582547fffffffffffffffffff0000000000000000000000000000000000000000000000169092556004830180548216905560058301805482169055600683018054821690556007830180549091169055600882015560090180547fffffffffffffffffffffffffffffffff00000000000000000000000000000000169055565b600080600080600080610a358760000151511590565b15610a715750600094508493508392508291507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff905081610f82565b610b2060405180610260016040528060008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff1681526020016000151581526020016000151581525090565b608088015160ff1615610b6557608088015160ff16600090815260208a9052604090206060890151610b52919061173a565b6101808401526101c08301526101a08201525b87602001518160c001511015610e845760c08101518851610b8591611819565b610b995760c0810180516001019052610b65565b60c0810151600090815260208b9052604090205473ffffffffffffffffffffffffffffffffffffffff166102008201819052610bdf5760c0810180516001019052610b65565b61020081015173ffffffffffffffffffffffffffffffffffffffff16600090815260208c8152604091829020825180830190935280549283905260ff60a884901c81166101e0860152603084901c166060850181905261ffff601085901c811660a08701529093166080850152600a9290920a9083015261018082015115801590610c755750816101e00151896080015160ff16145b610d195760608901516102008301516040517fb3596f0700000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff918216600482015291169063b3596f0790602401602060405180830381865afa158015610cf0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d14919061240f565b610d20565b8161018001515b825260a082015115801590610d40575060c08201518951610d40916118a1565b15610e3057610d5d89604001518284600001518560200151611925565b6040830181905261010083018051610d76908390612457565b90525060808901516101e0830151610d919160ff16906119fe565b1515610240830152608082015115610de757816102400151610db7578160800151610dbe565b816101a001515b8260400151610dcd919061246a565b8261014001818151610ddf9190612457565b905250610df0565b60016102208301525b816102400151610e04578160a00151610e0b565b816101c001515b8260400151610e1a919061246a565b8261016001818151610e2c9190612457565b9052505b60c08201518951610e4091611a0f565b15610e7357610e5d89604001518284600001518560200151611a91565b8261012001818151610e6f9190612457565b9052505b5060c0810180516001019052610b65565b806101000151600003610e98576000610eb3565b80610100015181610140015181610eb157610eb1612481565b045b610140820152610100810151600003610ecd576000610ee8565b80610100015181610160015181610ee657610ee6612481565b045b61016082015261012081015115610f2a57610f25816101200151610f1f836101600151846101000151611c1190919063ffffffff16565b90611c54565b610f4c565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5b60e0820181905261010082015161012083015161014084015161016085015161022090950151929a509098509650919450925090505b9499939850945094509450565b600080610f9c8584611c11565b905083811015610fb05760009150506108b1565b610fba84826124b0565b95945050505050565b6003810154600090700100000000000000000000000000000000900464ffffffffff16428103611008575050600101546fffffffffffffffffffffffffffffffff1690565b60018301546108b1906fffffffffffffffffffffffffffffffff80821691611046917001000000000000000000000000000000009091041684611c8b565b90611052565b50919050565b600081157ffffffffffffffffffffffffffffffffffffffffffe6268e1b017bfe18bffffff8390048411151761108757600080fd5b506b033b2e3c9fd0803ce800000091026b019d971e4fe8401e74000000010490565b600485015460408051808201909152600281527f363100000000000000000000000000000000000000000000000000000000000060208201529073ffffffffffffffffffffffffffffffffffffffff1615611131576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102249190612358565b506001850180546b033b2e3c9fd0803ce80000007fffffffffffffffffffffffffffffffff00000000000000000000000000000000918216811790925560028701805490911690911790556004850180547fffffffffffffffffffffffff000000000000000000000000000000000000000090811673ffffffffffffffffffffffffffffffffffffffff968716179091556005860180548216948616949094179093556006850180548416928516929092179091556007909301805490911692909116919091179055565b6040517fa9059cbb0000000000000000000000000000000000000000000000000000000080825273ffffffffffffffffffffffffffffffffffffffff84166004830152602482018390529060008060448382895af161125f573d6000803e3d6000fd5b5061126984611cd0565b6104c3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f475076323a206661696c6564207472616e7366657200000000000000000000006044820152606401610224565b60408051808201909152600281527f3737000000000000000000000000000000000000000000000000000000000000602082015273ffffffffffffffffffffffffffffffffffffffff8216611351576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102249190612358565b5060038201547501000000000000000000000000000000000000000000900461ffff161515806113a7575060008080526020849052604090205473ffffffffffffffffffffffffffffffffffffffff8281169116145b6040518060400160405280600281526020017f383200000000000000000000000000000000000000000000000000000000000081525090611415576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102249190612358565b508160050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611485573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114a9919061240f565b60408051808201909152600281527f353500000000000000000000000000000000000000000000000000000000000060208201529015611516576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102249190612358565b508160060160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611586573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115aa919061240f565b60408051808201909152600281527f353600000000000000000000000000000000000000000000000000000000000060208201529015611617576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102249190612358565b50600480830154604080517f18160ddd000000000000000000000000000000000000000000000000000000008152905173ffffffffffffffffffffffffffffffffffffffff909216926318160ddd9282820192602092908290030181865afa158015611687573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116ab919061240f565b1580156116cc575060088201546fffffffffffffffffffffffffffffffff16155b6040518060400160405280600281526020017f3534000000000000000000000000000000000000000000000000000000000000815250906104c3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102249190612358565b81546000908190819081906601000000000000900473ffffffffffffffffffffffffffffffffffffffff1680156117fe576040517fb3596f0700000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff828116600483015287169063b3596f0790602401602060405180830381865afa1580156117d7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117fb919061240f565b91505b50945461ffff80821697620100009092041695945092505050565b60408051808201909152600281527f373400000000000000000000000000000000000000000000000000000000000060208201526000906080831061188b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102249190612358565b50508151600182901b1c60031615155b92915050565b60408051808201909152600281527f3734000000000000000000000000000000000000000000000000000000000000602082015260009060808310611913576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102249190612358565b50509051600191821b82011c16151590565b60008061193185610fc3565b6004868101546040517f1da24f3e00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8a81169382019390935292935060009287926119d7928692911690631da24f3e90602401602060405180830381865afa1580156119b3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611046919061240f565b6119e1919061246a565b90508381816119f2576119f2612481565b04979650505050505050565b600082158015906108b15750501490565b60408051808201909152600281527f3734000000000000000000000000000000000000000000000000000000000000602082015260009060808310611a81576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102249190612358565b50509051600191821b1c16151590565b60068301546040517f1da24f3e00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff86811660048301526000928392911690631da24f3e90602401602060405180830381865afa158015611b07573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b2b919061240f565b90508015611b4957611b46611b3f86611d99565b8290611052565b90505b60058501546040517f70a0823100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8881166004830152909116906370a0823190602401602060405180830381865afa158015611bbb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611bdf919061240f565b611be99082612457565b9050611bf5818561246a565b9050828181611c0657611c06612481565b049695505050505050565b600081157fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffec7783900484111517611c4657600080fd5b506127109102611388010490565b60008115670de0b6b3a764000060028404190484111715611c7457600080fd5b50670de0b6b3a76400009190910260028204010490565b600080611c9f64ffffffffff8416426124b0565b611ca9908561246a565b6301e1338090049050611cc8816b033b2e3c9fd0803ce8000000612457565b949350505050565b6000611d0f565b7f08c379a000000000000000000000000000000000000000000000000000000000600052602060045280602452508060445260646000fd5b3d8015611d4e5760208114611d8857611d497f475076323a206d616c666f726d6564207472616e7366657220726573756c7400601f611cd7565b61104c565b823b611d7f57611d7f7f475076323a206e6f74206120636f6e74726163740000000000000000000000006014611cd7565b6001915061104c565b3d6000803e50506000511515919050565b6003810154600090700100000000000000000000000000000000900464ffffffffff16428103611dde575050600201546fffffffffffffffffffffffffffffffff1690565b60028301546108b1906fffffffffffffffffffffffffffffffff8082169161104691700100000000000000000000000000000000909104168460006108b1838342600080611e3364ffffffffff8516846124b0565b905080600003611e52576b033b2e3c9fd0803ce80000009150506108b1565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81016000808060028511611e88576000611e8d565b600285035b925066038882915c4000611ea18a80611052565b81611eae57611eae612481565b0491506301e13380611ec0838b611052565b81611ecd57611ecd612481565b049050600082611edd868861246a565b611ee7919061246a565b60029004905060008285611efb888a61246a565b611f05919061246a565b611f0f919061246a565b60069004905080826301e13380611f268a8f61246a565b611f3091906124c3565b611f46906b033b2e3c9fd0803ce8000000612457565b611f509190612457565b611f5a9190612457565b9b9a5050505050505050505050565b803573ffffffffffffffffffffffffffffffffffffffff81168114611f8d57600080fd5b919050565b60008060408385031215611fa557600080fd5b82359150611fb560208401611f69565b90509250929050565b60405160a0810167ffffffffffffffff81118282101715612008577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60405290565b6040516020810167ffffffffffffffff81118282101715612008577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60405160e0810167ffffffffffffffff81118282101715612008577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000806000808486036101008112156120ba57600080fd5b8535945060208601359350604086013592507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa00160a08112156120fc57600080fd5b612104611fbe565b602082121561211257600080fd5b61211a61200e565b9150606087013582528181526080870135602082015261213c60a08801611f69565b604082015261214d60c08801611f69565b606082015260e0870135915060ff8216821461216857600080fd5b6080810191909152939692955090935050565b60008060006040848603121561219057600080fd5b83359250602084013567ffffffffffffffff808211156121af57600080fd5b818601915086601f8301126121c357600080fd5b8135818111156121d257600080fd5b8760208260051b85010111156121e757600080fd5b6020830194508093505050509250925092565b803561ffff81168114611f8d57600080fd5b600080600083850361012081121561222357600080fd5b843593506020850135925060e07fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc08201121561225e57600080fd5b50612267612058565b61227360408601611f69565b815261228160608601611f69565b602082015261229260808601611f69565b60408201526122a360a08601611f69565b60608201526122b460c08601611f69565b60808201526122c560e086016121fa565b60a08201526122d761010086016121fa565b60c0820152809150509250925092565b6000806000606084860312156122fc57600080fd5b61230584611f69565b925061231360208501611f69565b9150604084013590509250925092565b60008060006060848603121561233857600080fd5b833592506020840135915061234f60408501611f69565b90509250925092565b60006020808352835180602085015260005b818110156123865785810183015185820160400152820161236a565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60006020828403121561240657600080fd5b6108b182611f69565b60006020828403121561242157600080fd5b5051919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b8082018082111561189b5761189b612428565b808202811582820484141761189b5761189b612428565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b8181038181111561189b5761189b612428565b6000826124f9577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b50049056fea26469706673582212200fabe56acbd9f8051975c1107d0f676838834f439f6d2d6f70beee5342cc69c664736f6c63430008180033";

type PoolLogicConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PoolLogicConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PoolLogic__factory extends ContractFactory {
  constructor(...args: PoolLogicConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      PoolLogic & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): PoolLogic__factory {
    return super.connect(runner) as PoolLogic__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PoolLogicInterface {
    return new Interface(_abi) as PoolLogicInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): PoolLogic {
    return new Contract(address, _abi, runner) as unknown as PoolLogic;
  }
}