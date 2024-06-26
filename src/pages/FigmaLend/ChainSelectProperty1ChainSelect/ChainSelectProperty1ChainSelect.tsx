import { Component281Property1Base } from '../Component281Property1Base/Component281Property1Base'
import styles from './ChainSelectProperty1ChainSelect.module.css'

export interface IChainSelectProperty1ChainSelectProps {
  property1?: 'chain-select' | 'chain-select-hover' | 'frame-482186'
  className?: string
}

export const ChainSelectProperty1ChainSelect = ({
  property1 = 'chain-select',
  className,
  ...props
}: IChainSelectProperty1ChainSelectProps): JSX.Element => {
  const variantsClassName = styles['property-1-' + property1]

  return (
    <div
      className={
        styles.chainSelectProperty1ChainSelect + ' ' + className + ' ' + variantsClassName
      }
    >
      <Component281Property1Base
        property1="base"
        className={styles.component281Instance}
      ></Component281Property1Base>
      <div className={styles.baseNetwork}>Base Network </div>
      <img className={styles.frame482183} src="frame-4821830.svg" />
    </div>
  )
}
