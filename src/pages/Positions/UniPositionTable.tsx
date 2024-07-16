import { Table } from 'antd'
import LPName from '@/components/LPName'
import { aprToApy100, remain2Decimal, toPrecision } from '@/utils/math'
import { toDecimals } from '@/sdk/utils/token'
const { Column } = Table

export default function UniPositionTable(props: {
  positions: any[]
}) {
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
                  <LPName
                    token0={i.pool.tokenSymbol}
                    title={`${i.pool.tokenSymbol}`}
                  />
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
                <div className="lending-list-title-wrap">
                  ${toPrecision(i.value)}
                </div>
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
            return (
              <>
                <p>{i.type === 'debt' ? '' : 'N/A'}</p>
              </>
            )
          }}
        />
        <Column
          title="APR"
          dataIndex=""
          key="apr"
          render={(i) => {
            return (
              <>
                {i.type === 'debt' && <p>{toPrecision(aprToApy100(i.pool.borrowApr * 100))}%</p>}
                {i.type !== 'debt' && <p>{toPrecision(aprToApy100(i.pool.apr * 100))}%</p>}
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
                {i.type !== 'debt' && <button className="btn-base btn-base-small">Withdraw</button>}
                {i.type === 'debt' && <button className="btn-base btn-base-small">Repay</button>}
              </div>
            )
          }}
        />
      </Table>
    </div>
  )
}
