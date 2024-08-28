import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Table, Tooltip } from 'antd/es'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Address } from 'viem'
import { useSwitchChain } from 'wagmi'

import CustomSortIcon from '@/components/CustomSortIcon'
import LPName from '@/components/LPName'
import { useWagmiCtx } from '@/components/WagmiContext'
import { SupportedChainId } from '@/constants/chains'
import useDeviceDetect from '@/hooks/useDeviceDetect'
import usePrices from '@/hooks/usePrices'
import { useAccountManager } from '@/hooks/useSDK'
import { formatSymbol, toDecimals } from '@/sdk/utils/token'
import { useLendStore } from '@/store'
import { IFormattedLendPool } from '@/store/lend'
import { nameChecker } from '@/utils'
import { addComma, aprToApy100, formatFloatNumber, formatNumberByUnit, toPrecision } from '@/utils/math'
import { div, minus } from '@/utils/math/bigNumber'

import BorrowDialog from './BorrowDialog'
import DepositDialog from './DepositDialog'
import CapHover from './HoverComponents/CapHover'
import RewardsHover from './HoverComponents/RewardsHover'
import PercentCircle from './PercentCircle'
// import RepayDialog from './RepayDialog'
import useLendingList from './useLendingList'
// import WithdrawDialog from './WithdrawDialog'

const { Column } = Table

export default function LendingTable() {
  const navigate = useNavigate()

  const { getPrice } = usePrices()
  const { account, chainId } = useWagmiCtx()
  const { openConnectModal } = useConnectModal()
  const { switchChain } = useSwitchChain()
  const { isMobile } = useDeviceDetect()
  const accountManager = useAccountManager()
  const { currentPosition, currentDialogShow, updateDialogShow, updateCurrentPosition } = useLendStore()

  const {
    formattedLendPools,
    // fetchLendPools,
    // isFetching: isFetchingLendingList,
  } = useLendingList()

  const [activeChain, setActiveChain] = useState(chainId)
  const [balanceMap, setBalanceMap] = useState({})

  useEffect(() => {
    console.log('formattedLendPools :>> ', formattedLendPools)
    // get Balances for list
    if (account) {
      accountManager
        .getBalances(
          [account],
          formattedLendPools.map((i) => i.underlyingAsset as Address)
        )
        .then((r) => {
          const balanceMap = {}
          formattedLendPools.forEach((i, index) => {
            balanceMap[i.underlyingAsset] = toDecimals(r[index], i.decimals)
          })
          setBalanceMap(balanceMap)
        })
    }
  }, [formattedLendPools, accountManager, account])

  // const [currentLendingPoolDetail, setCurrentLendingPoolDetail] = useState(undefined)

  // useEffect(() => {
  //   mng.multicallPoolsStatus([1n, 2n, 3n])
  // }, [mng])

  return (
    <>
      <DepositDialog
        open={currentDialogShow === 'deposit'}
        currentLendingPoolDetail={currentPosition}
        onClose={() => updateDialogShow(null)}
      ></DepositDialog>

      {/* <WithdrawDialog
        open={currentDialogShow === 'withdraw'}
        currentLendingPoolDetail={currentPosition}
        onClose={() => updateDialogShow(null)}
      ></WithdrawDialog>
      <RepayDialog
        open={currentDialogShow === 'repay'}
        currentLendingPoolDetail={currentPosition}
        onClose={() => updateDialogShow(null)}
      ></RepayDialog> */}

      <BorrowDialog
        open={currentDialogShow === 'borrow'}
        currentLendingPoolDetail={currentPosition}
        onClose={() => updateDialogShow(null)}
      ></BorrowDialog>

      <Table
        className='lend-list-table'
        sortDirections={['descend', 'ascend']}
        dataSource={formattedLendPools}
        pagination={false}
        rowKey={(i: IFormattedLendPool) => i.symbol}
        onRow={(record: IFormattedLendPool) => {
          return {
            onClick: () => {
              navigate(`/lend/${record.id}`)
            },
          }
        }}
        locale={{
          emptyText: (
            <div className='ant-empty ant-empty-normal'>
              <div
                className='ant-empty-description'
                style={{
                  margin: '20px 0',
                }}
              >
                No Active Pools
              </div>
            </div>
          ),
        }}
      >
        <Column
          title='Pool'
          dataIndex=''
          key='poolKey'
          render={(pool: IFormattedLendPool) => {
            return (
              <>
                <div className='lending-list-title-wrap'>
                  <LPName token0={nameChecker(formatSymbol(pool.symbol))} title={nameChecker(pool.symbol)}>
                    <div className='lending-list-title-wrap-balance text-sm-2'>
                      Wallet: {formatFloatNumber(balanceMap[pool.underlyingAsset] || 0)}
                    </div>
                  </LPName>
                </div>
              </>
            )
          }}
        />
        <Column
          title='Total Supply'
          dataIndex=''
          key='totalSupply'
          showSorterTooltip={false}
          sortIcon={CustomSortIcon}
          sorter={(a: IFormattedLendPool, b: IFormattedLendPool) => {
            return Number(a.totalLiquidityUSD) - Number(b.totalLiquidityUSD)
          }}
          render={(i: IFormattedLendPool) => {
            const amount = Number(i.totalLiquidity)
            const value = Number(i.totalLiquidityUSD)
            return (
              <CapHover type='supply' max={Number(i.supplyCap)} current={amount} price={Number(i.priceInUSD)}>
                <div>
                  {isMobile && <div className='text-bold-small'>Total Supply</div>}
                  <div className='flex ai-ct gap-10'>
                    <div>
                      <div>
                        {amount < 1 ? formatNumberByUnit(amount) : addComma(amount)}{' '}
                        {/* {nameChecker(i.tokenSymbol)} */}
                      </div>
                      <div className='text-sm-2'>${formatNumberByUnit(value)}</div>
                    </div>
                    <div>
                      <PercentCircle
                        radix={8}
                        percent={div(i.totalLiquidity, i.supplyCap).toNumber()}
                        strokeWidth={2.5}
                        strokeColor={'#38AD3D'}
                      />
                    </div>
                  </div>
                </div>
              </CapHover>
            )
          }}
        />
        <Column
          title='Total Borrow'
          dataIndex=''
          key='totalBorrowed'
          sortIcon={CustomSortIcon}
          showSorterTooltip={false}
          sorter={(a: IFormattedLendPool, b: IFormattedLendPool) => {
            return Number(a.totalDebtUSD) - Number(b.totalDebtUSD)
          }}
          render={(i: IFormattedLendPool) => {
            const amount = Number(i.totalDebt)
            const value = Number(i.totalDebtUSD)
            return (
              <CapHover
                type='borrow'
                max={Number(i.borrowCap)}
                current={Number(i.totalDebt)}
                price={Number(i.priceInUSD)}
              >
                <div>
                  {isMobile && <div className='text-bold-small'>Total Supply</div>}
                  <div className='flex ai-ct gap-10'>
                    <div>
                      <div>
                        {amount < 1 ? formatNumberByUnit(amount) : addComma(amount)}{' '}
                        {/* {nameChecker(i.tokenSymbol)} */}
                      </div>
                      <div className='text-sm-2'>${formatNumberByUnit(value)}</div>
                    </div>
                    <PercentCircle
                      radix={8}
                      percent={div(i.totalDebt, i.borrowCapUSD).toNumber()}
                      strokeWidth={2.5}
                      strokeColor={'#EC6F14'}
                    />
                  </div>
                </div>
              </CapHover>
            )
          }}
        />

        <Column
          title='Liquidity'
          dataIndex=''
          key='availableLiquidity'
          showSorterTooltip={false}
          sortIcon={CustomSortIcon}
          sorter={(a: IFormattedLendPool, b: IFormattedLendPool) => {
            return Number(a.availableLiquidityUSD) - Number(b.availableLiquidityUSD)
          }}
          render={(i: IFormattedLendPool) => {
            const amount = Number(i.formattedAvailableLiquidity)
            const value = Number(i.availableLiquidityUSD)
            return (
              <>
                {isMobile && <div className='text-bold-small'>Total Supply</div>}
                <div>
                  {amount < 1 ? formatNumberByUnit(amount) : addComma(amount)} {/* {nameChecker(i.tokenSymbol)} */}
                </div>
                <div className='text-sm-2'>${formatNumberByUnit(value)}</div>
              </>
            )
          }}
        />

        <Column
          title='Utilization'
          dataIndex=''
          key='utilization'
          showSorterTooltip={false}
          sortIcon={CustomSortIcon}
          sorter={(a: IFormattedLendPool, b: IFormattedLendPool) => {
            return Number(a.supplyUsageRatio) - Number(b.supplyUsageRatio)
          }}
          render={(i: IFormattedLendPool) => {
            return (
              <>
                {isMobile && <div className='text-bold-small'>Utilization</div>}
                <div>{toPrecision(Number(i.supplyUsageRatio) * 100)}%</div>
              </>
            )
          }}
        />

        <Column
          title='LTV'
          dataIndex=''
          key='ltv'
          showSorterTooltip={false}
          sortIcon={CustomSortIcon}
          sorter={(a: IFormattedLendPool, b: IFormattedLendPool) => {
            return minus(a.formattedBaseLTVasCollateral, b.formattedBaseLTVasCollateral).toNumber()
          }}
          render={(i: IFormattedLendPool) => {
            return (
              <>
                {isMobile && <div className='text-bold-small'>LTV</div>}
                <div>{toPrecision(Number(i.formattedBaseLTVasCollateral), 2)}</div>
              </>
            )
          }}
        />

        <Column
          title='Supply APY'
          dataIndex=''
          key='apr'
          width={150}
          showSorterTooltip={false}
          sortIcon={CustomSortIcon}
          sorter={(a: IFormattedLendPool, b: IFormattedLendPool) => {
            return minus(a.supplyAPY, b.supplyAPY).toNumber()
          }}
          render={(pool: IFormattedLendPool) => {
            const apy = Number(pool.supplyAPY) * 100
            return (
              // for test
              <RewardsHover
                baseApy={apy}
                rewards={[
                  {
                    token: 'OP',
                    weekAmount: 1000,
                    apy: 0.0544,
                  },
                ]}
              >
                <>
                  {isMobile && <div className='text-bold-small'>APY</div>}
                  <div className='flex ai-ct jc-sb gap-10'>
                    <span className='text-apr color-safe'>+{toPrecision(apy)}%</span>
                    <Link
                      to={`/lend/supply/${pool.id}`}
                      onClick={(e) => {
                        if (!account) {
                          e.preventDefault()
                          openConnectModal?.()
                        }
                        if (!(chainId in SupportedChainId)) {
                          e.preventDefault()
                          switchChain?.({ chainId: SupportedChainId.OPTIMISM })
                        }
                        if (activeChain !== chainId) {
                          e.preventDefault()
                          switchChain?.({ chainId: activeChain })
                          return
                        }
                        e.stopPropagation()
                      }}
                    >
                      <button className='btn-base btn-base-small'>Supply</button>
                    </Link>
                  </div>
                </>
              </RewardsHover>
            )
          }}
        />

        <Column
          title='Borrow APR'
          dataIndex=''
          width={150}
          key='borrowingRate'
          showSorterTooltip={false}
          sortIcon={CustomSortIcon}
          sorter={(a: IFormattedLendPool, b: IFormattedLendPool) => {
            return minus(a.variableBorrowAPY, b.variableBorrowAPY).toNumber()
          }}
          render={(pool: IFormattedLendPool) => {
            return (
              <>
                <div className='flex ai-ct jc-sb gap-10'>
                  <span className='color-danger'>-{toPrecision(Number(pool.variableBorrowAPY) * 100)}%</span>
                  <Link
                    to={`/lend/borrow/${pool.id}`}
                    state={{ isBorrowMode: true }}
                    onClick={(e) => {
                      if (!account) {
                        e.preventDefault()
                        openConnectModal?.()
                      }
                      if (!(chainId in SupportedChainId)) {
                        e.preventDefault()
                        switchChain?.({ chainId: SupportedChainId.OPTIMISM })
                      }
                      if (activeChain !== chainId) {
                        e.preventDefault()
                        switchChain?.({ chainId: activeChain })
                        return
                      }
                      e.stopPropagation()
                    }}
                  >
                    <button className='btn-base btn-base-small'>Borrow</button>
                  </Link>
                </div>
              </>
            )
          }}
        />

        {/* <Column
          title="Deposited"
          dataIndex=""
          key="deposited"
          sorter={(a: any, b: any) => {
            return a.deposited - b.deposited
          }}
          render={(i: IFormattedLendPool) => {
            return (
              <>
                <div>{toPrecision(i.formatted.deposited)}</div>
                <div className="text-sm-2">
                  $
                  {formatNumberByUnit(
                    toPrecisionNum(i.formatted.deposited * getPrice(i.tokenSymbol)),
                  )}
                </div>
              </>
            )
          }}
        />
        <Column
          title="Borrowed"
          dataIndex=""
          key="borrowed"
          sorter={(a: any, b: any) => {
            return a.borrowed - b.borrowed
          }}
          render={(i: IFormattedLendPool) => {
            return (
              <>
                <div>{toPrecision(i.formatted.borrowed)}</div>
                <div className="text-sm-2">
                  $
                  {formatNumberByUnit(
                    toPrecisionNum(i.formatted.borrowed * getPrice(i.tokenSymbol)),
                  )}
                </div>
              </>
            )
          }}
        /> */}
        {/* <Column
          title="Actions"
          dataIndex=""
          key="action"
          render={(i: IFormattedLendPool) => {
            return (
              <div className="flex ai-ct lending-table-actions">
                <button
                  className="btn-base btn-base-small"
                  disabled={!i.deposited}
                  onClick={() => {
                    console.log(i)
                    updateCurrentPosition(i)
                    updateDialogShow('withdraw')
                  }}
                >
                  Withdraw
                </button>

                <button
                  className="btn-base btn-base-small"
                  disabled={!i.borrowed}
                  onClick={() => {
                    updateCurrentPosition(i)
                    updateDialogShow('repay')
                  }}
                >
                  Repay
                </button>
              </div>
            )
          }}
        /> */}
      </Table>
    </>
  )
}
