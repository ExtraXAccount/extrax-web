import './SupplyInfo.css'

import { Skeleton } from 'antd'

import FormattedNumber from '@/components/FormattedNumber'
import { formatNumberByUnit, toPrecision } from '@/utils/math'
import { div, minus } from '@/utils/math/bigNumber'

import { SupplyMoreInfo } from '../SupplyMoreInfo'
import useLendPoolInfo from '../useLendPoolInfo'

export interface ISupplyInfoProps {
  className?: string
}

export const SupplyInfo = ({ className }: ISupplyInfoProps): JSX.Element => {
  const lendPoolInfo = useLendPoolInfo()

  return (
    <div className={'supply-info ' + className}>
      <div className='supply-info__supply-info2'>Supply Info </div>
      <div className='supply-info__frame-482133'>
        <div className='supply-info__frame-482073'>
          <div className='supply-info__maximum-amount-to-supply'>Maximum Amount to Supply: </div>
          <div className='supply-info___30-00-m'>
            {!lendPoolInfo ? (
              <Skeleton.Button active size='small' block={false} />
            ) : (
              <FormattedNumber value={lendPoolInfo.supplyCap} unit />
            )}
          </div>
        </div>
        <div className='supply-info__frame-482075'>
          <div
            className='supply-info__frame-481894'
            style={{
              width: !lendPoolInfo
                ? 0
                : `${
                    div(lendPoolInfo.totalLiquidity || 0, lendPoolInfo.supplyCap).toNumber() * 100
                  }%`,
            }}
          ></div>
          <div className='supply-info__frame-481895'></div>
        </div>
        <div className='supply-info__frame-482132'>
          <div className='supply-info__frame-482078'>
            <div className='supply-info__frame-482073'>
              <div className='supply-info__ellipse-307'></div>
              <div className='supply-info__total-supplied'>total supplied: </div>
              <div className='supply-info__frame-482079'>
                <div className='supply-info___6-14-m'>
                  {!lendPoolInfo ? (
                    <Skeleton.Button active size='small' block={false} />
                  ) : (
                    <FormattedNumber value={lendPoolInfo.totalLiquidity} unit />
                  )}
                </div>
              </div>
            </div>
            <div className='supply-info___18-7'>
              {!lendPoolInfo ? (
                <Skeleton.Button active size='small' block={false} />
              ) : (
                <FormattedNumber
                  value={div(lendPoolInfo.totalLiquidity, lendPoolInfo.supplyCap).toString()}
                  percent
                />
              )}
            </div>
          </div>
          <div className='supply-info__frame-4820792'>
            <div className='supply-info__frame-482073'>
              <div className='supply-info__ellipse-3072'></div>
              <div className='supply-info__available'>available: </div>
              <div className='supply-info__frame-482079'>
                <div className='supply-info___30-28-m'>
                  {!lendPoolInfo ? (
                    <Skeleton.Button active size='small' block={false} />
                  ) : (
                    <FormattedNumber
                      value={minus(lendPoolInfo.supplyCap, lendPoolInfo.totalLiquidity).toString()}
                      unit
                    />
                  )}
                </div>
              </div>
            </div>
            <div className='supply-info___81-3'>
              {!lendPoolInfo ? (
                <Skeleton.Button active size='small' block={false} />
              ) : (
                <FormattedNumber
                  value={1 - div(lendPoolInfo.totalLiquidity, lendPoolInfo.supplyCap).toNumber()}
                  percent
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='supply-info__frame-482092'>
        <div className='supply-info__frame-482080'>
          <div className='supply-info__more-info'>More Info</div>
          <div className='supply-info__component-229'>
            <div className='supply-info__can-be-collateral'>Can be collateral</div>
          </div>
        </div>
        <SupplyMoreInfo className='supply-info__component-287-instance'></SupplyMoreInfo>
      </div>
    </div>
  )
}
