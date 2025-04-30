// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Notification from './components/Notification.jsx'
import Themes from './components/Themes.jsx'
import { Provider } from 'react-redux'

import store from './store/store.js'
import { injectStore } from './store/slice/axiosInstance.js'

injectStore(store)

createRoot(document.getElementById('root')).render(
   // <StrictMode>
   <Provider store={store}>
      <Themes>
         <App />
         <Notification />
      </Themes>
   </Provider>
   // </StrictMode>
)
