// const App = () => <h1>Airbnb Front js-16</h1>

// export default App
// src/App.jsx
import { AuthProvider } from './context/AuthContext'
import AppRoutes from './routes/Router'

function App() {
   return (
      <AuthProvider>
         <AppRoutes />
      </AuthProvider>
   )
}

export default App
