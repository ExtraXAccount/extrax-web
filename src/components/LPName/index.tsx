import './index.scss'

export function specialNameChecker(token: string) {
  if (token === 'USD+') {
    return 'usdplus'
  } else if (token === 'DAI+') {
    return 'daiplus'
  } else {
    return (token || '').toLowerCase()
  }
}

export default function LPName(props: {
  token0?: string
  token1?: string
  title: string
  nobold?: boolean
  isStable?: boolean
  isNew?: React.ReactNode
}) {
  const { token0, token1, title, nobold = false, isStable, isNew } = props
  // if (!token0 || !token1) {
  //   return null
  // }
  return (
    <div className="lpname">
      {token0 && <i className={`coin coin-${specialNameChecker(token0)}`} />}
      {token1 && <i className={`coin coin-${specialNameChecker(token1)}`} />}
      <p className={nobold ? '' : 'bold'}>{title}</p>
      {isNew && <i className="lpname-new">✨</i>}
      {isStable && <i className="lpname-tag">stable</i>}
    </div>
  )
}
