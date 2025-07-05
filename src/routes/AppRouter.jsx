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

import PrivateRoute from './PrivateRoute'
import Loading from '../pages/Loading'
import { ROLES, ROUTES } from './routes'
import AnnouncementDetailPage from '../pages/user/announcement/AnnouncementDetailPage'

import AnnouncementHouse from '../pages/admin/user-page/AnnouncementHouse'
import Application from '../pages/admin/user-page/Application'
import AppicationHouse from '../pages/admin/user-page/AppicationHouse'

const AppRoutes = () => (
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
            path="/user/profile"
            element={
               <Suspense fallback={<Loading />}>
                  <UserProfile />
               </Suspense>
            }
         />
         <Route
            path="/user/profile/announcement/:id"
            element={
               <Suspense fallback={<Loading />}>
                  <AnnouncementDetailPage />
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
               <Suspense fallback={<Loading />}>
                  <Application />
               </Suspense>
            }
         />

         <Route
            index
            path={ROUTES.ADMIN.APPLICATION_BY_ID}
            element={
               <Suspense fallback={<Loading />}>
                  <AppicationHouse />
               </Suspense>
            }
         />

         <Route
            path={ROUTES.ADMIN.USEER_ANNOUNCMENT_BY_ID}
            element={
               <Suspense fallback={<Loading />}>
                  <AnnouncementHouse />
               </Suspense>
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
            path={ROUTES.ADMIN.USER_DETAIL}
            element={
               <Suspense fallback={<Loading />}>
                  <UserDetail />
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

export default AppRoutes
