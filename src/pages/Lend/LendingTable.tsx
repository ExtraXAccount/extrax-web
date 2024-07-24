import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Table, Tooltip } from 'antd/es'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSwitchChain } from 'wagmi'

import LPName from '@/components/LPName'
import { useWagmiCtx } from '@/components/WagmiContext'
import { SupportedChainId } from '@/constants/chains'
import useDeviceDetect from '@/hooks/useDeviceDetect'
import usePrices from '@/hooks/usePrices'
import { formatSymbol } from '@/sdk/utils/token'
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
import PercentCircle from './PercentCircle'
// import RepayDialog from './RepayDialog'
import useLendingList from './useLendingList'
// import WithdrawDialog from './WithdrawDialog'

const { Column } = Table

export default function LendingTable() {
  const { getPrice } = usePrices()
  const { account, chainId } = useWagmiCtx()
  const { openConnectModal } = useConnectModal()
  const { switchChain } = useSwitchChain()
  const { isMobile } = useDeviceDetect()
  const { currentPosition, currentDialogShow, updateDialogShow, updateCurrentPosition } =
    useLendStore()

  const {
    formattedLendPools,
    // fetchLendPools,
    // isFetching: isFetchingLendingList,
  } = useLendingList()

  const [activeChain, setActiveChain] = useState(chainId)

  useEffect(() => {
    console.log('formattedLendPools :>> ', formattedLendPools)
  }, [formattedLendPools])

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
        sortDirections={['descend', 'ascend']}
        dataSource={formattedLendPools}
        pagination={false}
        rowKey={(i: IFormattedLendPool) => i.poolKey}
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
                  />
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
          // sorter={(a: any, b: any) => {
          //   return a.value - b.value
          // }}
          render={(i: IFormattedLendPool) => {
            const amount = i.formatted.totalSupply
            const value = formatFloatNumber(amount * getPrice(i.tokenSymbol))
            return (
              <>
                {isMobile && <div className="text-bold-small">Total Supply</div>}
                <div className="flex ai-ct gap-10">
                  <div>
                    <div>
                      {amount < 1 ? formatNumberByUnit(amount) : addComma(amount)}{' '}
                      {/* {nameChecker(i.tokenSymbol)} */}
                    </div>
                    <div className="text-sm-2">${formatNumberByUnit(value)}</div>
                  </div>
                  <Tooltip
                    title={
                      <div className="flex flex-column">
                        <div>
                          Supply Cap: {addComma(toPrecision(i.formatted.supplyCap))}
                        </div>
                        <div>
                          Supply Used: {addComma(toPrecision(i.formatted.totalSupply))}
                        </div>
                        <div>
                          Remaining:{' '}
                          {addComma(
                            toPrecision(i.formatted.supplyCap - i.formatted.totalSupply),
                          )}
                        </div>
                      </div>
                    }
                  >
                    <div>
                      <PercentCircle
                        radix={10}
                        percent={div(
                          i.formatted.totalSupply.toString(),
                          i.formatted.supplyCap.toString(),
                        ).toNumber()}
                        strokeWidth={3}
                        strokeColor={'#38AD3D'}
                      />
                    </div>
                  </Tooltip>
                </div>
              </>
            )
          }}
        />
        <Column
          title="Total Borrowed"
          dataIndex=""
          key="totalBorrowed"
          showSorterTooltip={false}
          // sorter={(a: any, b: any) => {
          //   return a.value - b.value
          // }}
          render={(i: IFormattedLendPool) => {
            const amount = i.formatted.totalBorrowed
            const value = formatFloatNumber(amount * getPrice(i.tokenSymbol))
            return (
              <>
                {isMobile && <div className="text-bold-small">Total Supply</div>}
                <div className="flex ai-ct gap-10">
                  <div>
                    <div>
                      {amount < 1 ? formatNumberByUnit(amount) : addComma(amount)}{' '}
                      {/* {nameChecker(i.tokenSymbol)} */}
                    </div>
                    <div className="text-sm-2">${formatNumberByUnit(value)}</div>
                  </div>
                  <Tooltip
                    title={
                      <div className="flex flex-column">
                        <div>
                          Borrow Cap: {addComma(toPrecision(i.formatted.borrowCap))}
                        </div>
                        <div>
                          Borrow Used: {addComma(toPrecision(i.formatted.totalBorrowed))}
                        </div>
                        <div>
                          Remaining:{' '}
                          {addComma(
                            toPrecision(
                              i.formatted.borrowCap - i.formatted.totalBorrowed,
                            ),
                          )}
                        </div>
                      </div>
                    }
                  >
                    <>
                      <PercentCircle
                        radix={10}
                        percent={div(
                          i.formatted.totalBorrowed.toString(),
                          i.formatted.borrowCap.toString(),
                        ).toNumber()}
                        strokeWidth={3}
                        strokeColor={'#EC6F14'}
                      />
                    </>
                  </Tooltip>
                </div>
              </>
            )
          }}
        />

        <Column
          title="Available Liquidity"
          dataIndex=""
          key="availableLiquidity"
          showSorterTooltip={false}
          // sorter={(a: any, b: any) => {
          //   return a.value - b.value
          // }}
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
          // sorter={(a: any, b: any) => {
          //   return a.formatted.utilization - b.formatted.utilization
          // }}
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
          // sorter={(a: any, b: any) => {
          //   return a.value - b.value
          // }}
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
          width={160}
          showSorterTooltip={false}
          sorter={(a: any, b: any) => {
            return a.formatted.apr - b.formatted.apr
          }}
          render={(pool: IFormattedLendPool) => {
            return (
              <>
                {isMobile && <div className="text-bold-small">APY</div>}
                <div
                  className="farm-buffer-safe flex ai-ct gap-10"
                  style={{ fontWeight: 'bold' }}
                >
                  +{toPrecision(aprToApy100(pool.formatted.apr * 100))}%
                  <Link
                    to={`/lend/${pool.marketId.toString()}/${pool.reserveId.toString()}`}
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
                    }}
                  >
                    <button className="btn-base btn-base-small">Deposit</button>
                  </Link>
                  {/* <button
                    className="btn-base btn-base-small"
                    onClick={() => {
                      if (!account) {
                        openConnectModal?.()
                        return
                      }
                      console.log('Deposit :>> ', pool)
                      updateCurrentPosition(pool)
                      updateDialogShow('deposit')
                    }}
                  >
                    Deposit
                  </button> */}
                </div>
              </>
            )
          }}
        />

        <Column
          title="Borrow APR"
          dataIndex=""
          width={160}
          key="borrowingRate"
          showSorterTooltip={false}
          sorter={(a: any, b: any) => {
            return a.formatted.borrowApr - b.formatted.borrowApr
          }}
          render={(pool: IFormattedLendPool) => {
            return (
              <>
                <div
                  className="farm-buffer-danger flex ai-ct gap-10"
                  style={{ fontWeight: 'bold' }}
                >
                  -{toPrecision(pool.formatted.borrowApr * 100)}%
                  <Link
                    to={`/lend/${pool.marketId.toString()}/${pool.reserveId.toString()}/borrow`}
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
                    }}
                  >
                    <button className="btn-base btn-base-small">Borrow</button>
                  </Link>
                  {/* <button
                    className="btn-base btn-base-small"
                    // onClick={() => {
                    //   updateCurrentPosition(i)
                    //   updateDialogShow('borrow')
                    // }}
                  >
                    Borrow
                  </button> */}
                </div>
              </>
            )
          }}
        />

        <Column
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
        />
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
