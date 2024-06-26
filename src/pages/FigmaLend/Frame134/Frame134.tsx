import { Component169Property1Component1 } from '../Component169Property1Component1/Component169Property1Component1'
import { Component172Property1Component171 } from '../Component172Property1Component171/Component172Property1Component171'
import { Component173 } from '../Component173/Component173'
import { Component174Property1Component140 } from '../Component174Property1Component140/Component174Property1Component140'
import { Component174Property1Component173 } from '../Component174Property1Component173/Component174Property1Component173'
import { Component236Property1Component235 } from '../Component236Property1Component235/Component236Property1Component235'
import styles from './Frame134.module.css'

export interface IFrame134Props {
  component0?: JSX.Element
  component1?: JSX.Element
  className?: string
}

export const Frame134 = ({
  component0 = <Component174Property1Component140 property1="component-140" />,
  component1 = <Component174Property1Component173 property1="component-173" />,
  className,
  ...props
}: IFrame134Props): JSX.Element => {
  return (
    <div className={styles.frame134 + ' ' + className}>
      <div className={styles.frame481853}>
        <img className={styles.group481713} src="group-4817130.svg" />
        <div className={styles.frame481799}>
          <div className={styles.frame481803}>
            {component0}
            {component1}
            <Component174Property1Component173
              property1="component-173"
              className={styles.component237Instance}
            ></Component174Property1Component173>
            <Component174Property1Component173
              property1="component-173"
              className={styles.component182Instance}
            ></Component174Property1Component173>
            <Component236Property1Component235
              className={styles.component236Instance}
            ></Component236Property1Component235>
          </div>
        </div>
      </div>
      <div className={styles.frame481802}>
        <Component173 className={styles.component173Instance}></Component173>
        <Component169Property1Component1
          className={styles.component200Instance}
        ></Component169Property1Component1>
        <Component172Property1Component171
          property1="component-171"
          className={styles.component201Instance}
        ></Component172Property1Component171>
      </div>
    </div>
  )
}
