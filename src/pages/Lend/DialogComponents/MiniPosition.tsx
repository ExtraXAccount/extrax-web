import { Table } from 'antd'
import './miniPosition.scss'
import Column from 'antd/es/table/Column'
import { aprToApy100, remain2Decimal, toPrecision } from '@/utils/math'
import { toDecimals } from '@/sdk/utils/token'
import LPName from '@/components/LPName'

export default function MiniPosition(props: {
  positions: any[]
}) {
  return (
    <div className='mini-positions'>
      <Table
        sortDirections={['descend', 'ascend']}
        dataSource={props.positions || []}
        pagination={false}
        rowKey={(item, index) => `${item.marketId}-${item.reserveId}`}
        locale={{
          emptyText: '',
        }}
        rowClassName={(item) => {
          return `mini-positions-item-${item.type}`
        }}
      >
        <Column
          title="Pool"
          dataIndex=""
          key="poolKey"
          render={(i) => {
            return (
              <>
                <div className="lending-list-title-wrap flex gap-4">
                  <i className='mini-positions-item-sign'></i>
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
          title="APY"
          dataIndex=""
          key="apy"
          render={(i) => {
            return (
              <>
                {i.type === 'debt' && (
                  <p>{toPrecision(aprToApy100(i.pool.borrowApr * 100))}%</p>
                )}
                {i.type !== 'debt' && (
                  <p>{toPrecision(aprToApy100(i.pool.apr * 100))}%</p>
                )}
              </>
            )
          }}
        />
      </Table>
    </div>
  )
}