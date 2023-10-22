import { Table } from 'antd'

import { TokenAmount } from '@/components/Amount'
import LPName from '@/components/LPName'
import { formatSymbol } from '@/sdk/utils/token'
import { useAppSelector } from '@/state'
import { nameChecker } from '@/utils'
import { remain2Decimal, toPrecision } from '@/utils/math'
const { Column } = Table

export default function UniPositionTable() {
  const positions = useAppSelector((state) => state.position.userPositions)
  return (
    <div>
      <Table
        sortDirections={['descend', 'ascend']}
        dataSource={positions || []}
        pagination={false}
        rowKey={(item, index) => `${item.poolKey}-${index + 1}`}
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
                  <LPName token0={i.token0} token1={i.token1} title={`${i.token0}-${i.token1}`} />
                </div>
                <div>Uniswap V3</div>
              </>
            )
          }}
        />
        <Column
          title="Position"
          dataIndex=""
          key="position"
          render={(i) => {
            return (
              <>
                <div className="lending-list-title-wrap">${toPrecision(i.totalPositionValue)}</div>
                <div className="position-amount-wrap">
                  <TokenAmount symbol={i.token0} amount={i.token0Amount} />
                  <TokenAmount symbol={i.token1} amount={i.token1Amount} />
                </div>
              </>
            )
          }}
        />
        <Column
          title="Debt"
          dataIndex=""
          key="debt"
          render={(i) => {
            return (
              <>
                <div className="lending-list-title-wrap">${remain2Decimal(i.totalPositionValue)}</div>
                <div className="position-amount-wrap">
                  <TokenAmount symbol={i.token0} amount={i.token0Debt} />
                  <TokenAmount symbol={i.token1} amount={i.token1Debt} />
                </div>
              </>
            )
          }}
        />
        <Column
          title="Earning"
          dataIndex=""
          key="earning"
          render={(i) => {
            return (
              <>
                <p>Farmed: $0</p>
                <p>
                  Daily: {toPrecision((i.apr * 100) / 365)}% (${toPrecision((i.apr / 365) * i.totalPositionValue)})
                </p>
                <p>APR: {toPrecision(i.apr * 100)}%</p>
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
                <button className="btn-base btn-base-small">Add</button>
                <button className="btn-base btn-base-small">Close</button>
              </div>
            )
          }}
        />
      </Table>
    </div>
  )
}
