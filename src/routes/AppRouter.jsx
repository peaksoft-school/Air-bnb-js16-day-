import { Routes, Route } from 'react-router'

import Intro from '../pages/Intro'

import UserLayout from '../layout/user/UserLayout'
import AdminLayout from '../layout/admin/AdminLayout'

import SignUp from '../pages/sing-up/SignUp'
import NotFound from '../pages/NotFound'
import PrivateRoute from './PrivateRoute'

const AppRoutes = () => {
   return (
      <Routes>
         <Route
            path="/"
            element={
               <PrivateRoute
                  roles={['GUEST', 'USER']}
                  Component={<Intro />}
                  fallbackPath={'/admin'}
               />
            }
         />
         <Route path="/sign-up" element={<SignUp />} />

         <Route
            path="/user"
            element={
               <PrivateRoute
                  roles={['USER']}
                  Component={<UserLayout />}
                  fallbackPath={'/'}
               />
            }
         >
            <Route index element={<div>Welcome to User Page</div>} />
         </Route>
        
         <Route
            path="/admin"
            element={
               <PrivateRoute
                  roles={['ADMIN']}
                  Component={<AdminLayout />}
                  fallbackPath={'/'}
               />
            }
         >
            <Route
               path="application"
               element={
                  <div>
                     <h1>application</h1>
                  </div>
               }
            />
            <Route
               path="users"
               element={
                  <div>
                     <h1>User Profile</h1>
                  </div>
               }
            />
            <Route
               path="allhousing"
               element={
                  <div>
                     <h1>allhousing</h1>
                  </div>
               }
            />
         </Route>

         <Route path="*" element={<NotFound />} />
      </Routes>
   )
}

export default AppRoutes
