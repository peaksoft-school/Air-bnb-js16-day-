import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Notification from './components/Notification.jsx'

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <App />
      <Notification />
   </StrictMode>
)
