import './index.scss'

// import { ConnectButton } from '@rainbow-me/rainbowkit'
import classNames from 'classnames'
import { toArray } from 'lodash'
import { useEffect } from 'react'
import { NavLink, Outlet, useSearchParams } from 'react-router-dom'

import ScrollToTop from '@/components/ScrollToTop'
import useDeviceDetect from '@/hooks/useDeviceDetect'
import useSmartAccount from '@/hooks/useSmartAccount'
import useLendingList from '@/pages/Lend/useLendingList'
import { useAccountStore } from '@/store'

import AccountLayer from '../AccountLayer'
import { useWagmiCtx } from '../WagmiContext'
import CustomConnectButton from './ConnectButton'
import NetworthList from './NetworthList'

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
  const { account, chainId } = useWagmiCtx()
  const { accounts, currentAccount, formattedUserPosition, fetchUsersReserves, fetchUserReserves, getInitData: getInitSmartAccountData } = useSmartAccount()

  const nameList = JSON.parse(localStorage.getItem('extrax-account-name') || `{}`)
  const accountName = nameList[currentAccount?.toLowerCase()] || 'Account 0'

  useEffect(() => {
    getInitSmartAccountData()
  }, [getInitSmartAccountData])

  useEffect(() => {
    fetchPoolState()
  }, [fetchPoolState])

  // useEffect(() => {
  //   fetchUserReserves(currentAccount, chainId)
  // }, [chainId, currentAccount, fetchUserReserves])

  // useEffect(() => {
  //   if (!account) {
  //     return
  //   }
  //   fetchUsersReserves([account, ...accounts], chainId)
  // }, [chainId, accounts, fetchUsersReserves, account])

  useEffect(() => {
    console.log('formattedUserPosition :>> ', formattedUserPosition)
  }, [formattedUserPosition])

  const isEOA = !toArray(accounts as any || []).includes(currentAccount as `0x${string}`)

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
              if (isEOA) {
                updateAccountLayer(true)
              }
            }}
          >
            {isEOA && <div className='nav-shine-button-inner'>✨ Try Smart Account ✨</div>}
            {!isEOA && 
              <div className='nav-shine-button-inner'>{`Accounts > ${accountName}`}
                <NetworthList />
              </div>
            }
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
