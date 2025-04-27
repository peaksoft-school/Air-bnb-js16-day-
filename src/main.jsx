import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Notification from './components/Notification.jsx'
import Themes from './components/Themes.jsx'
import { injectStore } from './configs/axiosInstance.js'
import { persistor, store } from './store/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

injectStore(store)

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <Provider store={store}>
         <PersistGate persistor={persistor}>
            <Themes>
               <App />
               <Notification />
            </Themes>
         </PersistGate>
      </Provider>
   </StrictMode>
)
