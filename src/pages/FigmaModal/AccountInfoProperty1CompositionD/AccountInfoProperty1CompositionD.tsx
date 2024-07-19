import './AccountInfoProperty1CompositionD.css'

export interface IAccountInfoProperty1CompositionDProps {
  property1?: 'composition' | 'composition-d'
  className?: string
}

export const AccountInfoProperty1CompositionD = ({
  property1 = 'composition-d',
  className,
  ...props
}: IAccountInfoProperty1CompositionDProps): JSX.Element => {
  const variantsClassName = 'property-1-' + property1

  return (
    <div
      className={
        'account-info-property-1-composition-d ' + className + ' ' + variantsClassName
      }
    >
      <div className="account-info-property-1-composition-d__frame-481706">
        <div className="account-info-property-1-composition-d__account-info">
          Account info{' '}
        </div>
        <img
          className="account-info-property-1-composition-d__vector"
          src="/modal/vector0.svg"
        />
      </div>
      <div className="account-info-property-1-composition-d__frame-481705">
        <div className="account-info-property-1-composition-d__frame-481711">
          <div className="account-info-property-1-composition-d__borrowing-power">
            Borrowing Power:{' '}
          </div>
          <div className="account-info-property-1-composition-d__frame-481976">
            <div className="account-info-property-1-composition-d___331-446-600-0">
              $331,446,600.0{' '}
            </div>
            <img
              className="account-info-property-1-composition-d__subtract"
              src="/modal/subtract0.svg"
            />
            <div className="account-info-property-1-composition-d___33-546-600-0">
              $33,546,600.0{' '}
            </div>
          </div>
        </div>
        <div className="account-info-property-1-composition-d__frame-481710">
          <div className="account-info-property-1-composition-d__portfolio-apy">
            Portfolio APY:{' '}
          </div>
          <div className="account-info-property-1-composition-d__frame-481902">
            <div className="account-info-property-1-composition-d___6-73">6.73% </div>
            <img
              className="account-info-property-1-composition-d__subtract2"
              src="/modal/subtract1.svg"
            />
            <div className="account-info-property-1-composition-d___5-84">5.84% </div>
          </div>
        </div>
        <div className="account-info-property-1-composition-d__frame-481709">
          <div className="account-info-property-1-composition-d__account-leverage">
            Account Leverage:{' '}
          </div>
          <div className="account-info-property-1-composition-d__frame-481902">
            <div className="account-info-property-1-composition-d___1-0-x">1.0x </div>
            <img
              className="account-info-property-1-composition-d__subtract3"
              src="/modal/subtract2.svg"
            />
            <div className="account-info-property-1-composition-d___4-7-x">4.7x </div>
          </div>
        </div>
        <div className="account-info-property-1-composition-d__frame-4817062">
          <div className="account-info-property-1-composition-d__frame-481699">
            <div className="account-info-property-1-composition-d__net-worth">
              Net Worth:{' '}
            </div>
          </div>
          <div className="account-info-property-1-composition-d__frame-481902">
            <div className="account-info-property-1-composition-d___331-446-600-0">
              $331,446,600.0{' '}
            </div>
            <img
              className="account-info-property-1-composition-d__subtract4"
              src="/modal/subtract3.svg"
            />
            <div className="account-info-property-1-composition-d___331-446-600-0">
              $331,446,600.0{' '}
            </div>
          </div>
        </div>
        <div className="account-info-property-1-composition-d__frame-481702">
          <div className="account-info-property-1-composition-d__frame-481699">
            <div className="account-info-property-1-composition-d__debt-ratio">
              Debt Ratio:{' '}
            </div>
          </div>
          <div className="account-info-property-1-composition-d__frame-481902">
            <div className="account-info-property-1-composition-d___12">12% </div>
            <img
              className="account-info-property-1-composition-d__subtract5"
              src="/modal/subtract4.svg"
            />
            <div className="account-info-property-1-composition-d___25">25% </div>
          </div>
        </div>
      </div>
    </div>
  )
}
