import './miniPosition.scss'

import { Table } from 'antd'
import Column from 'antd/es/table/Column'

import FormattedNumber from '@/components/FormattedNumber'
import LPName from '@/components/LPName'
import { IFormattedPosition } from '@/store/lend'

const positionTypeTagMap = {
  asset: 'LENT',
  debt: 'DEBT',
}
export default function MiniPosition(props: { positions: IFormattedPosition[] }) {

  return (
    <div className='mini-positions'>
      <Table
        sortDirections={['descend', 'ascend']}
        dataSource={props.positions || []}
        pagination={false}
        rowKey={(item) => `${item.reserve.id}-${item.type}`}
        locale={{
          emptyText: '',
        }}
        rowClassName={(item) => {
          return `mini-positions-item-${item.type}`
        }}
      >
        <Column
          title='Asset'
          dataIndex=''
          key='poolKey'
          render={(i: IFormattedPosition) => {
            return (
              <>
                <div className='lending-list-title-wrap flex gap-4'>
                  <i className='mini-positions-item-sign'></i>
                  <LPName token0={i.reserve.symbol} title={`${i.reserve.symbol}`} />
                  <span className='asset-type-tag'>{positionTypeTagMap[i.type] || ''}</span>
                </div>
              </>
            )
          }}
        />
        <Column
          title='Value'
          dataIndex=''
          key='value'
          render={(i: IFormattedPosition) => {
            return (
              <>
                <div className='lending-list-title-wrap'>
                  <FormattedNumber
                    value={i.type === 'debt' ? i.totalBorrowsUSD : i.underlyingBalanceUSD}
                    symbol='$'
                  />
                </div>
              </>
            )
          }}
        />
        <Column
          title='Size'
          dataIndex=''
          key='size'
          render={(i: IFormattedPosition) => {
            return (
              <>
                <div className='lending-list-title-wrap'>
                  <FormattedNumber
                    value={i.type === 'debt' ? i.totalBorrows : i.underlyingBalance}
                    symbol='$'
                  />
                </div>
              </>
            )
          }}
        />
        <Column
          title='APY'
          dataIndex=''
          key='apy'
          render={(i: IFormattedPosition) => {
            return (
              <p>
                <FormattedNumber
                  value={i.type === 'debt' ? i.reserve.variableBorrowAPY : i.reserve.supplyAPY}
                  percent
                />
              </p>
            )
          }}
        />
      </Table>
    </div>
  )
}
