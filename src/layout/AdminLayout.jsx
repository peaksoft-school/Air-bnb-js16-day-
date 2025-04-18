import { Outlet } from 'react-router'
import AdminHeader from './headers/admin/AdminHeader'
const AdminLayout = () => {
   return (
      <>
         <AdminHeader />
         <Outlet />
      </>
   )
}

export default AdminLayout
