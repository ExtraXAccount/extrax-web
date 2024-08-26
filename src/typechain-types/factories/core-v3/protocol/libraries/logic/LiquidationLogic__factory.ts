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
  LiquidationLogic,
  LiquidationLogicInterface,
} from "../../../../../core-v3/protocol/libraries/logic/LiquidationLogic";

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
        name: "collateralAsset",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "debtAsset",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "debtToCover",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "liquidatedCollateralAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "liquidator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "receiveAToken",
        type: "bool",
      },
    ],
    name: "LiquidationCall",
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
        name: "liquidityRate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "stableBorrowRate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "variableBorrowRate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "liquidityIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "variableBorrowIndex",
        type: "uint256",
      },
    ],
    name: "ReserveDataUpdated",
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
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "ReserveUsedAsCollateralDisabled",
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
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "ReserveUsedAsCollateralEnabled",
    type: "event",
  },
  {
    inputs: [],
    name: "CLOSE_FACTOR_HF_THRESHOLD",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_LIQUIDATION_CLOSE_FACTOR",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x613fe861003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361061004b5760003560e01c806383c1087d14610050578063a18964a514610072578063d246754414610093575b600080fd5b81801561005c57600080fd5b5061007061006b366004613af1565b61009c565b005b610081670d2f13f7789f000081565b60405190815260200160405180910390f35b61008161271081565b6100a46138ec565b60408083015173ffffffffffffffffffffffffffffffffffffffff9081166000908152602089815283822060608701518416835284832060808801519094168352908890529290206100f582610830565b6101608501819052610108908390610a49565b61018e8989886040518060a001604052808660405180602001604052908160008201548152505081526020018a6000015181526020018a6080015173ffffffffffffffffffffffffffffffffffffffff1681526020018a60c0015173ffffffffffffffffffffffffffffffffffffffff1681526020018a60e0015160ff16815250610ad2565b5060c089018190526101608901516101ad955093508992509050611042565b86602001876040018860600183815250838152508381525050505061021b818460405180608001604052808861016001518152602001886040015181526020018860c00151815260200189610100015173ffffffffffffffffffffffffffffffffffffffff168152506110c8565b610226868487611577565b60a088015273ffffffffffffffffffffffffffffffffffffffff908116610120880152908116610100870152908116610140860181905260808701516040517f70a0823100000000000000000000000000000000000000000000000000000000815292166004830152906370a0823190602401602060405180830381865afa1580156102b6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102da9190613bfa565b808552610160850151610100860151610120870151606088015160a089015160c08b015161030f968a969594939290916116ab565b60e087015260608601819052608086019190915260408501510361035c57600382015461035c9082907501000000000000000000000000000000000000000000900461ffff166000611a0b565b835160e085015160808601516103729190613c42565b036104095760038301546103a69082907501000000000000000000000000000000000000000000900461ffff166000611aa0565b846080015173ffffffffffffffffffffffffffffffffffffffff16856040015173ffffffffffffffffffffffffffffffffffffffff167f44c58d81365b66dd4b1a7f36c25aa97b8c71c361ee4937adc1a00000227db5dd60405160405180910390a35b6104138585611b29565b6101608401516060808701519086015161043292859290916000611dba565b61044889898387610160015188606001516120fb565b8460a001511561046557610460898989868989612303565b610470565b61047083868661250e565b60e08401511561067a576000610485846125e6565b905060006104a0828760e0015161267c90919063ffffffff16565b61014087015160808901516040517f1da24f3e00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9182166004820152929350600092911690631da24f3e90602401602060405180830381865afa15801561051d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105419190613bfa565b90508082111561055b5761055581846126bb565b60e08801525b86610140015173ffffffffffffffffffffffffffffffffffffffff1663f866c319896080015189610140015173ffffffffffffffffffffffffffffffffffffffff1663ae1673356040518163ffffffff1660e01b8152600401602060405180830381865afa1580156105d1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105f59190613c55565b8a60e001516040518463ffffffff1660e01b81526004016106449392919073ffffffffffffffffffffffffffffffffffffffff9384168152919092166020820152604081019190915260600190565b600060405180830381600087803b15801561065e57600080fd5b505af1158015610672573d6000803e3d6000fd5b505050505050505b6106b9338561016001516101e001518660600151886060015173ffffffffffffffffffffffffffffffffffffffff16612712909392919063ffffffff16565b6101608401516101e00151608086015160608601516040517f6fd9767600000000000000000000000000000000000000000000000000000000815233600482015273ffffffffffffffffffffffffffffffffffffffff92831660248201526044810191909152911690636fd9767690606401600060405180830381600087803b15801561074557600080fd5b505af1158015610759573d6000803e3d6000fd5b50505050846080015173ffffffffffffffffffffffffffffffffffffffff16856060015173ffffffffffffffffffffffffffffffffffffffff16866040015173ffffffffffffffffffffffffffffffffffffffff167fe413a321e8681d831f4dbccbca790d2952b56f977908e45be37335533e00528687606001518860800151338b60a0015160405161081d9493929190938452602084019290925273ffffffffffffffffffffffffffffffffffffffff1660408301521515606082015260800190565b60405180910390a4505050505050505050565b610838613994565b610840613994565b60408051602081018252845481526101c0830181905251901c61ffff166101a082015260018301546fffffffffffffffffffffffffffffffff808216610100840181905260e0840152600285015480821661014085018190526101208501527001000000000000000000000000000000009283900482166101608501528290041661018083015260048085015473ffffffffffffffffffffffffffffffffffffffff9081166101e085015260058601548116610200850152600686015416610220840181905260038601549290920464ffffffffff16610240840152604080517fb1bf962d000000000000000000000000000000000000000000000000000000008152905163b1bf962d928281019260209291908290030181865afa15801561096d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109919190613bfa565b816020018181525081600001818152505080610200015173ffffffffffffffffffffffffffffffffffffffff1663797743386040518163ffffffff1660e01b8152600401608060405180830381865afa1580156109f2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a169190613c72565b64ffffffffff166102608501526060840181905260808401829052604084019290925260c083015260a082015292915050565b600382015464ffffffffff4281167001000000000000000000000000000000009092041603610a76575050565b610a8082826127ed565b610a8a828261290f565b5060030180547fffffffffffffffffffffff0000000000ffffffffffffffffffffffffffffffff167001000000000000000000000000000000004264ffffffffff1602179055565b600080600080600080610ae88760000151511590565b15610b245750600094508493508392508291507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff905081611035565b610bd360405180610260016040528060008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff1681526020016000151581526020016000151581525090565b608088015160ff1615610c1857608088015160ff16600090815260208a9052604090206060890151610c059190612a92565b6101808401526101c08301526101a08201525b87602001518160c001511015610f375760c08101518851610c3891612b71565b610c4c5760c0810180516001019052610c18565b60c0810151600090815260208b9052604090205473ffffffffffffffffffffffffffffffffffffffff166102008201819052610c925760c0810180516001019052610c18565b61020081015173ffffffffffffffffffffffffffffffffffffffff16600090815260208c8152604091829020825180830190935280549283905260ff60a884901c81166101e0860152603084901c166060850181905261ffff601085901c811660a08701529093166080850152600a9290920a9083015261018082015115801590610d285750816101e00151896080015160ff16145b610dcc5760608901516102008301516040517fb3596f0700000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff918216600482015291169063b3596f0790602401602060405180830381865afa158015610da3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dc79190613bfa565b610dd3565b8161018001515b825260a082015115801590610df3575060c08201518951610df391612bf9565b15610ee357610e1089604001518284600001518560200151612c7d565b6040830181905261010083018051610e29908390613c42565b90525060808901516101e0830151610e449160ff1690612d58565b1515610240830152608082015115610e9a57816102400151610e6a578160800151610e71565b816101a001515b8260400151610e809190613cbd565b8261014001818151610e929190613c42565b905250610ea3565b60016102208301525b816102400151610eb7578160a00151610ebe565b816101c001515b8260400151610ecd9190613cbd565b8261016001818151610edf9190613c42565b9052505b60c08201518951610ef391612d69565b15610f2657610f1089604001518284600001518560200151612deb565b8261012001818151610f229190613c42565b9052505b5060c0810180516001019052610c18565b806101000151600003610f4b576000610f66565b80610100015181610140015181610f6457610f64613cd4565b045b610140820152610100810151600003610f80576000610f9b565b80610100015181610160015181610f9957610f99613cd4565b045b61016082015261012081015115610fdd57610fd8816101200151610fd2836101600151846101000151612f6b90919063ffffffff16565b90612fae565b610fff565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5b60e0820181905261010082015161012083015161014084015161016085015161022090950151929a509098509650919450925090505b9499939850945094509450565b6000806000806000611058876080015189612fe5565b909250905060006110698284613c42565b90506000670d2f13f7789f0000881161108457612710611088565b6113885b905060006110968383612f6b565b90506000818b60200151116110af578a602001516110b1565b815b949850929650929450505050505b93509350939050565b6040805160a08101825260008082526020820181905291810182905260608101829052608081019190915260408051602081019091528354815261114e9051670100000000000000811615159167020000000000000082161515916704000000000000008116151591670800000000000000821615159167100000000000000016151590565b1515602086015250505015801580835283516101c0015151671000000000000000811615156060850152670100000000000000161515604084015290611195575080604001515b6040518060400160405280600281526020017f32370000000000000000000000000000000000000000000000000000000000008152509061120c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112039190613d03565b60405180910390fd5b50806020015115801561122157508060600151155b6040518060400160405280600281526020017f32390000000000000000000000000000000000000000000000000000000000008152509061128f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112039190613d03565b50606082015173ffffffffffffffffffffffffffffffffffffffff1615806112c25750670d2f13f7789f00008260400151105b8061133b5750816060015173ffffffffffffffffffffffffffffffffffffffff16637a5d20ea6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611317573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061133b9190613d70565b6040518060400160405280600281526020017f3539000000000000000000000000000000000000000000000000000000000000815250906113a9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112039190613d03565b50670de0b6b3a76400008260400151106040518060400160405280600281526020017f343500000000000000000000000000000000000000000000000000000000000081525090611427576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112039190613d03565b50604080516020810190915283549081905260101c61ffff161580159061148357506003830154604080516020810190915285548152611483917501000000000000000000000000000000000000000000900461ffff16612bf9565b15156080820181905260408051808201909152600281527f34360000000000000000000000000000000000000000000000000000000000006020820152906114f8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112039190613d03565b508160200151600014156040518060400160405280600281526020017f343700000000000000000000000000000000000000000000000000000000000081525090611570576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112039190613d03565b5050505050565b6004820154604080516020808201835285549182905291840151606085015160e086015160009586958695869573ffffffffffffffffffffffffffffffffffffffff90931694911c61ffff169260ff161561169a5760e08901805160ff908116600090815260208e815260409182902054935182519182019092528d5490819052660100000000000090930473ffffffffffffffffffffffffffffffffffffffff169261162e929182169160a89190911c16612d58565b156116785760e08a015160ff16600090815260208d90526040902054640100000000900461ffff16935073ffffffffffffffffffffffffffffffffffffffff811615611678578092505b73ffffffffffffffffffffffffffffffffffffffff811615611698578091505b505b929a90995091975095509350505050565b600080600061171b604051806101a00160405280600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081525090565b6040517fb3596f0700000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8b8116600483015286169063b3596f0790602401602060405180830381865afa158015611787573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117ab9190613bfa565b81526040517fb3596f0700000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8a8116600483015286169063b3596f0790602401602060405180830381865afa158015611819573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061183d9190613bfa565b6020828101919091526040805191820190528c549081905260301c60ff1660c08201526101c08b01515160301c60ff1660a0820181905260c0820151600a90810a60e08401520a61010082015260408051602081019091528c549081905260981c61ffff1661016082015261010081015181516118ba9190613cbd565b8160e001518983602001516118cf9190613cbd565b6118d99190613cbd565b6118e39190613d8d565b606082018190526118f49087612f6b565b6040820181905287101561196157610120810187905260e081015160208201516119569188916119249190613cbd565b610100840151610120850151855161193c9190613cbd565b6119469190613cbd565b6119509190613d8d565b90613122565b610140820152611975565b604081015161012082015261014081018890525b610160810151156119e7576101208101516119909087613122565b8161012001516119a09190613dc8565b608082018190526101608201516119b79190612f6b565b61018082018190526101208201516119cf9190613dc8565b816101400151826101800151935093509350506119fd565b8061012001518161014001516000935093509350505b985098509895505050505050565b60408051808201909152600281527f3734000000000000000000000000000000000000000000000000000000000000602082015260808310611a7a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112039190613d03565b50600182811b1b8115611a9257835481178455611a9a565b835481191684555b50505050565b60408051808201909152600281527f3734000000000000000000000000000000000000000000000000000000000000602082015260808310611b0f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112039190613d03565b50600182811b81011b8115611a9257835481178455611a9a565b8060600151816020015110611c015761016081015161022081015160808401516060840151610140909301516040517ff5298aca00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff928316600482015260248101949094526044840152169063f5298aca906064016020604051808303816000875af1158015611bcf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611bf39190613bfa565b610160820151602001525050565b602081015115611cd15761016081015161022081015160808401516020840151610140909301516040517ff5298aca00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff928316600482015260248101949094526044840152169063f5298aca906064016020604051808303816000875af1158015611ca2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611cc69190613bfa565b610160820151602001525b806101600151610200015173ffffffffffffffffffffffffffffffffffffffff16639dc29fac836080015183602001518460600151611d109190613dc8565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815273ffffffffffffffffffffffffffffffffffffffff9092166004830152602482015260440160408051808303816000875af1158015611d7f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611da39190613ddb565b61016083015160a081019190915260c001525b5050565b611de56040518060800160405280600081526020016000815260200160008152602001600081525090565b6101408501516020860151611df9916126bb565b60608083019182526007880154604080516101208101825260088b01546fffffffffffffffffffffffffffffffff7001000000000000000000000000000000009091041681526020810188905280820187905260c0808b0151948201949094529351608085015260a0808a0151908501526101a08901519284019290925273ffffffffffffffffffffffffffffffffffffffff87811660e08501526101e0890151811661010085015291517fa589870900000000000000000000000000000000000000000000000000000000815291169163a589870991611f5a9190600401600061012082019050825182526020830151602083015260408301516040830152606083015160608301526080830151608083015260a083015160a083015260c083015160c083015260e083015173ffffffffffffffffffffffffffffffffffffffff80821660e0850152610100915080828601511682850152505092915050565b606060405180830381865afa158015611f77573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611f9b9190613dff565b60408401526020830152808252611fb19061314d565b6001870180546fffffffffffffffffffffffffffffffff9283167001000000000000000000000000000000000292169190911790556020810151611ff49061314d565b6003870180547fffffffffffffffffffffffffffffffff00000000000000000000000000000000166fffffffffffffffffffffffffffffffff9290921691909117905560408101516120459061314d565b6002870180546fffffffffffffffffffffffffffffffff92831670010000000000000000000000000000000002921691909117905580516020808301516040808501516101008a01516101408b0151835196875294860193909352908401526060830152608082015273ffffffffffffffffffffffffffffffffffffffff8516907f804c9b842b2748a22bb64b345453a3de7ca54a6ca45ce00d415894979e22897a9060a00160405180910390a2505050505050565b604080516020810190915283548152600090819061211a9088886131f3565b509150915081156122fa5773ffffffffffffffffffffffffffffffffffffffff81166000908152602088905260408120600901546101c0860151516fffffffffffffffffffffffffffffffff909116919061219c9060029060301c60ff166121829190613dc8565b61218d90600a613f4d565b6121979087613d8d565b61314d565b9050806fffffffffffffffffffffffffffffffff16826fffffffffffffffffffffffffffffffff161161224c5773ffffffffffffffffffffffffffffffffffffffff8316600081815260208b8152604080832060090180547fffffffffffffffffffffffffffffffff00000000000000000000000000000000169055519182527faef84d3b40895fd58c561f3998000f0583abb992a52fbdc99ace8e8de4d676a5910160405180910390a26122f7565b60006122588284613f59565b73ffffffffffffffffffffffffffffffffffffffff8516600081815260208d815260409182902060090180547fffffffffffffffffffffffffffffffff00000000000000000000000000000000166fffffffffffffffffffffffffffffffff959095169485179055905183815292935090917faef84d3b40895fd58c561f3998000f0583abb992a52fbdc99ace8e8de4d676a5910160405180910390a2505b50505b50505050505050565b6101408101516040517f70a0823100000000000000000000000000000000000000000000000000000000815233600482015260009173ffffffffffffffffffffffffffffffffffffffff16906370a0823190602401602060405180830381865afa158015612375573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906123999190613bfa565b610140830151608080860151908501516040517ff866c31900000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff92831660048201523360248201526044810191909152929350169063f866c31990606401600060405180830381600087803b15801561242257600080fd5b505af1158015612436573d6000803e3d6000fd5b50505050806000036122fa5733600090815260208681526040918290208251918201909252855481526004860154612489918a918a91859173ffffffffffffffffffffffffffffffffffffffff166132a8565b156125045760038501546124bd9082907501000000000000000000000000000000000000000000900461ffff166001611aa0565b6040808501519051339173ffffffffffffffffffffffffffffffffffffffff16907e058a56ea94653cdf4f152d227ace22d4c00ad99e2a43f58cb7d9e3feb295f290600090a35b5050505050505050565b600061251984610830565b90506125258482610a49565b60408301516080830151612540918691849190600090611dba565b610140820151608080850151908401516101008401516040517fd7020d0a00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff93841660048201523360248201526044810192909252606482015291169063d7020d0a90608401600060405180830381600087803b1580156125d257600080fd5b505af1158015612504573d6000803e3d6000fd5b6003810154600090700100000000000000000000000000000000900464ffffffffff1642810361262b575050600101546fffffffffffffffffffffffffffffffff1690565b600183015461266f906fffffffffffffffffffffffffffffffff808216916126699170010000000000000000000000000000000090910416846134ea565b906126bb565b9392505050565b50919050565b600081156b033b2e3c9fd0803ce8000000600284041904841117156126a057600080fd5b506b033b2e3c9fd0803ce80000009190910260028204010490565b600081157ffffffffffffffffffffffffffffffffffffffffffe6268e1b017bfe18bffffff839004841115176126f057600080fd5b506b033b2e3c9fd0803ce800000091026b019d971e4fe8401e74000000010490565b6040517f23b872dd0000000000000000000000000000000000000000000000000000000080825273ffffffffffffffffffffffffffffffffffffffff8581166004840152841660248301526044820183905290600080606483828a5af161277d573d6000803e3d6000fd5b5061278785613527565b611570576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f475076323a206661696c6564207472616e7366657246726f6d000000000000006044820152606401611203565b6101608101511561287d57600061280e8261016001518361024001516134ea565b90506128278260e00151826126bb90919063ffffffff16565b61010083018190526128389061314d565b6001840180547fffffffffffffffffffffffffffffffff00000000000000000000000000000000166fffffffffffffffffffffffffffffffff92909216919091179055505b805115611db657600061289a8261018001518361024001516135f0565b90506128b4826101200151826126bb90919063ffffffff16565b61014083018190526128c59061314d565b6002840180546fffffffffffffffffffffffffffffffff929092167fffffffffffffffffffffffffffffffff00000000000000000000000000000000909216919091179055505050565b6129486040518060c001604052806000815260200160008152602001600081526020016000815260200160008152602001600081525090565b816101a0015160000361295a57505050565b610120820151825161296b916126bb565b60208201526101408201518251612981916126bb565b604082015260608201516102608301516102408401516129a992919064ffffffffff166135f9565b6060820181905260408301516129be916126bb565b8082526020820151608084015160408401516129da9190613c42565b6129e49190613dc8565b6129ee9190613dc8565b608082018190526101a0830151612a059190612f6b565b60a0820181905215612a8d57612a306121978361010001518360a0015161267c90919063ffffffff16565b600884018054600090612a569084906fffffffffffffffffffffffffffffffff16613f89565b92506101000a8154816fffffffffffffffffffffffffffffffff02191690836fffffffffffffffffffffffffffffffff1602179055505b505050565b81546000908190819081906601000000000000900473ffffffffffffffffffffffffffffffffffffffff168015612b56576040517fb3596f0700000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff828116600483015287169063b3596f0790602401602060405180830381865afa158015612b2f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612b539190613bfa565b91505b50945461ffff80821697620100009092041695945092505050565b60408051808201909152600281527f3734000000000000000000000000000000000000000000000000000000000000602082015260009060808310612be3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112039190613d03565b50508151600182901b1c60031615155b92915050565b60408051808201909152600281527f3734000000000000000000000000000000000000000000000000000000000000602082015260009060808310612c6b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112039190613d03565b50509051600191821b82011c16151590565b600080612c89856125e6565b6004868101546040517f1da24f3e00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8a8116938201939093529293506000928792612d2f928692911690631da24f3e90602401602060405180830381865afa158015612d0b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906126699190613bfa565b612d399190613cbd565b9050838181612d4a57612d4a613cd4565b04925050505b949350505050565b6000821580159061266f5750501490565b60408051808201909152600281527f3734000000000000000000000000000000000000000000000000000000000000602082015260009060808310612ddb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112039190613d03565b50509051600191821b1c16151590565b60068301546040517f1da24f3e00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff86811660048301526000928392911690631da24f3e90602401602060405180830381865afa158015612e61573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612e859190613bfa565b90508015612ea357612ea0612e9986613743565b82906126bb565b90505b60058501546040517f70a0823100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8881166004830152909116906370a0823190602401602060405180830381865afa158015612f15573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612f399190613bfa565b612f439082613c42565b9050612f4f8185613cbd565b9050828181612f6057612f60613cd4565b049695505050505050565b600081157fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffec7783900484111517612fa057600080fd5b506127109102611388010490565b60008115670de0b6b3a764000060028404190484111715612fce57600080fd5b50670de0b6b3a76400009190910260028204010490565b6102008101516040517f70a0823100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff848116600483015260009283929116906370a0823190602401602060405180830381865afa15801561305c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906130809190613bfa565b6102208401516040517f70a0823100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8781166004830152909116906370a0823190602401602060405180830381865afa1580156130f3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906131179190613bfa565b915091509250929050565b600081156127106002840419048411171561313c57600080fd5b506127109190910260028204010490565b60006fffffffffffffffffffffffffffffffff8211156131ef576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602760248201527f53616665436173743a2076616c756520646f65736e27742066697420696e203160448201527f32382062697473000000000000000000000000000000000000000000000000006064820152608401611203565b5090565b6000806000613201866137c6565b15613298576000613232877faaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa61380a565b6000818152602087815260408083205473ffffffffffffffffffffffffffffffffffffffff168084528a8352818420825193840190925290549182905292935060d41c64ffffffffff1690508015613294576001955090935091506110bf9050565b5050505b5060009586955085945092505050565b815160009060d41c64ffffffffff16156134d25760008273ffffffffffffffffffffffffffffffffffffffff16637535d2466040518163ffffffff1660e01b8152600401602060405180830381865afa158015613309573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061332d9190613c55565b73ffffffffffffffffffffffffffffffffffffffff16630542975c6040518163ffffffff1660e01b8152600401602060405180830381865afa158015613377573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061339b9190613c55565b90508073ffffffffffffffffffffffffffffffffffffffff1663707cd7166040518163ffffffff1660e01b8152600401602060405180830381865afa1580156133e8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061340c9190613c55565b6040517f91d148540000000000000000000000000000000000000000000000000000000081527fd1d2cf869016112a9af1107bcf43c3759daf22cf734aad47d0c9c726e33bc782600482015233602482015273ffffffffffffffffffffffffffffffffffffffff91909116906391d1485490604401602060405180830381865afa15801561349e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906134c29190613d70565b6134d05760009150506134e1565b505b6134de8686868661384e565b90505b95945050505050565b6000806134fe64ffffffffff841642613dc8565b6135089085613cbd565b6301e1338090049050612d50816b033b2e3c9fd0803ce8000000613c42565b6000613566565b7f08c379a000000000000000000000000000000000000000000000000000000000600052602060045280602452508060445260646000fd5b3d80156135a557602081146135df576135a07f475076323a206d616c666f726d6564207472616e7366657220726573756c7400601f61352e565b612676565b823b6135d6576135d67f475076323a206e6f74206120636f6e7472616374000000000000000000000000601461352e565b60019150612676565b3d6000803e50506000511515919050565b600061266f8383425b60008061360d64ffffffffff851684613dc8565b90508060000361362c576b033b2e3c9fd0803ce800000091505061266f565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81016000808060028511613662576000613667565b600285035b925066038882915c400061367b8a806126bb565b8161368857613688613cd4565b0491506301e1338061369a838b6126bb565b816136a7576136a7613cd4565b0490506000826136b78688613cbd565b6136c19190613cbd565b600290049050600082856136d5888a613cbd565b6136df9190613cbd565b6136e99190613cbd565b60069004905080826301e133806137008a8f613cbd565b61370a9190613d8d565b613720906b033b2e3c9fd0803ce8000000613c42565b61372a9190613c42565b6137349190613c42565b9b9a5050505050505050505050565b6003810154600090700100000000000000000000000000000000900464ffffffffff16428103613788575050600201546fffffffffffffffffffffffffffffffff1690565b600283015461266f906fffffffffffffffffffffffffffffffff808216916126699170010000000000000000000000000000000090910416846135f0565b80516000907faaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa16801580159061266f5750613802600182613dc8565b161592915050565b815160009082167fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8101198116825b60029190911c9081156134e157600101613839565b600061385c825161ffff1690565b60000361386b57506000612d50565b60408051602081019091528354908190527faaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa166138aa57506001612d50565b6040805160208101909152835481526000906138c79087876131f3565b50509050801580156138e25750825160d41c64ffffffffff16155b9695505050505050565b6040518061018001604052806000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200161398f613994565b905290565b6040518061028001604052806000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001613a186040518060200160405280600081525090565b815260006020820181905260408201819052606082018190526080820181905260a09091015290565b604051610120810167ffffffffffffffff81118282101715613a8c577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60405290565b73ffffffffffffffffffffffffffffffffffffffff81168114613ab457600080fd5b50565b8035613ac281613a92565b919050565b8015158114613ab457600080fd5b8035613ac281613ac7565b803560ff81168114613ac257600080fd5b60008060008060008587036101a0811215613b0b57600080fd5b86359550602087013594506040870135935060608701359250610120807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8083011215613b5657600080fd5b613b5e613a41565b91506080880135825260a08801356020830152613b7d60c08901613ab7565b6040830152613b8e60e08901613ab7565b6060830152610100613ba1818a01613ab7565b6080840152613bb1828a01613ad5565b60a0840152613bc36101408a01613ab7565b60c0840152613bd56101608a01613ae0565b60e0840152613be76101808a01613ab7565b9083015250949793965091945092919050565b600060208284031215613c0c57600080fd5b5051919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b80820180821115612bf357612bf3613c13565b600060208284031215613c6757600080fd5b815161266f81613a92565b60008060008060808587031215613c8857600080fd5b845193506020850151925060408501519150606085015164ffffffffff81168114613cb257600080fd5b939692955090935050565b8082028115828204841417612bf357612bf3613c13565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006020808352835180602085015260005b81811015613d3157858101830151858201604001528201613d15565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b600060208284031215613d8257600080fd5b815161266f81613ac7565b600082613dc3577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b81810381811115612bf357612bf3613c13565b60008060408385031215613dee57600080fd5b505080516020909101519092909150565b600080600060608486031215613e1457600080fd5b8351925060208401519150604084015190509250925092565b600181815b80851115613e8657817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04821115613e6c57613e6c613c13565b80851615613e7957918102915b93841c9390800290613e32565b509250929050565b600082613e9d57506001612bf3565b81613eaa57506000612bf3565b8160018114613ec05760028114613eca57613ee6565b6001915050612bf3565b60ff841115613edb57613edb613c13565b50506001821b612bf3565b5060208310610133831016604e8410600b8410161715613f09575081810a612bf3565b613f138383613e2d565b807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04821115613f4557613f45613c13565b029392505050565b600061266f8383613e8e565b6fffffffffffffffffffffffffffffffff828116828216039080821115613f8257613f82613c13565b5092915050565b6fffffffffffffffffffffffffffffffff818116838216019080821115613f8257613f82613c1356fea2646970667358221220754b8e7772a9f520e84915ba2ce270bfdcfe884cf8526610779ae7c30274662564736f6c63430008180033";

type LiquidationLogicConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LiquidationLogicConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LiquidationLogic__factory extends ContractFactory {
  constructor(...args: LiquidationLogicConstructorParams) {
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
      LiquidationLogic & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): LiquidationLogic__factory {
    return super.connect(runner) as LiquidationLogic__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LiquidationLogicInterface {
    return new Interface(_abi) as LiquidationLogicInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): LiquidationLogic {
    return new Contract(address, _abi, runner) as unknown as LiquidationLogic;
  }
}
