import { Outlet } from 'react-router'
import UserHeader from './UserHeader'

const UserLayout = () => {
   return (
      <>
         <UserHeader />
         <Outlet />
      </>
   )
}

export default UserLayout
