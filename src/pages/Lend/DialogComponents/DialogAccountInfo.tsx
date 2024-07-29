import './dialogAccountInfo.scss'

import { Collapse, CollapseProps } from 'antd/es'
import { useMemo } from 'react'

import useSmartAccount from '@/hooks/useSmartAccount'
import useFormatPositions from '@/pages/Positions/hooks/useFormatPositions'
import { formatNumDisplay, toPrecision } from '@/utils/math'

import MiniPosition from './MiniPosition'

export default function DialogAccountInfo({
  reserveId,
  updatedSummary,
}: {
  updatedSummary: {
    usedCredit: number
    netWorth: number
    debtVal: number
    accountApy: number
  }
  valueChange?: number
  reserveId?: bigint
}) {
  const { usedCredit, leverage, netWorth, debtVal, accountApy } = useSmartAccount()
  const { assetPositions, debtPositions, totalAssetValue, totalDebtValue } =
    useFormatPositions(reserveId)

  const formattedData = useMemo(() => {
    return {
      preBorrowingPower: '$' + formatNumDisplay(usedCredit),
      nextBorrowingPower: '$' + formatNumDisplay(updatedSummary.usedCredit),
      preApy: toPrecision(accountApy * 100) + '%',
      nextApy: toPrecision(updatedSummary.accountApy * 100) + '%',
      preLv: toPrecision(leverage),
      nextLv: toPrecision(
        (updatedSummary.netWorth + updatedSummary.debtVal) / updatedSummary.netWorth,
      ),
      preNetWorth: '$' + formatNumDisplay(netWorth),
      nextNetWorth: '$' + formatNumDisplay(updatedSummary.netWorth),
      preDebtRatio: toPrecision((debtVal / (netWorth + debtVal)) * 100) + '%',
      nextDebtRatio:
        toPrecision(
          (updatedSummary.debtVal / (updatedSummary.netWorth + updatedSummary.debtVal)) *
            100,
        ) + '%',
    }
  }, [accountApy, debtVal, leverage, netWorth, updatedSummary, usedCredit])

  // console.log(reserveId, { assetPositions, debtPositions })
  const info = (
    <ul className="summary-list">
      <li>
        <p>Borrowing Power:</p>
        <div className="flex ai-ct gap-8">
          <span className="item-pre">{formattedData.preBorrowingPower}</span>
          <span>→</span>
          <b>{formattedData.nextBorrowingPower}</b>
        </div>
      </li>
      <li>
        <p>Portfolio APY:</p>
        <div className="flex ai-ct gap-8">
          <span className="item-pre">{formattedData.preApy}</span>
          <span>→</span>
          <b>{formattedData.nextApy}</b>
        </div>
      </li>
      <li>
        <p>Account Leverage:</p>
        <div className="flex ai-ct gap-8">
          <span className="item-pre">{formattedData.preLv}</span>
          <span>→</span>
          <b>{formattedData.nextLv}</b>
        </div>
      </li>
      <li>
        <p>Net Worth:</p>
        <div className="flex ai-ct gap-8">
          <span className="item-pre">{formattedData.preNetWorth}</span>
          <span>→</span>
          <b>{formattedData.nextNetWorth}</b>
        </div>
      </li>
      <li>
        <p>Debt Ratio:</p>
        <div className="flex ai-ct gap-8">
          <span className="item-pre">{formattedData.preDebtRatio}</span>
          <span>→</span>
          <b>{formattedData.nextDebtRatio}</b>
        </div>
      </li>
    </ul>
  )

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
  ]
  return (
    <div className="dialog-accountinfo">
      <Collapse items={items} defaultActiveKey={['Account Info']} />
    </div>
  )
}
