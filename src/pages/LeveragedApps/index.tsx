import './index.scss'

import classNames from 'classnames'
import { useMemo, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

import Dialog from '@/components/Dialog'
import IntentView from '@/components/IntentView'
import { useAppDispatch } from '@/state'
import { setShowDSL } from '@/state/dsl/reducer'

export default function LeveragedApps() {
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()

  const [showDappStore, setShowDappStore] = useState(false)

  const [dappList, setDappList] = useState([
    {
      name: 'Uniswap V3',
      // icon: 'shovel',
      id: 'uniswap',
      title: 'Uniswap V3 - Leveraged LP',
      link: '/leveragedapps/uniswapv3',
    },
    {
      name: 'Spark Protocol',
      title: 'Spark Protocol - Leveraged Lending',
      id: 'spark',
      image:
        'https://2799817246-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FjvdfbhgN5UCpMtP1l8r5%2Fuploads%2Fgit-blob-c029bb6c918f8c042400dbcef7102c4e5c1caf38%2Flogomark%20colour.svg?alt=media',
      link: '/leveragedapps/spark',
    },
    // {
    //   name: 'Velodrome V2',
    //   title: 'Velodrome V2 - Leveraged LP',
    //   link: '/leveragedapps/velodromev2',
    // },
  ])

  const dappTitle = useMemo(() => {
    return dappList.find((item) => pathname.indexOf(item.link) > -1)?.title
  }, [dappList, pathname])

  return (
    <div className="page-leveraged-apps">
      <IntentView />
      <Dialog open={showDappStore} onClose={() => setShowDappStore(false)} className="page-leveraged-apps-store">
        <h4>Dapp Store</h4>
        <p>
          Yield Farming <b>(Up to 7x)</b>
        </p>
        <div className="side-bar-app-list">
          <div className="side-bar-app-list-item side-bar-app-list-item-uniswap">
            <p>Uniswap V3</p>
          </div>
          <div className="side-bar-app-list-item side-bar-app-list-item-spark">
            <p>spark</p>
          </div>
        </div>
        <p>
          Trading <b>(Up to 7x)</b>
        </p>
        <div className="side-bar-app-list">
          <div className="side-bar-app-list-item side-bar-app-list-item-uniswap">
            <p>Uniswap V3</p>
          </div>
          <div className="side-bar-app-list-item side-bar-app-list-item-spark">
            <p>spark</p>
          </div>
        </div>
        <p>
          Earning <b>(Up to 7x)</b>
        </p>
        <div className="side-bar-app-list">
          <div className="side-bar-app-list-item side-bar-app-list-item-uniswap">
            <p>Uniswap V3</p>
          </div>
          <div className="side-bar-app-list-item side-bar-app-list-item-spark">
            <p>spark</p>
          </div>
        </div>
      </Dialog>
      <div className="side-bar">
        {/* <h2>Leveraged Apps</h2> */}
        <h4>My Apps</h4>
        <div className="side-bar-app-list">
          {dappList.map((dapp) => {
            return (
              <NavLink
                to={dapp.link}
                className={classNames('side-bar-app-list-item', `side-bar-app-list-item-${dapp.id}`)}
                key={dapp.name}
              >
                <p>{dapp.name}</p>
              </NavLink>
            )
          })}
          <div
            className="side-bar-app-list-item side-bar-app-list-item-add"
            key="add"
            onClick={() => setShowDappStore(true)}
          >
            <p>Add more</p>
          </div>
        </div>
      </div>
      <div className="dapp-wrapper">
        <button
          className="dapp-wrapper-intent-button btn-base"
          onClick={() => {
            dispatch(setShowDSL(true))
          }}
        >
          Describe your intent
        </button>
        <h3 className="dapp-wrapper-title">{dappTitle}</h3>
        <div className="dapp-wrapper-inner">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
