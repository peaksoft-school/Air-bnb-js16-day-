import { Navigate, Outlet, useLocation } from 'react-router'
import AdminHeader from './AdminHeader'

const AdminLayout = () => {
   const location = useLocation()

   if (location.pathname === '/admin') {
      return <Navigate to="/admin/application" replace />
   }

   return (
      <>
         <AdminHeader />
         <Outlet />
      </>
   )
}

export default AdminLayout
