import './InterestRateModel.css'

import { Skeleton } from 'antd'

import InterestCurve from '@/components/InterestCurve'
import { toPrecision } from '@/utils/math'

import useLendPoolInfo from '../useLendPoolInfo'

export const InterestRateModel = ({ className }): JSX.Element => {
  const lendPoolInfo = useLendPoolInfo()

  return (
    <div className={'interest-rate-model ' + className}>
      <div className="interest-rate-model__borrowing-interest-rate-model">
        Borrowing Interest Rate Model{' '}
      </div>
      <div className="interest-rate-model__frame-482027">
        <div className="interest-rate-model__frame-482018">
          <div className="interest-rate-model__frame-482019">
            <div className="interest-rate-model__utilization-rate">Utilization Rate </div>
            <div className="interest-rate-model___1-26">
              {!lendPoolInfo ? (
                <Skeleton.Button active size="small" block={false} />
              ) : (
                <>{toPrecision(lendPoolInfo.formatted.utilization * 100)}%</>
              )}
            </div>
          </div>
          <a
            href="https://docs.extrafi.io/extra_finance/lending/interest-rate-model"
            target="_blank"
            rel="noopener noreferrer"
            className="interest-rate-model__frame-482003"
          >
            INTEREST RATE STRATEGY <i className="interest-rate-model__vector"></i>
          </a>
        </div>
        <InterestCurve />
      </div>
    </div>
  )
}
