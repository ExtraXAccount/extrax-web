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
    name: 'Farm',
    icon: 'shovel',
    link: '/farm',
  },
  {
    name: 'Lend',
    icon: 'lending',
    link: '/lend',
  },
  {
    name: 'UniV3Lyf',
    // icon: 'lock',
    link: '/univ3lyf',
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
        <div className="nav">
          <div className="nav-logo-top">
            <i className="nav-logo-tag">Extra-X</i>
          </div>
          <div className="side-nav">
            {navList.map((i) => {
              return (
                <NavLink to={i.link + '?' + searchParams.toString()} className="side-nav-item" key={i.name}>
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
