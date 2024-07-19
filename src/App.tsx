import './App.scss'
import './styles/index.scss'

import { ConfigProvider } from 'antd/es'
import { Navigate, Route, Routes } from 'react-router-dom'

import RainbowContextApp from '@/components/RainbowKit'

import AppLayout from './components/AppLayout'
// import FigmaLend from './pages/FigmaLend'
// import Intent from './pages/Intent'
import Lend from './pages/Lend'
import LendModal from './pages/Lend/LendModal'
import LeveragedApps from './pages/LeveragedApps'
import Spark from './pages/LeveragedApps/Spark'
import UniV3LYF from './pages/LeveragedApps/UniV3LYF'
import Velodrome from './pages/LeveragedApps/Velodrome'
import Positions from './pages/Positions'

function App() {
  return (
    <ConfigProvider>
      <RainbowContextApp>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="leveragedapps" element={<LeveragedApps />}>
              <Route path="uniswapv3/:poolId" element={<UniV3LYF />}></Route>
              <Route path="uniswapv3" element={<UniV3LYF />}></Route>
              <Route path="spark" element={<Spark />}></Route>
              <Route path="velodromev2" element={<Velodrome />}></Route>
            </Route>
            <Route path="lend" element={<Lend />}></Route>
            <Route path="lend/:marketId/:reserveId" element={<LendModal />}></Route>
            {/* <Route path="lend" element={<FigmaLend />}></Route> */}
            <Route path="portfolio" element={<Positions />}></Route>
            {/* <Route path="intent" element={<Intent />}></Route> */}
            <Route path="*" element={<Navigate to="/lend" replace />} />
          </Route>
        </Routes>
      </RainbowContextApp>
    </ConfigProvider>
  )
}

export default App
