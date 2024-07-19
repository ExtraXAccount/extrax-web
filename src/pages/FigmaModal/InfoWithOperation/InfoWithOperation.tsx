import './InfoWithOperation.css'

import { InfoToListProperty1Info } from '../InfoToListProperty1Info/InfoToListProperty1Info'
import { SupplyWindows } from '../SupplyWindows/SupplyWindows'

export interface IInfoWithOperationProps {
  className?: string
}

export const InfoWithOperation = ({
  className,
  ...props
}: IInfoWithOperationProps): JSX.Element => {
  return (
    <div className={'info-with-operation ' + className}>
      <div className="info-with-operation__frame-1279">
        <div className="info-with-operation__usdc-pool-details">USDC Pool Details </div>
        <img className="info-with-operation__frame" src="/modal/frame0.svg" />
      </div>
      <div className="info-with-operation__frame-482114">
        <InfoToListProperty1Info className="info-with-operation__info-to-list-instance"></InfoToListProperty1Info>
        <SupplyWindows className="info-with-operation__supply-windows-instance"></SupplyWindows>
      </div>
    </div>
  )
}
