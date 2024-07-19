import './InterestRateModel.css'

export interface IInterestRateModelProps {
  className?: string
}

export const InterestRateModel = ({
  className,
  ...props
}: IInterestRateModelProps): JSX.Element => {
  return (
    <div className={'interest-rate-model ' + className}>
      <div className="interest-rate-model__borrowing-interest-rate-model">
        Borrowing Interest Rate Model{' '}
      </div>
      <div className="interest-rate-model__frame-482027">
        <div className="interest-rate-model__frame-482018">
          <div className="interest-rate-model__frame-482019">
            <div className="interest-rate-model__utilization-rate">Utilization Rate </div>
            <div className="interest-rate-model___1-26">1.26% </div>
          </div>
          <div className="interest-rate-model__frame-482003">
            <div className="interest-rate-model__interest-rate-strategy">
              INTEREST RATE STRATEGY{' '}
            </div>
            <img className="interest-rate-model__vector" src="/modal/vector0.svg" />
          </div>
        </div>
        <div className="interest-rate-model__frame-482029">
          <div className="interest-rate-model__frame-482024">
            <div className="interest-rate-model__frame-482020">
              <div className="interest-rate-model__ellipse-284"></div>
              <div className="interest-rate-model__borrow-apr-variable">
                Borrow APR, variable{' '}
              </div>
            </div>
            <div className="interest-rate-model__frame-482021">
              <div className="interest-rate-model__ellipse-2842"></div>
              <div className="interest-rate-model__utilization-rate2">
                Utilization Rate{' '}
              </div>
            </div>
          </div>
          <div className="interest-rate-model__frame-482028">
            <div className="interest-rate-model__group-481688">
              <div className="interest-rate-model__frame-482023">
                <div className="interest-rate-model___0">0% </div>
                <div className="interest-rate-model___25">25% </div>
                <div className="interest-rate-model___50">50% </div>
                <div className="interest-rate-model___75">75% </div>
                <div className="interest-rate-model___100">100% </div>
              </div>
              <div className="interest-rate-model__current-1-26">Current 1.26% </div>
              <div className="interest-rate-model__optimal-45">Optimal 45% </div>
              <img
                className="interest-rate-model__group-481687"
                src="/modal/group-4816870.svg"
              />
              <img className="interest-rate-model__vector-3" src="/modal/vector-30.svg" />
              <div className="interest-rate-model__line-35"></div>
              <div className="interest-rate-model__line-36"></div>
            </div>
            <div className="interest-rate-model__frame-482022">
              <div className="interest-rate-model___100">100% </div>
              <div className="interest-rate-model___50">50% </div>
              <div className="interest-rate-model___0">0% </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
