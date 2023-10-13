import './index.scss'

import { notification } from 'antd/es'
import ReactDOM from 'react-dom/client'
// import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

// import store from '@/state'
import isSystemThemeDark from '@/utils/theme'

import App from './App'
import reportWebVitals from './reportWebVitals'

notification.config({
  placement: 'bottomLeft',
  duration: 10,
})

// check mode
// const themeMode = localStorage.getItem('extra_theme_mode') || (isSystemThemeDark() ? '2' : '1')
// if (themeMode === '2') {
//   document.body.classList.add('dark')
//   document.documentElement.classList.add('dark')
// }

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    {/* <Provider store={store}> */}
    <App />
    {/* </Provider> */}
  </BrowserRouter>
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
