import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Table, Tooltip } from 'antd/es'
import { useEffect, useState } from 'react'

import LPName from '@/components/LPName'
import { useWagmiCtx } from '@/components/WagmiContext'
import useDeviceDetect from '@/hooks/useDeviceDetect'
import usePrices from '@/hooks/usePrices'
import { formatSymbol } from '@/sdk/utils/token'
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
import RepayDialog from './RepayDialog'
import useLendingList from './useLendingList'
import WithdrawDialog from './WithdrawDialog'

const { Column } = Table

export default function LendingTable() {
  const { getPrice } = usePrices()
  const { openConnectModal } = useConnectModal()
  const { account } = useWagmiCtx()
  const { isMobile } = useDeviceDetect()

  const {
    formattedLendPools,
    // fetchLendPools,
    // isFetching: isFetchingLendingList,
  } = useLendingList()

  useEffect(() => {
    console.log('formattedLendPools :>> ', formattedLendPools)
  }, [formattedLendPools])

  const [depositDialogOpen, setDepositDialogOpen] = useState(false)
  const [currentLendingPoolDetail, setCurrentLendingPoolDetail] = useState(undefined)

  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false)
  const [repayDialogOpen, setRepayDialogOpen] = useState(false)
  const [borrowDialogOpen, setBorrowDialogOpen] = useState(false)

  // useEffect(() => {
  //   mng.multicallPoolsStatus([1n, 2n, 3n])
  // }, [mng])

  return (
    <>
      <DepositDialog
        open={depositDialogOpen}
        currentLendingPoolDetail={currentLendingPoolDetail}
        onClose={() => setDepositDialogOpen(false)}
      ></DepositDialog>

      <WithdrawDialog
        open={withdrawDialogOpen}
        currentLendingPoolDetail={currentLendingPoolDetail}
        onClose={() => setWithdrawDialogOpen(false)}
      ></WithdrawDialog>

      <BorrowDialog
        open={borrowDialogOpen}
        currentLendingPoolDetail={currentLendingPoolDetail}
        onClose={() => setBorrowDialogOpen(false)}
      ></BorrowDialog>

      <RepayDialog
        open={repayDialogOpen}
        currentLendingPoolDetail={currentLendingPoolDetail}
        onClose={() => setRepayDialogOpen(false)}
      ></RepayDialog>

      <Table
        sortDirections={['descend', 'ascend']}
        dataSource={formattedLendPools}
        pagination={false}
        rowKey={(i) => i.poolKey}
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
          render={(pool) => {
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
          sorter={(a: any, b: any) => {
            return a.value - b.value
          }}
          render={(i) => {
            const amount = i.totalSupply
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
                        <div>Supply Cap: {addComma(toPrecision(i.supplyCap))}</div>
                        <div>Supply Used: {addComma(toPrecision(i.totalSupply))}</div>
                        <div>
                          Remaining: {addComma(toPrecision(i.supplyCap - i.totalSupply))}
                        </div>
                      </div>
                    }
                  >
                    <div>
                      <PercentCircle
                        radix={10}
                        percent={div(
                          i.totalSupply.toString(),
                          i.supplyCap.toString(),
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
          sorter={(a: any, b: any) => {
            return a.value - b.value
          }}
          render={(i) => {
            const amount = i.totalBorrowed
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
                        <div>Borrow Cap: {addComma(toPrecision(i.borrowCap))}</div>
                        <div>Borrow Used: {addComma(toPrecision(i.totalBorrowed))}</div>
                        <div>
                          Remaining:{' '}
                          {addComma(toPrecision(i.borrowCap - i.totalBorrowed))}
                        </div>
                      </div>
                    }
                  >
                    <>
                      <PercentCircle
                        radix={10}
                        percent={div(
                          i.totalBorrowed.toString(),
                          i.borrowCap.toString(),
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
          sorter={(a: any, b: any) => {
            return a.value - b.value
          }}
          render={(i) => {
            const amount = i.availableLiquidity
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
          sorter={(a: any, b: any) => {
            return a.value - b.value
          }}
          render={(i) => {
            return (
              <>
                {isMobile && <div className="text-bold-small">Utilization</div>}
                <div>{toPrecision(i.utilization * 100)}%</div>
              </>
            )
          }}
        />

        <Column
          title="LTV"
          dataIndex=""
          key="ltv"
          showSorterTooltip={false}
          sorter={(a: any, b: any) => {
            return a.value - b.value
          }}
          render={(i) => {
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
            return a.apr - b.apr
          }}
          render={(i) => {
            return (
              <>
                {isMobile && <div className="text-bold-small">APY</div>}
                <div
                  className="farm-buffer-safe flex ai-ct gap-10"
                  style={{ fontWeight: 'bold' }}
                >
                  +{toPrecision(aprToApy100(i.apr * 100))}%
                  <button
                    className="btn-base btn-base-small"
                    onClick={() => {
                      if (!account) {
                        openConnectModal?.()
                        return
                      }
                      console.log('Deposit :>> ', i)
                      setCurrentLendingPoolDetail(i)
                      setDepositDialogOpen(true)
                    }}
                  >
                    Deposit
                  </button>
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
            return a.borrowApr - b.borrowApr
          }}
          render={(i) => {
            return (
              <>
                <div
                  className="farm-buffer-danger flex ai-ct gap-10"
                  style={{ fontWeight: 'bold' }}
                >
                  -{toPrecision(i.borrowApr * 100)}%
                  <button
                    className="btn-base btn-base-small"
                    onClick={() => {
                      setCurrentLendingPoolDetail(i)
                      setBorrowDialogOpen(true)
                    }}
                  >
                    Borrow
                  </button>
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
          render={(i) => {
            return (
              <>
                <div>{toPrecision(i.deposited)}</div>
                <div className="text-sm-2">
                  $
                  {formatNumberByUnit(
                    toPrecisionNum(i.deposited * getPrice(i.tokenSymbol)),
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
          render={(i) => {
            return (
              <>
                <div>{toPrecision(i.borrowed)}</div>
                <div className="text-sm-2">
                  $
                  {formatNumberByUnit(
                    toPrecisionNum(i.borrowed * getPrice(i.tokenSymbol)),
                  )}
                </div>
              </>
            )
          }}
        />
        <Column
          title="Actions"
          dataIndex=""
          key="action"
          render={(i) => {
            return (
              <div className="flex ai-ct lending-table-actions">
                {/* <button
                  className="btn-base btn-base-small"
                  onClick={() => {
                    if (!account) {
                      openConnectModal?.()
                      return
                    }
                    console.log('Deposit :>> ', i)
                    setCurrentLendingPoolDetail(i)
                    setDepositDialogOpen(true)
                  }}
                >
                  Deposit
                </button>
                <button
                  className="btn-base btn-base-small"
                  onClick={() => {
                    setCurrentLendingPoolDetail(i)
                    setBorrowDialogOpen(true)
                  }}
                >
                  Borrow
                </button> */}
                <button
                  className="btn-base btn-base-small"
                  disabled={!i.deposited}
                  onClick={() => {
                    setCurrentLendingPoolDetail(i)
                    setWithdrawDialogOpen(true)
                  }}
                >
                  Withdraw
                </button>

                <button
                  className="btn-base btn-base-small"
                  disabled={!i.borrowed}
                  onClick={() => {
                    setCurrentLendingPoolDetail(i)
                    setRepayDialogOpen(true)
                  }}
                >
                  Repay
                </button>
              </div>
            )
          }}
        />
      </Table>
    </>
  )
}
