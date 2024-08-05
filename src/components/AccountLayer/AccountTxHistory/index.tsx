import LPName from '@/components/LPName'
import './index.scss'
import dayjs from 'dayjs'

export default function AccountTxHistory(
  props: {
    list: {
      asset: string
      action: string
      time: number
      txId: string
    }[]
  }
) {
  const { list } = props;

  return (
    <div className='account-txhistory'>
      <div className='account-txhistory-title'>Recent Transaction</div>
      <div className='account-txhistory-table'>
        <section className='account-txhistory-th'>
          <div>Asset</div>
          <div>Action</div>
          <div>Time</div>
          <div>Explorer</div>
        </section>
        {
          list.map(item => {
            return(
              <div className='account-txhistory-tr' key={item.txId}>
                <div>
                  <LPName token0={item.asset} title={item.asset}/>
                </div>
                <div>{item.action}</div>
                <div>{dayjs(item.time * 1000).format('YYYY/MM/DD HH:mm')}</div>
                <div>
                  <a href={`https://optimistic.etherscan.io/tx/${item.txId}`} target='_blank'><i className='icon-explorer'></i></a>
                </div>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}