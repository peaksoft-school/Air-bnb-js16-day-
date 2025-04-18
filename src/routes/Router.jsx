import { BrowserRouter as Router, Routes as Ruotem, Route } from 'react-router'

import MainLayout from '../layout/MainLayout'

import LoginPage from '../pages/LoginPage'

import PrivateRoute from './PrivateRoute'

const Routes = () => {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<MainLayout />}>
               <Route path="login" element={<LoginPage />} />
            </Route>
         </Routes>
      </Router>
   )
}

export default Routes
