import { Routes, Route } from 'react-router'
import { lazy, Suspense } from 'react'

const UserLayout = lazy(() => import('../layout/user/UserLayout'))
const AdminLayout = lazy(() => import('../layout/admin/AdminLayout'))
const ResetPassword = lazy(() => import('../pages/reset-password/ResetPassword'))
const NotFound = lazy(() => import('../pages/NotFound'))
const LandingPage = lazy(() => import('../pages/home/LandingPage'))
const Region = lazy(() => import('../pages/user/region/Region'))
const UserAnnouncement = lazy(() => import('../pages/user/announcement/UserAnnouncement'))

import PrivateRoute from './PrivateRoute'
import Loading from '../pages/Loading'
import { ROLES, ROUTES } from './routes'
import AllHousing from '../pages/admin/AllHousing'

const AppRouter = () => (
   <Routes>
      <Route
         path="/"
         element={
            <PrivateRoute
               roles={[ROLES.GUEST, ROLES.USER]}
               Component={
                  <Suspense fallback={<Loading />}>
                     <LandingPage />
                  </Suspense>
               }
               fallbackPath={ROUTES.ADMIN.INDEX}
            />
         }
      />

      <Route
         path={ROUTES.USER.INDEX}
         element={
            <PrivateRoute
               roles={[ROLES.USER]}
               Component={
                  <Suspense fallback={<Loading />}>
                     <UserLayout />
                  </Suspense>
               }
               fallbackPath={'/'}
            />
         }
      >
         <Route
            index
            element={
               <Suspense fallback={<Loading />}>
                  <Region />
               </Suspense>
            }
         />
         <Route 
            path={ROUTES.USER.ANNOUNCEMENT_DETAIL} 
            element={
               <Suspense fallback={<Loading />}>
                  <UserAnnouncement />
               </Suspense>
            } 
         />
      </Route>

      <Route
         path={ROUTES.ADMIN.INDEX}
         element={
            <PrivateRoute
               roles={[ROLES.ADMIN]}
               Component={
                  <Suspense fallback={<Loading />}>
                     <AdminLayout />
                  </Suspense>
               }
               fallbackPath={'/'}
            />
         }
      >
         <Route
            index
            path={ROUTES.ADMIN.APPLICATION}
            element={
               <div>
                  <h1>application</h1>
               </div>
            }
         />

         <Route
            path={ROUTES.ADMIN.ALLHOUSING}
            element={
               <Suspense fallback={<Loading />}>
                  <AllHousing />
               </Suspense>
            }
         />
      </Route>

      <Route
         path={ROUTES.AUTH.RESET_PASSWORD}
         element={
            <Suspense fallback={<Loading />}>
               <ResetPassword />
            </Suspense>
         }
      />

      <Route
         path="*"
         element={
            <Suspense fallback={<Loading />}>
               <NotFound />
            </Suspense>
         }
      />
   </Routes>
)

export default AppRouter