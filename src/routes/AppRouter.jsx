import { Routes, Route, Navigate } from 'react-router'
import { lazy, Suspense } from 'react'

const UserLayout = lazy(() => import('../layout/user/UserLayout'))
const AdminLayout = lazy(() => import('../layout/admin/AdminLayout'))
const AllHousing = lazy(() => import('../pages/admin/all-housing/AllHousing'))
const Users = lazy(() => import('../pages/admin/users/Users'))
const UserDetail = lazy(() => import('../components/admin/users/UserDetail'))
const ResetPassword = lazy(
   () => import('../pages/reset-password/ResetPassword')
)
const NotFound = lazy(() => import('../pages/NotFound'))
const LandingPage = lazy(() => import('../pages/home/LandingPage'))
const Region = lazy(() => import('../pages/user/region/Region'))
const UserProfile = lazy(() => import('../pages/user/profile/Profile'))
const UserAnnouncement = lazy(
   () => import('../pages/user/anouncement/UserAnnouncement')
)

import PrivateRoute from './PrivateRoute'
import Loading from '../pages/Loading'
import { ROLES, ROUTES } from './routes'

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
         <Route index element={<Navigate to="region" />} />

         <Route
            path="region"
            element={
               <Suspense fallback={<Loading />}>
                  <Region />
               </Suspense>
            }
         />

         <Route
            path="profile"
            element={
               <Suspense fallback={<Loading />}>
                  <UserProfile />
               </Suspense>
            }
         />

         <Route
            path="announcement/:id"
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
            path={ROUTES.ADMIN.USERS}
            element={
               <Suspense fallback={<Loading />}>
                  <Users />
               </Suspense>
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

         <Route
            path={ROUTES.ADMIN.USER_DETAIL}
            element={
               <Suspense fallback={<Loading />}>
                  <UserDetail />
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
