import { useSelector } from 'react-redux'
import { Outlet } from 'react-router'
import UserHeader from './UserHeader'

const UserLayout = () => {
   const isAuth = useSelector((state) => state.auth.isAuth)

   return (
      <>
         <UserHeader isAuth={isAuth} />
         <Outlet />
      </>
   )
}

export default UserLayout
