import './index.scss'

import { useMemo, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

export default function LeveragedApps() {
  const { pathname } = useLocation()

  const [dappList, setDappList] = useState([
    {
      name: 'Uniswap V3',
      // icon: 'shovel',
      title: 'Uniswap V3 - Leveraged LP',
      link: '/leveragedapps/uniswapv3',
    },
    {
      name: 'Spark Protocol',
      title: 'Spark Protocol - Leveraged Lending',
      link: '/leveragedapps/spark',
    },
    {
      name: 'Velodrome V2',
      // icon: 'shovel',
      title: 'Velodrome V2 - Leveraged LP',
      link: '/leveragedapps/velodromev2',
    },
  ])

  const dappTitle = useMemo(() => {
    return dappList.find((item) => pathname.indexOf(item.link) > -1)?.title
  }, [dappList, pathname])

  return (
    <div className="page-leveraged-apps">
      <div className="side-bar">
        {/* <h2>Leveraged Apps</h2> */}
        <h4>My Apps</h4>
        <div className="side-bar-app-list">
          {dappList.map((dapp) => {
            return (
              <NavLink to={dapp.link} className="side-bar-app-list-item" key={dapp.name}>
                <p>{dapp.name}</p>
              </NavLink>
            )
          })}
          <div className="side-bar-app-list-item" key="add">
            +
          </div>
        </div>
      </div>
      <div className="dapp-wrapper">
        <h3 className="dapp-wrapper-title">{dappTitle}</h3>
        <div className="dapp-wrapper-inner">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
