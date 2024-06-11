import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Table } from 'antd'
import { useEffect, useState } from 'react'

import LPName from '@/components/LPName'
import { useWagmiCtx } from '@/components/WagmiContext'
import useDeviceDetect from '@/hooks/useDeviceDetect'
import usePrices from '@/hooks/usePrices'
import { formatSymbol } from '@/sdk/utils/token'
import { nameChecker } from '@/utils'
import { addComma, aprToApy100, formatFloatNumber, formatNumberByUnit, toPrecision, toPrecisionNum } from '@/utils/math'

import BorrowDialog from './BorrowDialog'
import DepositDialog from './DepositDialog'
import RepayDialog from './RepayDialog'
import useLendingList from './useLendingList'
import WithdrawDialog from './WithdrawDialog'

const { Column } = Table

export default function LendingTable() {
  const { getPrice } = usePrices()
  const { openConnectModal } = useConnectModal()
  const { account } = useWagmiCtx()
  const { isMobile } = useDeviceDetect()

  const { formattedLendPools, fetchLendPools, isFetching: isFetchingLendingList } = useLendingList()

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
                  <LPName token0={nameChecker(formatSymbol(pool.tokenSymbol))} title={nameChecker(pool.tokenSymbol)} />
                </div>
              </>
            )
          }}
        />
        <Column
          title="Total Supply"
          dataIndex=""
          key="total"
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
                <div>
                  {amount < 1 ? formatNumberByUnit(amount) : addComma(amount)} {nameChecker(i.tokenSymbol)}
                </div>
                <div className="text-sm-2">${formatNumberByUnit(value)}</div>
              </>
            )
          }}
        />
        <Column
          title="Supply APY"
          dataIndex=""
          key="apr"
          showSorterTooltip={false}
          sorter={(a: any, b: any) => {
            return a.apr - b.apr
          }}
          render={(i) => {
            return (
              <>
                {isMobile && <div className="text-bold-small">APY</div>}
                <div className="farm-buffer-safe flex ai-ct" style={{ fontWeight: 'bold' }}>
                  +{toPrecision(aprToApy100(i.apr * 100))}%
                </div>
              </>
            )
          }}
        />

        {/* <Column
          title="Total Borrowed"
          dataIndex=""
          key="borrowed"
          render={(i) => {
            const amount = i.amount
            const fixed = formatFloatNumber(amount * i.utilizationRate)
            const value = formatFloatNumber(fixed * getPrice(i.tokenSymbol))
            return (
              <>
                {isMobile && <div className="text-bold-small">Total Borrowed</div>}
                <div>
                  {fixed > 1000 ? addComma(fixed) : fixed} {nameChecker(i.tokenSymbol)}
                </div>
                <div className="text-sm-2">${formatNumberByUnit(value)}</div>
              </>
            )
          }}
        /> */}
        <Column
          title="Borrow APR"
          dataIndex=""
          key="borrowingRate"
          showSorterTooltip={false}
          sorter={(a: any, b: any) => {
            return a.borrowApr - b.borrowApr
          }}
          render={(i) => {
            return (
              <>
                <div className="farm-buffer-danger flex ai-ct" style={{ fontWeight: 'bold' }}>
                  -{toPrecision(i.borrowApr * 100)}%
                </div>
              </>
            )
          }}
        />

        {/* <Column
          title="Utilization"
          dataIndex=""
          key="position"
          render={(i) => {
            return (
              <>
                <div>{toPrecision(i.utilizationRate * 100)}%</div>
              </>
            )
          }}
        /> */}
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
                  ${formatNumberByUnit(toPrecisionNum(i.deposited * getPrice(i.tokenSymbol)))}
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
                  ${formatNumberByUnit(toPrecisionNum(i.borrowed * getPrice(i.tokenSymbol)))}
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
                <button
                  className="btn-base btn-base-small"
                  onClick={() => {
                    if (!account) {
                      openConnectModal()
                      return
                    }
                    console.log('Deposit :>> ', i)
                    setCurrentLendingPoolDetail(i)
                    setDepositDialogOpen(true)
                  }}
                >
                  Deposit
                </button>
                {!!i.deposited && (
                  <>
                    <button
                      className="btn-base btn-base-small"
                      onClick={() => {
                        setCurrentLendingPoolDetail(i)
                        setWithdrawDialogOpen(true)
                      }}
                    >
                      Withdraw
                    </button>

                    <button
                      className="btn-base btn-base-small"
                      onClick={() => {
                        setCurrentLendingPoolDetail(i)
                        setBorrowDialogOpen(true)
                      }}
                    >
                      Borrow
                    </button>
                  </>
                )}
                {!!i.borrowed && (
                  <button
                    className="btn-base btn-base-small"
                    onClick={() => {
                      setCurrentLendingPoolDetail(i)
                      setRepayDialogOpen(true)
                    }}
                  >
                    Repay
                  </button>
                )}
              </div>
            )
          }}
        />
      </Table>
    </>
  )
}
