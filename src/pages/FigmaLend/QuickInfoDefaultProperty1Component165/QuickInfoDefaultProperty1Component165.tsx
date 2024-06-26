import { Component224Property1G } from '../Component224Property1G/Component224Property1G'
import { Component230Property1Default } from '../Component230Property1Default/Component230Property1Default'
import { MarketTagProperty1MainMarketTag } from '../MarketTagProperty1MainMarketTag/MarketTagProperty1MainMarketTag'
import styles from './QuickInfoDefaultProperty1Component165.module.css'

export interface IQuickInfoDefaultProperty1Component165Props {
  property1?: 'component-165' | 'frame-1279'
  className?: string
}

export const QuickInfoDefaultProperty1Component165 = ({
  property1 = 'frame-1279',
  className,
  ...props
}: IQuickInfoDefaultProperty1Component165Props): JSX.Element => {
  const variantsClassName = styles['property-1-' + property1]

  return (
    <div
      className={
        styles.quickInfoDefaultProperty1Component165 +
        ' ' +
        className +
        ' ' +
        variantsClassName
      }
    >
      <div className={styles.frame1279}>
        <div className={styles.accountCode}>
          <MarketTagProperty1MainMarketTag
            className={styles.marketTagInstance}
          ></MarketTagProperty1MainMarketTag>
        </div>
        <div className={styles.accountCode2}>
          <div className={styles.frame482209}>
            <div className={styles.account0}>Account 0 </div>
            <div className={styles.frame1272}>
              <div className={styles.frame481983}>
                <div className={styles.zeroX0E693F19}>0x0e69...3f19 </div>
              </div>
              <img className={styles.frame481984} src="frame-4819840.svg" />
            </div>
          </div>
          <Component230Property1Default
            className={styles.component298Instance}
          ></Component230Property1Default>
        </div>
        <div className={styles.accountCode3}>
          <img className={styles.frame} src="frame0.svg" />
        </div>
      </div>
      <div className={styles.frame481773}>
        <div className={styles.component129}>
          <img className={styles.lineChart} src="line-chart0.svg" />
          <div className={styles.frame481992}>
            <div className={styles.frame481991}>
              <div className={styles.netWorth}>Net Worth </div>
              <div className={styles.three35466000}>$33,546,600.0 </div>
            </div>
            <div className={styles.frame481836}>
              <div className={styles.deposited22K}>Deposited: $22K </div>
              <div className={styles.line41}></div>
              <div className={styles.borrowed5K}>Borrowed: $5k </div>
            </div>
          </div>
        </div>
        <div className={styles.component138}>
          <div className={styles.frame481780}>
            <div className={styles.frame481944}>
              <div className={styles.borrowingPower}>Borrowing Power </div>
            </div>
            <div className={styles.frame481849}>
              <div className={styles.frame481781}>
                <div className={styles.five35466000}>$53,546,600.0 </div>
                <div className={styles.frame1271}>
                  <div className={styles.four5}>45% </div>
                </div>
              </div>
            </div>
            <div className={styles.frame481842}>
              <div className={styles.debtLimit}>debt limit: </div>
              <div className={styles.frame481843}>
                <div className={styles.one135466000}>$113,546,600.0 </div>
              </div>
            </div>
          </div>
          <div className={styles.frame481672}>
            <div className={styles.ellipse281}></div>
            <div className={styles.ellipse280}></div>
          </div>
        </div>
        <div className={styles.component285}>
          <div className={styles.frame481749}>
            <div className={styles.frame481777}>
              <div className={styles.healthFactor}>Health Factor </div>
              <div className={styles.two10}>2.10 </div>
              <Component224Property1G
                className={styles.component224Instance}
              ></Component224Property1G>
            </div>
            <div className={styles.group481714}>
              <div className={styles.frame482126}>
                <div className={styles.frame482060}></div>
                <div className={styles.frame482061}></div>
                <div className={styles.frame482067}></div>
                <div className={styles.frame482065}></div>
                <div className={styles.frame482063}></div>
              </div>
              <div className={styles.frame481704}>
                <img className={styles.vector} src="vector0.svg" />
                <div className={styles.four915Max75}>49.15% (max 75%) </div>
              </div>
              <div className={styles.frame481703}>
                <div className={styles.seven800LiquidationThreshold}>
                  <span>
                    <span className={styles.seven800LiquidationThresholdSpan}>
                      78.00%
                    </span>
                    <span className={styles.seven800LiquidationThresholdSpan2}>
                      (Liquidation threshold)
                    </span>
                  </span>{' '}
                </div>
                <img className={styles.vector2} src="vector1.svg" />
              </div>
              <div className={styles.currentLtv}>Current LTV </div>
            </div>
          </div>
        </div>
        <div className={styles.component136}>
          <div className={styles.frame4817772}>
            <div className={styles.portfolioApr}>Portfolio APR </div>
            <div className={styles.frame481788}>
              <div className={styles.five87}>5.87% </div>
            </div>
          </div>
        </div>
        <div className={styles.component137}>
          <div className={styles.frame4817772}>
            <div className={styles.accountLeverage}>Account Leverage </div>
            <div className={styles.frame481788}>
              <div className={styles.four7X}>4.7x </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
