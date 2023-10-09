import './index.scss'

import { ConnectButton } from '@rainbow-me/rainbowkit'
// import { Dropdown, MenuProps } from 'antd'
import classNames from 'classnames'
import { Link, NavLink, Outlet, useLocation, useParams, useSearchParams } from 'react-router-dom'

import ScrollToTop from '@/components/ScrollToTop'
import useDeviceDetect from '@/hooks/useDeviceDetect'

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
  // {
  //   name: 'Stake',
  //   icon: 'lock',
  //   link: '/staking',
  // },
  // {
  //   name: 'Swap',
  //   icon: 'exchange',
  //   link: '/swap',
  // },
  // {
  //   name: 'Calculator',
  //   icon: 'calculator',
  //   link: '/calculator',
  // },
  // {
  //   name: 'Portal',
  //   icon: 'internet',
  //   link: '/portal',
  // },
]

export default function AppLayout() {
  const location = useLocation()

  const { poolKey } = useParams()

  const [searchParams] = useSearchParams()
  const { isMobile } = useDeviceDetect()

  const isHome = ['/home'].includes(location.pathname)

  return (
    <div
      className={classNames('App', {
        mobile: isMobile,
        home: isHome,
      })}
    >
      <ScrollToTop />
      <div className="top-bar">
        <div className="nav">
          <Link className="nav-logo" to="/home">
            <div className="nav-logo-top">
              <i className="nav-logo-image"></i>
              {/* <i className="nav-logo-tag">Beta</i> */}
            </div>
            {/* <p className="nav-logo-slogan">Farm Extra, Harvest More</p> */}
          </Link>
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

      <div
        className={classNames('page-content', {
          'page-content-home': ['/home'].includes(location.pathname),
        })}
      >
        <div className="page-content-inner">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
