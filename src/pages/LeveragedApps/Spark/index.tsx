import './index.scss'

import { Button } from 'antd'
import classNames from 'classnames'
import { useCallback, useEffect, useMemo, useState } from 'react'

import AmountInput from '@/components/AmountInput'
import { SupportedChainId } from '@/constants/chains'
import { TOKEN_LIST } from '@/constants/token'
import useSmartAccount from '@/hooks/useSmartAccount'
import useLendContract from '@/sdk/lend'
import { useAppDispatch } from '@/state'
import { setLendingStatus } from '@/state/lending/reducer'
import { aprToApy, toPrecision } from '@/utils/math'
import { toBNString } from '@/utils/math/bn'

const DAI = {
  ...TOKEN_LIST[SupportedChainId.OPTIMISM].DAI,
  ReserveId: '25',
}
const sDAI_APY = 0.05

export default function Spark() {
  const [value, setValue] = useState('')
  const [withdrawVal, setWithdrawVal] = useState('')
  const [currentTab, setCurrentTab] = useState(1)
  const { lendList, depositAndStake, writeLoading, totalSavingsDAI } = useLendContract()
  const dispatch = useAppDispatch()

  const { availableCredit, accountAPY, depositedVal } = useSmartAccount()

  const updatedAccountApy = useMemo(() => {
    if (!depositedVal) {
      return 0
    }
    const borrowedVal = Number(value) || 0
    const borrowInterest = lendList.find((item) => item.tokenSymbol === 'DAI').borrowingRate
    const result = accountAPY + (borrowedVal * (sDAI_APY - borrowInterest)) / depositedVal
    return result
  }, [depositedVal, value, lendList, accountAPY])

  const updatedWithdrawAccountApy = useMemo(() => {
    if (!depositedVal) {
      return 0
    }
    const withdrawedVal = Number(withdrawVal) || 0
    const borrowInterest = lendList.find((item) => item.tokenSymbol === 'DAI').borrowingRate
    const result = accountAPY - (withdrawedVal * (sDAI_APY - borrowInterest)) / depositedVal
    return result
  }, [depositedVal, withdrawVal, lendList, accountAPY])

  function reset() {
    setValue('')
  }

  const deposit = useCallback(
    async ({ isWithdraw = false } = {}) => {
      const res = await depositAndStake(DAI.ReserveId, toBNString(value || 0, DAI.decimals))

      const newLendList = [...lendList]
      const targetIndex = newLendList.findIndex((item) => item.ReserveId === DAI.ReserveId)
      const target = newLendList[targetIndex]
      newLendList.splice(targetIndex, 1, {
        ...target,
        borrowed: target.borrowed + isWithdraw ? -Number(value) : Number(value),
        SavingsDAI: target.SavingsDAI + isWithdraw ? -Number(value) : Number(value),
      })
      // console.log('newLendingData :>> ', targetIndex, newLendList)
      dispatch(setLendingStatus(newLendList))
      reset()

      return res
    },
    [depositAndStake, value, lendList, dispatch]
  )

  return (
    <div className="dapp-spark">
      <h3>
        Deposit your Credit to SavingsDAI and earn <span className="text-highlight">5.00%</span> APY
      </h3>
      <div className="spark-sdai-wrapper">
        <div className="page-newtabs-wrapper">
          <div className="page-newtabs">
            <a
              className={classNames('page-newtabs-item', {
                active: currentTab === 1,
              })}
              onClick={() => setCurrentTab(1)}
            >
              Deposit
            </a>
            <a
              className={classNames('page-newtabs-item', {
                active: currentTab === 2,
              })}
              onClick={() => setCurrentTab(2)}
            >
              Withdraw
            </a>
          </div>
        </div>
        {currentTab === 1 ? (
          <>
            <div>
              <AmountInput
                maxText="Available Credit"
                max={availableCredit}
                token="USD"
                decimals={18}
                value={value}
                onChange={(val) => setValue(val)}
              />
            </div>
            <ul className="summary-list">
              <li>
                <p>APY:</p>
                <b className="text-highlight">{sDAI_APY * 100}%</b>
              </li>
              <li>
                <p>Portfolio APY</p>
                <b>
                  <span className="item-pre">{toPrecision(accountAPY * 100)}% →</span>
                  <span className="text-highlight">{toPrecision(updatedAccountApy * 100)}%</span>
                </b>
              </li>
            </ul>
            <div className="dialog-btns flex jc-sb">
              <Button
                loading={writeLoading}
                disabled={!Number(value)}
                className={classNames('btn-base flex1', {})}
                onClick={async () => {
                  deposit()
                }}
              >
                {writeLoading ? 'Depositing' : 'Deposit'}
              </Button>
            </div>
          </>
        ) : (
          <>
            <div>
              <AmountInput
                maxText="Account Balance"
                max={totalSavingsDAI}
                token="sDAI"
                decimals={18}
                value={withdrawVal}
                onChange={(val) => setWithdrawVal(val)}
              />
            </div>
            <ul className="summary-list">
              <li>
                <p>Portfolio APY</p>
                <b>
                  <span className="item-pre">{toPrecision(accountAPY * 100)}% →</span>
                  <span className="text-highlight">{toPrecision(updatedWithdrawAccountApy * 100)}%</span>
                </b>
              </li>
            </ul>
            <div className="dialog-btns flex jc-sb">
              <Button
                loading={writeLoading}
                disabled={!Number(withdrawVal)}
                className={classNames('btn-base flex1', {})}
                onClick={async () => {
                  deposit({ isWithdraw: true })
                }}
              >
                {writeLoading ? 'Withdrawing' : 'Withdraw'}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
