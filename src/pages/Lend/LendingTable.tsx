import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Table, Tooltip } from 'antd/es'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSwitchChain } from 'wagmi'

import CustomSortIcon from '@/components/CustomSortIcon'
import FormattedNumber from '@/components/FormattedNumber'
import LPName from '@/components/LPName'
import { useWagmiCtx } from '@/components/WagmiContext'
import { SupportedChainId } from '@/constants/chains'
import useDeviceDetect from '@/hooks/useDeviceDetect'
import { useFetchEthBalance } from '@/hooks/useFetchBalance'
import useSmartAccount from '@/hooks/useSmartAccount'
import { formatSymbol, isWETH, toDecimals } from '@/sdk/utils/token'
import { useAccountStore } from '@/store'
import { IFormattedLendPool } from '@/store/lend'
import { nameChecker } from '@/utils'
import { div, minus } from '@/utils/math/bigNumber'

import CapHover from './HoverComponents/CapHover'
import RewardsHover from './HoverComponents/RewardsHover'
import PercentCircle from './PercentCircle'
// import RepayDialog from './RepayDialog'
import useLendingList from './useLendingList'
// import WithdrawDialog from './WithdrawDialog'

const { Column } = Table

export default function LendingTable() {
  const navigate = useNavigate()

  const { account, chainId } = useWagmiCtx()
  const { openConnectModal } = useConnectModal()
  const { switchChain } = useSwitchChain()
  const { isMobile } = useDeviceDetect()

  const { fetchBalances } = useSmartAccount()
  const {
    formattedLendPools,
    // fetchLendPools,
    // isFetching: isFetchingLendingList,
  } = useLendingList()
  const { balanceMap } = useAccountStore()

  const [activeChain, setActiveChain] = useState(chainId)
  const { balance: ethBalance } = useFetchEthBalance()
  // const [balanceMap, setBalanceMap] = useState({})

  useEffect(() => {
    fetchBalances(account)
  }, [account, fetchBalances])

  return (
    <>
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
                  <LPName
                    token0={nameChecker(formatSymbol(pool.symbol))}
                    title={nameChecker(pool.symbol)}
                    isIsolated={!!pool?.isIsolated}
                  >
                    <div className='lending-list-title-wrap-balance text-sm-2'>
                      Wallet: <FormattedNumber value={
                        balanceMap[pool.underlyingAsset] + (isWETH(chainId, pool.underlyingAsset) ? Number(ethBalance) : 0)
                      } unit />
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
            return (
              <CapHover
                type='supply'
                max={Number(i.supplyCap)}
                current={Number(i.totalLiquidity)}
                price={Number(i.priceInUSD)}
              >
                <div>
                  {isMobile && <div className='text-bold-small'>Total Supply</div>}
                  <div className='flex ai-ct gap-10'>
                    <div>
                      <div>
                        <FormattedNumber value={i.totalLiquidity} unit />
                        {/* {nameChecker(i.tokenSymbol)} */}
                      </div>
                      <div className='text-sm-2'>
                        <FormattedNumber value={i.totalLiquidityUSD} unit symbol='$' />
                      </div>
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
                        <FormattedNumber value={i.totalDebt} unit />
                      </div>
                      <div className='text-sm-2'>
                        <FormattedNumber value={i.totalDebtUSD} unit symbol='$' />
                      </div>
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
            return (
              <>
                {isMobile && <div className='text-bold-small'>Total Supply</div>}
                <div>
                  <FormattedNumber value={i.formattedAvailableLiquidity} />
                </div>
                <div className='text-sm-2'>
                  <FormattedNumber value={i.availableLiquidityUSD} symbol='$' />
                </div>
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
                <FormattedNumber value={i.supplyUsageRatio} percent />
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
                <div>
                  <FormattedNumber value={i.formattedBaseLTVasCollateral} unit />
                </div>
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
                    <span className='text-apr color-safe'>
                      <FormattedNumber precision={2} value={pool.supplyAPY} percent />
                    </span>
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
          title='Borrow APY'
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
                  <span className='color-warn'>
                    <FormattedNumber precision={2} value={pool.variableBorrowAPY} percent />
                  </span>
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
