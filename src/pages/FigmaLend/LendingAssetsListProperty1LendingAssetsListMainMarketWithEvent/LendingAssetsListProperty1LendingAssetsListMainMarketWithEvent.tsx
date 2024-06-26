import { ChainSelectProperty1ChainSelect } from '../ChainSelectProperty1ChainSelect/ChainSelectProperty1ChainSelect'
import { Component189Property1Frame9 } from '../Component189Property1Frame9/Component189Property1Frame9'
import { Component189Property1Frame1277 } from '../Component189Property1Frame1277/Component189Property1Frame1277'
import { Component291Property1Tag0 } from '../Component291Property1Tag0/Component291Property1Tag0'
import { Component291Property1Tag2 } from '../Component291Property1Tag2/Component291Property1Tag2'
import { EventProperty1Event0 } from '../EventProperty1Event0/EventProperty1Event0'
import { LendListProperty1BorrowFull } from '../LendListProperty1BorrowFull/LendListProperty1BorrowFull'
import { LendListProperty1Default } from '../LendListProperty1Default/LendListProperty1Default'
import { LendListProperty1SupplyFull } from '../LendListProperty1SupplyFull/LendListProperty1SupplyFull'
import styles from './LendingAssetsListProperty1LendingAssetsListMainMarketWithEvent.module.css'

export interface ILendingAssetsListProperty1LendingAssetsListMainMarketWithEventProps {
  property1?:
    | 'lending-assets-list-degen-market-without-event'
    | 'lending-assets-list-lrt-market-without-event'
    | 'lending-assets-list-main-market-without-event'
    | 'lending-assets-list-main-market-with-event'
    | 'lending-assets-list-degen-market-with-event'
    | 'lending-assets-list-lrt-market-with-event'
  className?: string
}

export const LendingAssetsListProperty1LendingAssetsListMainMarketWithEvent = ({
  property1 = 'lending-assets-list-main-market-without-event',
  className,
  ...props
}: ILendingAssetsListProperty1LendingAssetsListMainMarketWithEventProps): JSX.Element => {
  const variantsClassName = styles['property-1-' + property1]

  return (
    <div
      className={
        styles.lendingAssetsListProperty1LendingAssetsListMainMarketWithEvent +
        ' ' +
        className +
        ' ' +
        variantsClassName
      }
    >
      <div className={styles.frame481954}>
        <div className={styles.frame482167}>
          <Component291Property1Tag0
            className={styles.component292Instance}
          ></Component291Property1Tag0>
          <Component291Property1Tag2
            property1="tag-2"
            className={styles.component293Instance}
          ></Component291Property1Tag2>
          <Component291Property1Tag2
            property1="tag-2"
            className={styles.component294Instance}
          ></Component291Property1Tag2>
        </div>
        <div className={styles.frame482181}></div>
        <div className={styles.frame482182}>
          <ChainSelectProperty1ChainSelect
            className={styles.chainSelectInstance}
          ></ChainSelectProperty1ChainSelect>
        </div>
      </div>
      <EventProperty1Event0 className={styles.eventInstance}></EventProperty1Event0>
      <div className={styles.frame482226}>
        <div className={styles.frame481955}>
          <div className={styles.frame482179}>
            <div className={styles.frame481709}>
              <div className={styles.totalMarketSize}>Total market size </div>
              <div className={styles.frame481698}>
                <div className={styles.two717M}>$27.17M </div>
              </div>
            </div>
            <div className={styles.frame481711}>
              <div className={styles.totalAvailable}>Total available </div>
              <div className={styles.frame481698}>
                <div className={styles.one100M}>$11.00M </div>
              </div>
            </div>
            <div className={styles.frame481710}>
              <div className={styles.totalBorrows}>Total Borrows </div>
              <div className={styles.frame481698}>
                <div className={styles.one617M}>$16.17M </div>
              </div>
            </div>
            <div className={styles.frame481712}>
              <div className={styles.globalUtilization}>Global Utilization </div>
              <div className={styles.frame481698}>
                <div className={styles.six732}>67.32% </div>
              </div>
            </div>
            <div className={styles.frame481713}>
              <div className={styles.maxOutflow}>Max outflow </div>
              <div className={styles.five00MPer4Hours}>$5.00m per 4 hours </div>
            </div>
          </div>
          <div className={styles.frame482178}>
            <div className={styles.component97}>
              <div className={styles.searchPool}>Search Pool </div>
              <img className={styles.frame6} src="frame-60.svg" />
            </div>
            <Component189Property1Frame1277
              property1="frame-1277"
              className={styles.component189Instance}
            ></Component189Property1Frame1277>
            <Component189Property1Frame9
              className={styles.component189Instance}
            ></Component189Property1Frame9>
            <Component189Property1Frame1277
              property1="frame-1277"
              className={styles.component189Instance}
            ></Component189Property1Frame1277>
            <Component189Property1Frame9
              className={styles.component189Instance2}
            ></Component189Property1Frame9>
            <Component189Property1Frame1277
              property1="frame-1277"
              className={styles.component189Instance2}
            ></Component189Property1Frame1277>
            <Component189Property1Frame1277
              property1="frame-1277"
              className={styles.component189Instance2}
            ></Component189Property1Frame1277>
            <Component189Property1Frame1277
              property1="frame-1277"
              className={styles.component190Instance}
            ></Component189Property1Frame1277>
          </div>
        </div>
        <div className={styles.frame481645}>
          <div className={styles.frame481649}>
            <div className={styles.pool}>Pool </div>
          </div>
          <div className={styles.frame481648}>
            <div className={styles.totalSupply}>Total Supply </div>
            <img className={styles.group} src="group0.svg" />
          </div>
          <div className={styles.frame481656}>
            <div className={styles.totalBorrowed}>Total Borrowed </div>
            <img className={styles.group2} src="group1.svg" />
          </div>
          <div className={styles.frame481657}>
            <div className={styles.liquidity}>Liquidity </div>
            <img className={styles.group3} src="group2.svg" />
          </div>
          <div className={styles.frame481652}>
            <div className={styles.utilization}>Utilization </div>
          </div>
          <div className={styles.frame482235}>
            <div className={styles.ltv}>LTV </div>
          </div>
          <div className={styles.frame481650}>
            <div className={styles.supplyApy}>Supply APY </div>
            <img className={styles.group4} src="group3.svg" />
          </div>
          <div className={styles.frame481651}>
            <div className={styles.borrowedApr}>Borrowed APR </div>
            <img className={styles.group5} src="group4.svg" />
          </div>
        </div>
        <div className={styles.frame481953}>
          <LendListProperty1Default
            className={styles.lendListInstance}
          ></LendListProperty1Default>
          <LendListProperty1Default
            className={styles.lendListInstance}
          ></LendListProperty1Default>
          <LendListProperty1SupplyFull
            className={styles.lendListInstance2}
          ></LendListProperty1SupplyFull>
          <LendListProperty1BorrowFull
            className={styles.lendListInstance2}
          ></LendListProperty1BorrowFull>
          <LendListProperty1Default
            className={styles.lendListInstance}
          ></LendListProperty1Default>
          <LendListProperty1Default
            className={styles.lendListInstance}
          ></LendListProperty1Default>
          <LendListProperty1Default
            className={styles.lendListInstance}
          ></LendListProperty1Default>
        </div>
      </div>
    </div>
  )
}
