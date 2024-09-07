import { Table } from 'antd'

import CustomSortIcon from '@/components/CustomSortIcon'
import FormattedNumber from '@/components/FormattedNumber'
import LPName from '@/components/LPName'
import { useLendStore } from '@/store'
import { aprToApy100, formatNumberByUnit, remain2Decimal, toPrecision } from '@/utils/math'
const { Column } = Table

export default function PositionTable(props: {
  positions: any[],
  lite?: boolean
}) {
  const { updateCurrentPosition, updateDialogShow } = useLendStore()
  return (
    <div className='position-table'>
      <Table
        sortDirections={['descend', 'ascend']}
        dataSource={props.positions || []}
        pagination={false}
        rowKey={(item, index) => item.id}
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
                <div>
                  <LPName token0={i.reserve.symbol} title={`${i.reserve.symbol}`} />
                </div>
              </>
            )
          }}
        />
        {
          !props.lite &&
          <Column
            title="Value"
            dataIndex=""
            key="value"
            sortIcon={CustomSortIcon}
            sorter={(a: any, b: any) => {
              return a.value - b.value
            }}
            render={(i) => {
              return (
                <>
                  <div className="lending-list-title-wrap">
                    $<FormattedNumber value={i.value} />
                  </div>
                </>
              )
            }}
          />
        }
        <Column
          title="Size"
          dataIndex=""
          key="size"
          render={(i) => {
            return (
              <>
                <div>
                  <FormattedNumber value={i.size} />
                  {props.lite && <p className='text-sm-2'>${formatNumberByUnit(i.value)}</p>}
                </div>
              </>
            )
          }}
        />
        {
          !props.lite &&
            <Column
              title="Price"
              dataIndex=""
              key="price"
              render={(i) => {
                return (
                  <>
                    <p>${remain2Decimal(i.reserve.priceInUSD)}</p>
                  </>
                )
              }}
            />
        }
        {
          !props.lite &&
            <Column
              title="Liquidation Price"
              dataIndex=""
              key="Liquidation"
              render={(i) => {
                // const liquidatePrice = Number(healthStatus.formatted.liquidationThreshold) / 100 *
                return (
                  <>
                    {i.type === 'debt' && <p>N/A</p>}
                    {i.type !== 'debt' && <p>N/A</p>}
                  </>
                )
              }}
            />
        }
        <Column
          title="APY"
          dataIndex=""
          key="apy"
          sortIcon={CustomSortIcon}
          sorter={(a: any, b: any) => {
            if (a.type === 'debt') {
              return a.reserve.variableBorrowAPY - b.reserve.variableBorrowAPY
            } else {
              return a.reserve.supplyAPY - b.reserve.supplyAPY
            }
          }}
          render={(i) => {
            return (
              <>
                {i.type === 'debt' && (
                  <p>{toPrecision(aprToApy100(i.reserve.variableBorrowAPY * 100))}%</p>
                )}
                {i.type !== 'debt' && (
                  <p>{toPrecision(aprToApy100(i.reserve.supplyAPY * 100))}%</p>
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
