import { Outlet } from 'react-router'
import UserHeader from './headers/user/UserHeader'

const UserLayout = () => {
   return (
      <>
         <UserHeader />
         <Outlet />
      </>
   )
}

export default UserLayout
