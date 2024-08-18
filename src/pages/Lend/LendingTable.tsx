import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Table, Tooltip } from 'antd/es'
import { icons } from 'antd/es/image/PreviewGroup'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
import {
  addComma,
  aprToApy100,
  formatFloatNumber,
  formatNumberByUnit,
  toPrecision,
  toPrecisionNum,
} from '@/utils/math'
import { div } from '@/utils/math/bigNumber'

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
  const { currentPosition, currentDialogShow, updateDialogShow, updateCurrentPosition } =
    useLendStore()

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
          formattedLendPools.map((i) => i.underlyingTokenAddress),
        )
        .then((r) => {
          const balanceMap = {}
          formattedLendPools.forEach((i, index) => {
            balanceMap[i.underlyingTokenAddress] = toDecimals(r[index], i.decimals)
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
        className="lend-list-table"
        sortDirections={['descend', 'ascend']}
        dataSource={formattedLendPools}
        pagination={false}
        rowKey={(i: IFormattedLendPool) => i.poolKey}
        onRow={(record: IFormattedLendPool) => {
          return {
            onClick: () => {
              navigate(
                `/lend/${record.marketId.toString()}/${record.reserveId.toString()}`,
              )
            },
          }
        }}
        locale={{
          emptyText: (
            <div className="ant-empty ant-empty-normal">
              <div
                className="ant-empty-description"
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
          title="Pool"
          dataIndex=""
          key="poolKey"
          render={(pool: IFormattedLendPool) => {
            return (
              <>
                <div className="lending-list-title-wrap">
                  <LPName
                    token0={nameChecker(formatSymbol(pool.tokenSymbol))}
                    title={nameChecker(pool.tokenSymbol)}
                  >
                    <div className="lending-list-title-wrap-balance text-sm-2">
                      Wallet:{' '}
                      {formatFloatNumber(balanceMap[pool.underlyingTokenAddress] || 0)}
                    </div>
                  </LPName>
                </div>
              </>
            )
          }}
        />
        <Column
          title="Total Supply"
          dataIndex=""
          key="totalSupply"
          showSorterTooltip={false}
          sortIcon={CustomSortIcon}
          sorter={(a: IFormattedLendPool, b: IFormattedLendPool) => {
            return (
              a.formatted.totalSupply * getPrice(a.tokenSymbol) -
              b.formatted.totalSupply * getPrice(b.tokenSymbol)
            )
          }}
          render={(i: IFormattedLendPool) => {
            const amount = i.formatted.totalSupply
            const value = formatFloatNumber(amount * getPrice(i.tokenSymbol))
            return (
              <CapHover
                type="supply"
                max={i.formatted.supplyCap}
                current={i.formatted.totalSupply}
                price={getPrice(i.tokenSymbol)}
              >
                <div>
                  {isMobile && <div className="text-bold-small">Total Supply</div>}
                  <div className="flex ai-ct gap-10">
                    <div>
                      <div>
                        {amount < 1 ? formatNumberByUnit(amount) : addComma(amount)}{' '}
                        {/* {nameChecker(i.tokenSymbol)} */}
                      </div>
                      <div className="text-sm-2">${formatNumberByUnit(value)}</div>
                    </div>
                    <div>
                      <PercentCircle
                        radix={8}
                        percent={div(
                          i.formatted.totalSupply.toString(),
                          i.formatted.supplyCap.toString(),
                        ).toNumber()}
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
          title="Total Borrow"
          dataIndex=""
          key="totalBorrowed"
          sortIcon={CustomSortIcon}
          showSorterTooltip={false}
          sorter={(a: IFormattedLendPool, b: IFormattedLendPool) => {
            return (
              a.formatted.totalBorrowed * getPrice(a.tokenSymbol) -
              b.formatted.totalBorrowed * getPrice(b.tokenSymbol)
            )
          }}
          render={(i: IFormattedLendPool) => {
            const amount = i.formatted.totalBorrowed
            const value = formatFloatNumber(amount * getPrice(i.tokenSymbol))
            return (
              <CapHover
                type="borrow"
                max={i.formatted.borrowCap}
                current={i.formatted.totalBorrowed}
                price={getPrice(i.tokenSymbol)}
              >
                <div>
                  {isMobile && <div className="text-bold-small">Total Supply</div>}
                  <div className="flex ai-ct gap-10">
                    <div>
                      <div>
                        {amount < 1 ? formatNumberByUnit(amount) : addComma(amount)}{' '}
                        {/* {nameChecker(i.tokenSymbol)} */}
                      </div>
                      <div className="text-sm-2">${formatNumberByUnit(value)}</div>
                    </div>
                    <PercentCircle
                      radix={8}
                      percent={div(
                        i.formatted.totalBorrowed.toString(),
                        i.formatted.borrowCap.toString(),
                      ).toNumber()}
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
          title="Liquidity"
          dataIndex=""
          key="availableLiquidity"
          showSorterTooltip={false}
          sortIcon={CustomSortIcon}
          sorter={(a: IFormattedLendPool, b: IFormattedLendPool) => {
            return (
              a.formatted.availableLiquidity * getPrice(a.tokenSymbol) -
              b.formatted.availableLiquidity * getPrice(b.tokenSymbol)
            )
          }}
          render={(i: IFormattedLendPool) => {
            const amount = i.formatted.availableLiquidity
            const value = formatFloatNumber(amount * getPrice(i.tokenSymbol))
            return (
              <>
                {isMobile && <div className="text-bold-small">Total Supply</div>}
                <div>
                  {amount < 1 ? formatNumberByUnit(amount) : addComma(amount)}{' '}
                  {/* {nameChecker(i.tokenSymbol)} */}
                </div>
                <div className="text-sm-2">${formatNumberByUnit(value)}</div>
              </>
            )
          }}
        />

        <Column
          title="Utilization"
          dataIndex=""
          key="utilization"
          showSorterTooltip={false}
          sortIcon={CustomSortIcon}
          sorter={(a: IFormattedLendPool, b: IFormattedLendPool) => {
            return a.formatted.utilization - b.formatted.utilization
          }}
          render={(i: IFormattedLendPool) => {
            return (
              <>
                {isMobile && <div className="text-bold-small">Utilization</div>}
                <div>{toPrecision(i.formatted.utilization * 100)}%</div>
              </>
            )
          }}
        />

        <Column
          title="LTV"
          dataIndex=""
          key="ltv"
          showSorterTooltip={false}
          sortIcon={CustomSortIcon}
          sorter={(a: IFormattedLendPool, b: IFormattedLendPool) => {
            return a.config.LTV - b.config.LTV
          }}
          render={(i: IFormattedLendPool) => {
            return (
              <>
                {isMobile && <div className="text-bold-small">LTV</div>}
                <div>{toPrecision(i.config.LTV / 10000, 2)}</div>
              </>
            )
          }}
        />

        <Column
          title="Supply APY"
          dataIndex=""
          key="apr"
          width={150}
          showSorterTooltip={false}
          sortIcon={CustomSortIcon}
          sorter={(a: IFormattedLendPool, b: IFormattedLendPool) => {
            return a.formatted.apr - b.formatted.apr
          }}
          // onCell={() => {
          //   return {
          //     onClick: (event) => {
          //       event.stopPropagation()
          //     },
          //   }
          // }}
          render={(pool: IFormattedLendPool) => {
            const apy = aprToApy100(pool.formatted.apr * 100)
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
                  {isMobile && <div className="text-bold-small">APY</div>}
                  <div className="flex ai-ct jc-sb gap-10">
                    <span className="text-apr color-safe">+{toPrecision(apy)}%</span>
                    <Link
                      to={`/lend/supply/${pool.marketId.toString()}/${pool.reserveId.toString()}`}
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
                      <button className="btn-base btn-base-small">Supply</button>
                    </Link>
                  </div>
                </>
              </RewardsHover>
            )
          }}
        />

        <Column
          title="Borrow APR"
          dataIndex=""
          width={150}
          key="borrowingRate"
          showSorterTooltip={false}
          sortIcon={CustomSortIcon}
          sorter={(a: IFormattedLendPool, b: IFormattedLendPool) => {
            return a.formatted.borrowApr - b.formatted.borrowApr
          }}
          render={(pool: IFormattedLendPool) => {
            return (
              <>
                <div className="flex ai-ct jc-sb gap-10">
                  <span className="color-danger">
                    -{toPrecision(pool.formatted.borrowApr * 100)}%
                  </span>
                  <Link
                    to={`/lend/borrow/${pool.marketId.toString()}/${pool.reserveId.toString()}`}
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
                    <button className="btn-base btn-base-small">Borrow</button>
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
