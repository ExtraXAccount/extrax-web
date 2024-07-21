import './UsdcApyHistory.css'

import { Skeleton } from 'antd'

import { aprToApy, toPrecision } from '@/utils/math'

import { TagProperty1Default } from '../TagProperty1Default/TagProperty1Default'
import { TagProperty1Selected } from '../TagProperty1Selected/TagProperty1Selected'
import useLendPoolInfo from '../useLendPoolInfo'

export interface IUsdcApyHistoryProps {
  className?: string
}

export const UsdcApyHistory = ({
  className,
  ...props
}: IUsdcApyHistoryProps): JSX.Element => {
  const lendPoolInfo = useLendPoolInfo()

  return (
    <div className={'usdc-apy-history ' + className}>
      <div className="usdc-apy-history__usdc-apy-history2">USDC APY History </div>
      <div className="usdc-apy-history__frame-482026">
        <div className="usdc-apy-history__frame-482007">
          <div className="usdc-apy-history__frame-482019">
            <div className="usdc-apy-history__apy-14-d-avg">APY (14D AVG) </div>
            <div className="usdc-apy-history___7835">
              {' '}
              {!lendPoolInfo ? (
                <Skeleton.Button active size="small" block={false} />
              ) : (
                <>{toPrecision(aprToApy(lendPoolInfo?.formatted.apr || 0) * 100)}%</>
              )}
            </div>
          </div>
          <div className="usdc-apy-history__frame-482005">
            <TagProperty1Selected className="usdc-apy-history__tag-instance"></TagProperty1Selected>
            <TagProperty1Default
              property1="default"
              className="usdc-apy-history__tag-instance"
            ></TagProperty1Default>
            <TagProperty1Default
              property1="default"
              className="usdc-apy-history__tag-instance"
            ></TagProperty1Default>
            <TagProperty1Default
              property1="default"
              className="usdc-apy-history__tag-instance"
            ></TagProperty1Default>
          </div>
          <div className="usdc-apy-history__frame-482006">
            <TagProperty1Selected className="usdc-apy-history__tag-instance"></TagProperty1Selected>
            <TagProperty1Default
              property1="default"
              className="usdc-apy-history__tag-instance"
            ></TagProperty1Default>
            <TagProperty1Default
              property1="default"
              className="usdc-apy-history__tag-instance"
            ></TagProperty1Default>
          </div>
        </div>
        <div className="usdc-apy-history__group-481686">
          <div className="usdc-apy-history__frame-482015">
            <div className="usdc-apy-history__frame-482014">
              <div className="usdc-apy-history__date">Date: </div>
              <div className="usdc-apy-history__may-29-22-11">May 29 22:11 </div>
            </div>
            <div className="usdc-apy-history__frame-482013">
              <div className="usdc-apy-history__apy">APY: </div>
              <div className="usdc-apy-history___302">302% </div>
            </div>
            <div className="usdc-apy-history__frame-482012">
              <div className="usdc-apy-history__usdc-price">USDC price: </div>
              <div className="usdc-apy-history___1">$1 </div>
            </div>
            <div className="usdc-apy-history__frame-482011">
              <div className="usdc-apy-history__velo-price">VELO price: </div>
              <div className="usdc-apy-history___0-1581">$0.1581 </div>
            </div>
          </div>
          <div className="usdc-apy-history__group-481685">
            <div className="usdc-apy-history__frame-482008">
              <div className="usdc-apy-history___400">400% </div>
              <div className="usdc-apy-history___300">300% </div>
              <div className="usdc-apy-history___200">200% </div>
              <div className="usdc-apy-history___100">100% </div>
            </div>
            <div className="usdc-apy-history__frame-482009">
              <div className="usdc-apy-history___4002">400% </div>
              <div className="usdc-apy-history___3002">300% </div>
              <div className="usdc-apy-history___2002">200% </div>
              <div className="usdc-apy-history___1002">100% </div>
            </div>
            <img
              className="usdc-apy-history__group-481684"
              src="/modal/group-4816840.svg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
