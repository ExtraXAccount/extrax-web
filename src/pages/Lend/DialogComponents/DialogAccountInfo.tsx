import { Collapse, CollapseProps } from 'antd/es'
import './dialogAccountInfo.scss'
import useFormatPositions from '@/pages/Positions/hooks/useFormatPositions'
import MiniPosition from './MiniPosition'

export default function DialogAccountInfo(
  props: {
    valueChange?: number
    reserveId?: bigint
  }
) {
  const { assetPositions, debtPositions, totalAssetValue, totalDebtValue } =
    useFormatPositions(props.reserveId)
  console.log(props.reserveId)
  const info = (
    <ul className="summary-list">
      <li>
        <p>Borrowing Power:</p>
        <b className="text-highlight">
          $3,331
        </b>
      </li>
      <li>
        <p>Portfolio APY:</p>
        <b className="text-highlight">
          $3,331
        </b>
      </li>
      <li>
        <p>Account Leverage:</p>
        <b className="text-highlight">
          $3,331
        </b>
      </li>
      <li>
        <p>Net Worth:</p>
        <b className="text-highlight">
          $3,331
        </b>
      </li>
      <li>
        <p>Debt Ratio:</p>
        <b className="text-highlight">
          $3,331
        </b>
      </li>
    </ul>
  )

  console.log(assetPositions, debtPositions)

  const items: CollapseProps['items'] = [
    {
      key: 'Account Info',
      label: 'Account Info',
      children: info,
    },
    {
      key: 'Account Balances',
      label: 'Account Balances',
      children: <MiniPosition positions={assetPositions.concat(debtPositions)} />,
    },
  ];
  return (
    <div className='dialog-accountinfo'>
      <Collapse items={items}/>
    </div>
  )
}