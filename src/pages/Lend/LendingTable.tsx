import { BigNumber as BN } from '@ethersproject/bignumber'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Table, Tooltip } from 'antd'
import { useState } from 'react'
import { useSwitchNetwork } from 'wagmi'

import LPName from '@/components/LPName'
import { useWagmiCtx } from '@/components/WagmiContext'
import useDeviceDetect from '@/hooks/useDeviceDetect'
import usePrices from '@/hooks/usePrices'
import { SupportedChainId } from '@/sdk/constants/chains'
import { formatSymbol, toDecimals } from '@/sdk/utils/token'
import { useAppDispatch } from '@/state'
// import { setCurrentHistoryPool, setCurrentPool } from '@/state/lending/reducer'
// import { usePriceHub } from '@/state/price/hooks'
import { nameChecker } from '@/utils'
import { addComma, aprToApy100, formatFloatNumber, formatNumberByUnit, toPrecision } from '@/utils/math'

// import { LendingPoolWithRewardsItem } from './hooks'
// import InterestCurve from './InterestCurve'
// import InterestTag from './InterestTag'
// import LendingRewardBlock from './LendingRewardBlock'

const { Column } = Table

export default function LendingTable(props: { list: any[] }) {
  const { prices, getPrice } = usePrices()
  const { openConnectModal } = useConnectModal()
  const { account, chainId } = useWagmiCtx()
  const { switchNetwork } = useSwitchNetwork()
  const { isMobile } = useDeviceDetect()
  const dispatch = useAppDispatch()

  return (
    <Table
      sortDirections={['descend', 'ascend']}
      dataSource={props.list || []}
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
        render={(i) => {
          const specialPoolSymbol = i.poolKey.includes('V1') || i.poolKey.includes('OLD') ? i.poolKey : i.tokenSymbol
          return (
            <>
              <div className="lending-list-title-wrap">
                <LPName token0={nameChecker(formatSymbol(i.tokenSymbol))} title={nameChecker(specialPoolSymbol)} />
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
          const { amount, value } = i
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
                +{formatFloatNumber(aprToApy100(i.apr * 100))}%
              </div>
            </>
          )
        }}
      />

      <Column
        title="Total Borrowed"
        dataIndex=""
        key="borrowed"
        render={(i) => {
          const amount = toDecimals(BN.from(i.totalLiquidity), i.tokenDecimals)
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
      />
      <Column
        title="Borrow APR"
        dataIndex=""
        key="borrowingRate"
        showSorterTooltip={false}
        sorter={(a: any, b: any) => {
          return a.borrowingRate - b.borrowingRate
        }}
        render={(i) => {
          return (
            <>
              <div className="farm-buffer-danger flex ai-ct" style={{ fontWeight: 'bold' }}>
                -{formatFloatNumber(i.borrowingRate * 100)}%
              </div>
            </>
          )
        }}
      />

      <Column
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
                className="btn-base"
                onClick={() => {
                  if (!account) {
                    openConnectModal()
                    return
                  }
                  // dispatch(setCurrentPool(i.poolKey))
                }}
              >
                Deposit
              </button>
              {!!i.deposited && (
                <>
                  <button
                    className="btn-base"
                    onClick={() => {
                      // dispatch(setCurrentPool(i.poolKey))
                    }}
                  >
                    Withdraw
                  </button>

                  <button
                    className="btn-base"
                    onClick={() => {
                      // dispatch(setCurrentPool(i.poolKey))
                    }}
                  >
                    Borrow
                  </button>
                </>
              )}
              {!!i.borrowed && (
                <button
                  className="btn-base"
                  onClick={() => {
                    // dispatch(setCurrentPool(i.poolKey))
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
  )
}
