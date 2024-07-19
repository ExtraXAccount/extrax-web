import './BorrowInfo.css'

export interface IBorrowInfoProps {
  className?: string
}

export const BorrowInfo = ({ className, ...props }: IBorrowInfoProps): JSX.Element => {
  return (
    <div className={'borrow-info ' + className}>
      <div className="borrow-info__borrow-info2">Borrow Info </div>
      <div className="borrow-info__frame-482134">
        <div className="borrow-info__frame-482073">
          <div className="borrow-info__maximum-amount-to-borrow">
            Maximum Amount to Borrow:{' '}
          </div>
          <div className="borrow-info___30-00-m">30.00M </div>
        </div>
        <div className="borrow-info__frame-482075">
          <div className="borrow-info__frame-481894"></div>
          <div className="borrow-info__frame-481895"></div>
        </div>
        <div className="borrow-info__frame-482132">
          <div className="borrow-info__frame-482078">
            <div className="borrow-info__frame-482073">
              <div className="borrow-info__ellipse-307"></div>
              <div className="borrow-info__total-borrowed">total borrowed: </div>
              <div className="borrow-info__frame-482079">
                <div className="borrow-info___5-14-m">5.14M </div>
              </div>
            </div>
            <div className="borrow-info___12-7">12.7 % </div>
          </div>
          <div className="borrow-info__frame-4820792">
            <div className="borrow-info__frame-482073">
              <div className="borrow-info__ellipse-3072"></div>
              <div className="borrow-info__available">available: </div>
              <div className="borrow-info__frame-482079">
                <div className="borrow-info___31-28-m">31.28M </div>
              </div>
            </div>
            <div className="borrow-info___87-3">87.3 % </div>
          </div>
        </div>
      </div>
      <div className="borrow-info__frame-482093">
        <div className="borrow-info__frame-482080">
          <div className="borrow-info__more-info">more Info </div>
        </div>
        <div className="borrow-info__component-287">
          <div className="borrow-info__frame-482137">
            <div className="borrow-info__frame-482083">
              <div className="borrow-info__supply-apy">Borrow APY </div>
              <div className="borrow-info__frame-481698">
                <div className="borrow-info___5-24">5.24% </div>
              </div>
            </div>
            <div className="borrow-info__frame-481709">
              <div className="borrow-info__collateral-factor">Borrow Factor </div>
              <div className="borrow-info__frame-481698">
                <div className="borrow-info___85">85% </div>
              </div>
            </div>
            <div className="borrow-info__frame-482081">
              <div className="borrow-info__liquidation-threshold">Reserve Fee </div>
              <div className="borrow-info__frame-481698">
                <div className="borrow-info___90-0">15% </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
