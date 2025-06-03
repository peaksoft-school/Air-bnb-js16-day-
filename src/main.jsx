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
import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter } from 'react-router'

injectStore(store)

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <GoogleOAuthProvider clientId="1048779211212-gk9cbg4p3jv6s6smv8mc8i7s7vdu3lvi.apps.googleusercontent.com">
         <Provider store={store}>
            <PersistGate persistor={persistor}>
               <BrowserRouter>
                  <Themes>
                     <App />

                     <Notification />
                  </Themes>
               </BrowserRouter>
            </PersistGate>
         </Provider>
      </GoogleOAuthProvider>
   </StrictMode>
)
