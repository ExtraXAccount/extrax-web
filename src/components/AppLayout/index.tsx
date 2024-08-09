import './index.scss'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import classNames from 'classnames'
import { useEffect } from 'react'
import { NavLink, Outlet, useSearchParams } from 'react-router-dom'

import ScrollToTop from '@/components/ScrollToTop'
import useDeviceDetect from '@/hooks/useDeviceDetect'
import useSmartAccount from '@/hooks/useSmartAccount'
import useLendingList from '@/pages/Lend/useLendingList'
import lendingData from '@/sdk/lend-deprecated/mock.json'
import { getCoingeckoPriceByIds } from '@/sdk/utils/coingecko'
import { useAppDispatch } from '@/state'
import { setLendingStatus } from '@/state/lending/reducer'
import { setPrices } from '@/state/price/reducer'
import { useAccountStore } from '@/store'

import AccountLayer from '../AccountLayer'

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

  const dispatch = useAppDispatch()

  const { fetchLendPools } = useLendingList()
  const { getInitData: getInitSmartAccountData } = useSmartAccount()

  useEffect(() => {
    getInitSmartAccountData()
  }, [getInitSmartAccountData])

  useEffect(() => {
    fetchLendPools()
  }, [fetchLendPools])

  useEffect(() => {
    dispatch(setLendingStatus(lendingData))

    const getPrices = async () => {
      const priceMap = {
        'USDC.e': 1,
        USDC: 1,
        USDT: 1,
      }
      try {
        const result = await getCoingeckoPriceByIds(lendingData.map((i) => i.cgId))

        // console.log('getCoingeckoPriceByIds :>> ', result)
        lendingData.forEach((i) => {
          if (result[i.cgId]?.usd) {
            priceMap[i.tokenSymbol] = result[i.cgId].usd
          }
        })
        dispatch(setPrices(priceMap))
      } catch (err) {
        dispatch(
          setPrices({
            'USDC.e': 1,
            USDC: 1,
            USDT: 1,
            OP: 2,
            WETH: 3000,
          }),
        )
        console.warn(err)
      }
    }

    getPrices()
  }, [dispatch])

  return (
    <div
      className={classNames('App', {
        mobile: isMobile,
      })}
    >
      <ScrollToTop />
      <AccountLayer />

      <div className="top-bar">
        <div className="nav-logo-top">
          <i className="nav-logo-image"></i>
        </div>
        <div className="nav-menu">
          {navList.map((i) => {
            return !i.isExternal ? (
              <NavLink
                to={i.link + '?' + searchParams.toString()}
                className="nav-menu-item"
                key={i.name}
              >
                <p>{i.name}</p>
              </NavLink>
            ) : (
              <a
                key={i.name}
                href={i.link}
                target="_blank"
                rel="noopener noreferrer"
                className={classNames('nav-menu-item', {})}
              >
                {i.name}
                <i className="iconfont icon-external-link" style={{ marginLeft: 2 }}></i>
              </a>
            )
          })}
        </div>
        <div className="nav-right flex ai-ct gap-4">
          <button
            className="btn-base"
            onClick={() => {
              updateAccountLayer(true)
            }}
          >
            Main Account
          </button>
          <ConnectButton
            accountStatus="address"
            // accountStatus={{
            //   smallScreen: 'avatar',
            //   largeScreen: 'full',
            // }}
            showBalance={false}
          />
          {/* <DarkMode /> */}
        </div>
      </div>

      <div className={classNames('page-content')}>
        <div className="page-content-inner">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
