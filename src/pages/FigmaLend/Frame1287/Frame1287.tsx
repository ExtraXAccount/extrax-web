// import { Component174Property1Component140 } from '../Component174Property1Component140/Component174Property1Component140'
// import { Component174Property1Component173 } from '../Component174Property1Component173/Component174Property1Component173'
// import { Frame134 } from '../Frame134/Frame134'
import { LendingAssetsListProperty1LendingAssetsListMainMarketWithEvent } from '../LendingAssetsListProperty1LendingAssetsListMainMarketWithEvent/LendingAssetsListProperty1LendingAssetsListMainMarketWithEvent'
import { QuickInfoDefaultProperty1Component165 } from '../QuickInfoDefaultProperty1Component165/QuickInfoDefaultProperty1Component165'
import styles from './Frame1287.module.css'

export interface IFrame1287Props {
  className?: string
}

export const Frame1287 = ({ className, ...props }: IFrame1287Props): JSX.Element => {
  return (
    <div className={styles.frame1276}>
      <QuickInfoDefaultProperty1Component165
        property1="component-165"
        className={styles.quickInfoDefaultInstance}
      ></QuickInfoDefaultProperty1Component165>
      <LendingAssetsListProperty1LendingAssetsListMainMarketWithEvent
        property1="lending-assets-list-main-market-with-event"
        className={styles.lendingAssetsListInstance}
      ></LendingAssetsListProperty1LendingAssetsListMainMarketWithEvent>
    </div>
    // <div className={styles.frame1287 + ' ' + className}>
    //   <Frame134
    //     component0={
    //       <Component174Property1Component173
    //         className={styles.component179Instance}
    //         property1="component-173"
    //       />
    //     }
    //     component1={
    //       <Component174Property1Component140
    //         className={styles.component180Instance}
    //         property1="component-140"
    //       />
    //     }
    //     className={styles.frame134Instance}
    //   ></Frame134>
    // </div>
  )
}
