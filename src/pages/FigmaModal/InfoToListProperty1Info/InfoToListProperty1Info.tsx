import './InfoToListProperty1Info.css'

import { BorrowInfo } from '../BorrowInfo/BorrowInfo'
import { CoinMain } from '../CoinMain/CoinMain'
import { Frame482074 } from '../MoreDetail'
import { InterestRateModel } from '../InterestRateModel/InterestRateModel'
import { SupplyInfo } from '../SupplyInfo/SupplyInfo'
import { UsdcApyHistory } from '../UsdcApyHistory/UsdcApyHistory'

export interface IInfoToListProperty1InfoProps {
  property1?: 'coin-list' | 'info'
  className?: string
}

export const InfoToListProperty1Info = ({
  property1 = 'info',
  className,
  ...props
}: IInfoToListProperty1InfoProps): JSX.Element => {
  const variantsClassName = 'property-1-' + property1

  return (
    <div
      className={'info-to-list-property-1-info ' + className + ' ' + variantsClassName}
    >
      {/* <CoinMain className="info-to-list-property-1-info__coin-main-instance"></CoinMain> */}
      <SupplyInfo className="info-to-list-property-1-info__supply-info-instance"></SupplyInfo>
      <BorrowInfo className="info-to-list-property-1-info__borrow-info-instance"></BorrowInfo>
      <UsdcApyHistory className="info-to-list-property-1-info__usdc-apy-history-instance"></UsdcApyHistory>
      <InterestRateModel className="info-to-list-property-1-info__interest-rate-model-instance"></InterestRateModel>
      <Frame482074 className="info-to-list-property-1-info__frame-482075-instance"></Frame482074>
    </div>
  )
}
