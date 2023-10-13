import './App.scss'
import './styles/index.scss'

import { ConfigProvider } from 'antd/es'
import { Navigate, Route, Routes } from 'react-router-dom'

import RainbowContextApp from '@/components/RainbowKit'

import AppLayout from './components/AppLayout'
import Farm from './pages/Farm'
import Lend from './pages/Lend'
import UniV3LYF from './pages/UniV3LYF'

function App() {
  // const theme = useTheme()

  return (
    <ConfigProvider>
      <RainbowContextApp>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="farm" element={<Farm />}></Route>
            <Route path="univ3lyf" element={<UniV3LYF />}></Route>
            <Route path="lend" element={<Lend />}></Route>
            <Route path="*" element={<Navigate to="/farm" replace />} />
          </Route>
        </Routes>
      </RainbowContextApp>
    </ConfigProvider>
  )
}

export default App
