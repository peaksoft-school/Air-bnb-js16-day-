import { Routes, Route } from 'react-router'
import { lazy, Suspense } from 'react'

const UserLayout = lazy(() => import('../layout/user/UserLayout'))
const AdminLayout = lazy(() => import('../layout/admin/AdminLayout'))

const SignUp = lazy(() => import('../pages/sing-up/SignUp'))
const NotFound = lazy(() => import('../pages/NotFound'))
const LandingPage = lazy(() => import('../pages/LandingPage'))

import PrivateRoute from './PrivateRoute'
import SuspenseLoader from '../pages/SuspenseLoader'
import { ROLES, royteBreadCrumbs } from '../utils/constants/routeBreadCrumbs'

const AppRoutes = () => {
   return (
      <Routes>
         <Route
            path="/"
            element={
               <PrivateRoute
                  roles={[ROLES.GUEST, ROLES.USER]}
                  Component={
                     <Suspense fallback={<SuspenseLoader />}>
                        <LandingPage />
                     </Suspense>
                  }
                  fallbackPath={royteBreadCrumbs.ADMIN.INDEX}
               />
            }
         />
         <Route path="/sign-up" element={<SignUp />} />

         <Route
            path={royteBreadCrumbs.USER.INDEX}
            element={
               <PrivateRoute
                  roles={[ROLES.USER]}
                  Component={
                     <Suspense fallback={<SuspenseLoader />}>
                        <UserLayout />
                     </Suspense>
                  }
                  fallbackPath={'/'}
               />
            }
         >
            <Route index element={<div>Welcome to User Page</div>} />
         </Route>

         <Route
            path={royteBreadCrumbs.ADMIN.INDEX}
            element={
               <PrivateRoute
                  roles={[ROLES.ADMIN]}
                  Component={
                     <Suspense fallback={<SuspenseLoader />}>
                        <AdminLayout />
                     </Suspense>
                  }
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
