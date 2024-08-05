import { formatNumberByUnit } from '@/utils/math'
import './index.scss'

export default function AccountCard(props: {
  address: string
  supplyValue: number
  borrowValue: number
  netWorth: number
}) {
  return (
    <div className='account-card'>
      <section className='account-card-address'>{props.address?.slice(0, 6)}....{props.address?.slice(-4)}</section>
      <ul className='flex ai-ct account-card-list'>
        <li>
          <p>Your Supply</p>
          <b>${formatNumberByUnit(props.supplyValue)}</b>
        </li>
        <li>
          <p>Your Borrow</p>
          <b>${formatNumberByUnit(props.borrowValue)}</b>
        </li>
        <li>
          <p>Net Worth</p>
          <b>${formatNumberByUnit(props.netWorth)}</b>
        </li>
      </ul>
    </div>
  )
}