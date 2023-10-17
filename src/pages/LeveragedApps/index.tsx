import './index.scss'

import { useMemo, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function LeveragedApps() {
  const [dappList, setDappList] = useState([
    {
      name: 'Uniswap V3',
      // icon: 'shovel',
      link: '/leveragedapps/uniswapv3',
    },
    {
      name: 'Velodrome V2',
      // icon: 'shovel',
      link: '/leveragedapps/velodromev2',
    },
  ])
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
          {/* <li>Uniswap</li> */}
          {/* <li>Velodrome</li> */}
          <div className="side-bar-app-list-item" key="add">
            +
          </div>
        </div>
      </div>
      <div className="dapp-wrapper">
        <h3 className="dapp-wrapper-title">Uniswap V3 - Leveraged LP</h3>
        <div className="dapp-wrapper-inner">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
