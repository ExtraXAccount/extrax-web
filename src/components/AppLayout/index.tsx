import './index.scss'

import { ConnectButton } from '@rainbow-me/rainbowkit'
// import { Dropdown, MenuProps } from 'antd'
import classNames from 'classnames'
import { Link, NavLink, Outlet, useLocation, useParams, useSearchParams } from 'react-router-dom'

import ScrollToTop from '@/components/ScrollToTop'
import useDeviceDetect from '@/hooks/useDeviceDetect'

import AccountInfo from './AccountInfo'

const navList = [
  {
    name: 'Leveraged Apps',
    icon: 'shovel',
    link: '/leveragedapps/uniswapv3',
  },
  {
    name: 'Lend',
    icon: 'lending',
    link: '/lend',
  },
  {
    name: 'My Positions',
    // icon: 'lock',
    link: '/positions',
  },
]

export default function AppLayout() {
  const [searchParams] = useSearchParams()
  const { isMobile } = useDeviceDetect()

  return (
    <div
      className={classNames('App', {
        mobile: isMobile,
      })}
    >
      <ScrollToTop />

      <div className="top-bar">
        <div className="nav-logo-top">
          <i className="nav-logo-tag">Extra-X</i>
        </div>
        <div className="nav-menu">
          {navList.map((i) => {
            return (
              <NavLink to={i.link + '?' + searchParams.toString()} className="nav-menu-item" key={i.name}>
                <p>{i.name}</p>
              </NavLink>
            )
          })}
        </div>
        <div className="nav-right flex ai-ct">
          <ConnectButton
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'full',
            }}
            showBalance={false}
          />
          {/* <DarkMode /> */}
        </div>
      </div>

      <AccountInfo />
      <div className={classNames('page-content')}>
        <div className="page-content-inner">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
