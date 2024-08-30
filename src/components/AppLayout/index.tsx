import './index.scss'

// import { ConnectButton } from '@rainbow-me/rainbowkit'
import classNames from 'classnames'
import { useEffect } from 'react'
import { NavLink, Outlet, useSearchParams } from 'react-router-dom'

import ScrollToTop from '@/components/ScrollToTop'
import useDeviceDetect from '@/hooks/useDeviceDetect'
import useSmartAccount from '@/hooks/useSmartAccount'
import useLendingList from '@/pages/Lend/useLendingList'
import { useAccountStore } from '@/store'

import AccountLayer from '../AccountLayer'
import CustomConnectButton from './ConnectButton'

const navList = [
  // {
  //   name: 'Leverage Apps',
  //   link: '/leveragedapps/uniswapv3',
  // },
  {
    name: 'Borrow / Lend',
    link: '/lend',
  },
  {
    name: 'Portfolio',
    link: '/portfolio',
  },
  {
    name: 'ExtraFi (Farm / Lend)',
    isExternal: true,
    link: 'https://app.extrafi.io',
  },
]

export default function AppLayout() {
  const [searchParams] = useSearchParams()
  const { isMobile } = useDeviceDetect()
  const { updateAccountLayer } = useAccountStore()

  const { fetchPoolState } = useLendingList()
  const { formattedUserPosition, getInitData: getInitSmartAccountData } = useSmartAccount()

  useEffect(() => {
    getInitSmartAccountData()
  }, [getInitSmartAccountData])

  useEffect(() => {
    fetchPoolState()
  }, [fetchPoolState])

  useEffect(() => {
    console.log('formattedUserPosition :>> ', formattedUserPosition)
  }, [formattedUserPosition])

  return (
    <div
      className={classNames('App', {
        mobile: isMobile,
      })}
    >
      <ScrollToTop />
      <AccountLayer />

      <div className='top-bar'>
        <div className='nav-logo-top'>
          <i className='nav-logo-image'></i>
        </div>
        <div className='nav-menu'>
          {navList.map((i) => {
            return !i.isExternal ? (
              <NavLink
                to={i.link + '?' + searchParams.toString()}
                className='nav-menu-item'
                key={i.name}
              >
                <p>{i.name}</p>
              </NavLink>
            ) : (
              <a
                key={i.name}
                href={i.link}
                target='_blank'
                rel='noopener noreferrer'
                className={classNames('nav-menu-item', {})}
              >
                {i.name}
                <i className='iconfont icon-external-link' style={{ marginLeft: 2 }}></i>
              </a>
            )
          })}
        </div>
        <div className='nav-right flex ai-ct gap-8'>
          <button
            className='nav-shine-button'
            onClick={() => {
              updateAccountLayer(true)
            }}
          >
            <div className='nav-shine-button-inner'>✨ Try Smart Account ✨</div>
          </button>
          <CustomConnectButton />
          {/* <DarkMode /> */}
        </div>
      </div>

      <div className={classNames('page-content')}>
        <div className='page-content-inner'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
