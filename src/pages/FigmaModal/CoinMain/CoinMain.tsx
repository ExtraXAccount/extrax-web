import './CoinMain.css'

import { Skeleton } from 'antd'

import TokenIcon from '@/components/TokenIcon'
import usePrices from '@/hooks/usePrices'
import { formatFloatNumber, toPrecision } from '@/utils/math'

import useLendPoolInfo from '../useLendPoolInfo'

export interface ICoinMainProps {
  className?: string
  toggleMenuOpen: () => void
}

export const CoinMain = ({ className, toggleMenuOpen }: ICoinMainProps) => {
  const lendPoolInfo = useLendPoolInfo()
  const { getPrice } = usePrices()

  return (
    <div className={'coin-main ' + className}>
      <div className="coin-main__frame-482117">
        <div className="coin-main__group-9">
          <TokenIcon
            symbol={lendPoolInfo?.tokenSymbol}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div className="coin-main__frame-171">
          <div className="coin-main__usd-coin">
            {!lendPoolInfo ? (
              <Skeleton.Button active size="small" block={false} />
            ) : (
              <>{lendPoolInfo.tokenSymbol.toUpperCase()}</>
            )}
          </div>
          <div className="coin-main__frame-482097">
            {/* <div className="coin-main__usdc">{token?.toUpperCase()} </div> */}
            <div className="coin-main__component-229">
              <div className="coin-main__isolated">Isolated</div>
            </div>
          </div>
        </div>
      </div>
      <div className="coin-main__frame-482082">
        <div className="coin-main__frame-482081">
          <div className="coin-main__reserve-size">Reserve Size</div>
          <div className="coin-main___37-94-m">
            {!lendPoolInfo ? (
              <Skeleton.Button active size="small" block={false} />
            ) : (
              <>
                $
                {formatFloatNumber(
                  lendPoolInfo.formatted.totalSupply * getPrice(lendPoolInfo.tokenSymbol),
                )}
              </>
            )}
          </div>
        </div>
        <div className="coin-main__frame-482083">
          <div className="coin-main__utilization-rate">Utilization Rate</div>
          <div className="coin-main___88-82">
            {!lendPoolInfo ? (
              <Skeleton.Button active size="small" block={false} />
            ) : (
              <>{toPrecision(lendPoolInfo.formatted.utilization * 100)}%</>
            )}
          </div>
        </div>

        <div className="coin-main__frame-482083">
          <div className="coin-main__utilization-rate">Oracle price</div>
          <div className="coin-main___88-82">
            {!lendPoolInfo ? (
              <Skeleton.Button active size="small" block={false} />
            ) : (
              <>${toPrecision(getPrice(lendPoolInfo.tokenSymbol))}</>
            )}
          </div>
        </div>
      </div>
      <i
        className="coin-main__coin-select-instance iconfont icon-menu"
        onClick={toggleMenuOpen}
      ></i>
    </div>
  )
}
