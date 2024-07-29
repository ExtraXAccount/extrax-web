import { Table } from 'antd'

import LPName from '@/components/LPName'
import { toDecimals } from '@/sdk/utils/token'
import { useLendStore } from '@/store'
import { aprToApy100, remain2Decimal, toPrecision } from '@/utils/math'
import useSmartAccount from '@/hooks/useSmartAccount'
const { Column } = Table

export default function PositionTable(props: { positions: any[] }) {
  const { updateCurrentPosition, updateDialogShow } = useLendStore()
  const {
    healthStatus,
  } = useSmartAccount()

  console.log(healthStatus)
  return (
    <div>
      <Table
        sortDirections={['descend', 'ascend']}
        dataSource={props.positions || []}
        pagination={false}
        rowKey={(item, index) => `${item.marketId}-${item.reserveId}`}
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
            return (
              <>
                <div className="lending-list-title-wrap">
                  <LPName token0={i.pool.tokenSymbol} title={`${i.pool.tokenSymbol}`} />
                </div>
              </>
            )
          }}
        />
        <Column
          title="Value"
          dataIndex=""
          key="value"
          render={(i) => {
            return (
              <>
                <div className="lending-list-title-wrap">${toPrecision(i.value)}</div>
              </>
            )
          }}
        />
        <Column
          title="Size"
          dataIndex=""
          key="size"
          render={(i) => {
            const debtSize = toDecimals(i.debt, i.pool.decimals)
            const liquiditySize = toDecimals(i.debt, i.pool.decimals)
            return (
              <>
                <div className="lending-list-title-wrap">
                  {remain2Decimal(i.type === 'debt' ? debtSize : liquiditySize)}
                </div>
              </>
            )
          }}
        />
        <Column
          title="Price"
          dataIndex=""
          key="price"
          render={(i) => {
            return (
              <>
                <p>${remain2Decimal(i.price)}</p>
              </>
            )
          }}
        />
        <Column
          title="Liquidation Price"
          dataIndex=""
          key="Liquidation"
          render={(i) => {
            // const liquidatePrice = Number(healthStatus.formatted.liquidationThreshold) / 100 * 
            return (
              <>
                {i.type === 'debt' && (
                  <p>N/A</p>
                )}
                {i.type !== 'debt' && (
                  <p>N/A</p>
                )}
              </>
            )
          }}
        />
        <Column
          title="APY"
          dataIndex=""
          key="apy"
          render={(i) => {
            return (
              <>
                {i.type === 'debt' && (
                  <p>{toPrecision(aprToApy100(i.pool.formatted.borrowApr * 100))}%</p>
                )}
                {i.type !== 'debt' && (
                  <p>{toPrecision(aprToApy100(i.pool.formatted.apr * 100))}%</p>
                )}
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
                {i.type !== 'debt' && (
                  <button
                    className="btn-base btn-base-small"
                    onClick={() => {
                      console.log(i)
                      updateCurrentPosition(i)
                      updateDialogShow('withdraw')
                    }}
                  >
                    Withdraw
                  </button>
                )}
                {i.type === 'debt' && (
                  <button
                    className="btn-base btn-base-small"
                    onClick={() => {
                      updateCurrentPosition(i)
                      updateDialogShow('repay')
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
    </div>
  )
}
