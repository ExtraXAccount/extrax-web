import './BorrowInfo.css'

import { Skeleton } from 'antd'

import FormattedNumber from '@/components/FormattedNumber'
import { aprToApy, formatNumberByUnit, toPrecision } from '@/utils/math'
import { div } from '@/utils/math/bigNumber'

import useLendPoolInfo from '../useLendPoolInfo'

export const BorrowInfo = ({ className }): JSX.Element => {
  const lendPoolInfo = useLendPoolInfo()

  return (
    <div className={'borrow-info ' + className}>
      <div className='borrow-info__borrow-info2'>Borrow Info </div>
      <div className='borrow-info__frame-482134'>
        <div className='borrow-info__frame-482073'>
          <div className='borrow-info__maximum-amount-to-borrow'>Maximum Amount to Borrow: </div>
          <div className='borrow-info___30-00-m'>
            {!lendPoolInfo ? (
              <Skeleton.Button active size='small' block={false} />
            ) : (
              <FormattedNumber value={lendPoolInfo?.borrowCap} unit />
            )}
          </div>
        </div>
        <div className='borrow-info__frame-482075'>
          <div
            className='borrow-info__frame-481894'
            style={{
              width: !lendPoolInfo
                ? 0
                : `${div(lendPoolInfo.totalDebt || 0, lendPoolInfo.borrowCap).toNumber() * 100}%`,
            }}
          ></div>
          <div className='borrow-info__frame-481895'></div>
        </div>
        <div className='borrow-info__frame-482132'>
          <div className='borrow-info__frame-482078'>
            <div className='borrow-info__frame-482073'>
              <div className='borrow-info__ellipse-307'></div>
              <div className='borrow-info__total-borrowed'>total borrowed: </div>
              <div className='borrow-info__frame-482079'>
                <div className='borrow-info___5-14-m'>
                  {!lendPoolInfo ? (
                    <Skeleton.Button active size='small' block={false} />
                  ) : (
                    <FormattedNumber value={lendPoolInfo?.totalDebt} unit />
                  )}
                </div>
              </div>
            </div>
            <div className='borrow-info___12-7'>
              {!lendPoolInfo ? (
                <Skeleton.Button active size='small' block={false} />
              ) : (
                <FormattedNumber
                  value={div(lendPoolInfo.totalDebt || 0, lendPoolInfo.borrowCap).toString()}
                  percent
                />
              )}
            </div>
          </div>
          <div className='borrow-info__frame-4820792'>
            <div className='borrow-info__frame-482073'>
              <div className='borrow-info__ellipse-3072'></div>
              <div className='borrow-info__available'>available: </div>
              <div className='borrow-info__frame-482079'>
                <div className='borrow-info___31-28-m'>
                  {!lendPoolInfo ? (
                    <Skeleton.Button active size='small' block={false} />
                  ) : (
                    <FormattedNumber value={lendPoolInfo?.formattedAvailableLiquidity} unit />
                  )}
                </div>
              </div>
            </div>
            <div className='borrow-info___87-3'>
              {!lendPoolInfo ? (
                <Skeleton.Button active size='small' block={false} />
              ) : (
                <FormattedNumber
                  value={div(
                    lendPoolInfo.formattedAvailableLiquidity || 0,
                    lendPoolInfo.totalLiquidity
                  ).toString()}
                  percent
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='borrow-info__frame-482093'>
        <div className='borrow-info__frame-482080'>
          <div className='borrow-info__more-info'>More Info</div>
        </div>
        <div className='borrow-info__component-287'>
          <div className='borrow-info__frame-482137'>
            <div className='borrow-info__frame-482083'>
              <div className='borrow-info__supply-apy'>Borrow APY</div>
              <div className='borrow-info__frame-481698'>
                <div className='borrow-info___5-24'>
                  <FormattedNumber value={lendPoolInfo?.variableBorrowAPY || 0} percent />
                </div>
              </div>
            </div>
            <div className='borrow-info__frame-481709'>
              <div className='borrow-info__collateral-factor'>Borrow Factor</div>
              <div className='borrow-info__frame-481698'>
                <div className='borrow-info___85'>
                  <FormattedNumber value={lendPoolInfo?.reserveFactor || 0} percent />
                </div>
              </div>
            </div>
            <div className='borrow-info__frame-482081'>
              <div className='borrow-info__liquidation-threshold'>Reserve Fee</div>
              <div className='borrow-info__frame-481698'>
                <div className='borrow-info___90-0'>
                  <FormattedNumber value={lendPoolInfo?.reserveFactor || 0} percent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
