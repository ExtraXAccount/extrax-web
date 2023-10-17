import './App.scss'
import './styles/index.scss'

import { ConfigProvider } from 'antd/es'
import { Navigate, Route, Routes } from 'react-router-dom'

import RainbowContextApp from '@/components/RainbowKit'

import AppLayout from './components/AppLayout'
import Intent from './pages/Intent'
import Lend from './pages/Lend'
import LeveragedApps from './pages/LeveragedApps'
import Positions from './pages/Positions'
import UniV3LYF from './pages/UniV3LYF'

function App() {
  // const theme = useTheme()

  return (
    <ConfigProvider>
      <RainbowContextApp>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="leveragedapps" element={<LeveragedApps />}>
              <Route path="uniswapv3/:poolId" element={<UniV3LYF />}></Route>
              <Route path="uniswapv3" element={<UniV3LYF />}></Route>

              <Route path="velodromev2/:poolId" element={<UniV3LYF />}></Route>
              <Route path="velodromev2" element={<UniV3LYF />}></Route>
            </Route>
            {/* <Route path="univ3lyf" element={<UniV3LYF />}></Route> */}
            <Route path="lend" element={<Lend />}></Route>
            <Route path="positions" element={<Positions />}></Route>
            <Route path="intent" element={<Intent />}></Route>
            <Route path="*" element={<Navigate to="/lend" replace />} />
          </Route>
        </Routes>
      </RainbowContextApp>
    </ConfigProvider>
  )
}

export default App
