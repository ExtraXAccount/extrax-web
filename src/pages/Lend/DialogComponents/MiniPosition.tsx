import './miniPosition.scss'

import { Table } from 'antd'
import Column from 'antd/es/table/Column'

import LPName from '@/components/LPName'
import usePrices from '@/hooks/usePrices'
import { toDecimals } from '@/sdk/utils/token'
import { aprToApy100, remain2Decimal, toPrecision } from '@/utils/math'

const positionTypeTagMap = {
  asset: 'LENT',
  debt: 'BORROWED',
}
export default function MiniPosition(props: { positions: any[] }) {
  const { getPrice } = usePrices()

  return (
    <div className="mini-positions">
      <Table
        sortDirections={['descend', 'ascend']}
        dataSource={props.positions || []}
        pagination={false}
        rowKey={(item) => `${item.marketId}-${item.reserveId}-${item.type}`}
        locale={{
          emptyText: '',
        }}
        rowClassName={(item) => {
          return `mini-positions-item-${item.type}`
        }}
      >
        <Column
          title="Asset"
          dataIndex=""
          key="poolKey"
          render={(i) => {
            return (
              <>
                <div className="lending-list-title-wrap flex gap-4">
                  <i className="mini-positions-item-sign"></i>
                  <LPName token0={i.pool.tokenSymbol} title={`${i.pool.tokenSymbol}`} />
                  <span className="asset-type-tag">
                    {positionTypeTagMap[i.type] || ''}
                  </span>
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
            const amount =
              i.type === 'debt' ? i.formatted.borrowed : i.formatted.deposited
            return (
              <>
                <div className="lending-list-title-wrap">
                  ${toPrecision(i.price * amount)}
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
            return (
              <>
                <div className="lending-list-title-wrap">
                  {remain2Decimal(
                    i.type === 'debt' ? i.formatted.borrowed : i.formatted.deposited,
                  )}
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
                  <p>{toPrecision(aprToApy100(i.formatted.borrowApr * 100))}%</p>
                )}
                {i.type !== 'debt' && (
                  <p>{toPrecision(aprToApy100(i.formatted.apr * 100))}%</p>
                )}
              </>
            )
          }}
        />
      </Table>
    </div>
  )
}
