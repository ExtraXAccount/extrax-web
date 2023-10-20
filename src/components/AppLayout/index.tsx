import './index.scss'

import { ConnectButton } from '@rainbow-me/rainbowkit'
// import { Dropdown, MenuProps } from 'antd'
import classNames from 'classnames'
import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation, useParams, useSearchParams } from 'react-router-dom'

import ScrollToTop from '@/components/ScrollToTop'
import useDeviceDetect from '@/hooks/useDeviceDetect'
import lendingData from '@/sdk/lend/mock.json'
import { getCoingeckoPriceByIds } from '@/sdk/utils/coingecko'
import { useAppDispatch, useAppSelector } from '@/state'
import { setLendingStatus } from '@/state/lending/reducer'
import { setPrices } from '@/state/price/reducer'

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
  // const lendingList = useAppSelector((state) => state.lending.poolStatus)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setLendingStatus(lendingData))

    const getPrices = async () => {
      const priceMap = {}
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

      <div className="top-bar">
        <div className="nav-logo-top">
          <i className="nav-logo-image"></i>
          {/* <i className="nav-logo-tag">Extra-X</i> */}
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
