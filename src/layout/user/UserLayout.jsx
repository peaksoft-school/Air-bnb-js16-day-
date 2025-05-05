import { Outlet } from 'react-router'
import UserHeader from './UserHeader'
import { useSelector } from 'react-redux'


const UserLayout = () => {
   const isAuthenticated = useSelector((state) => state.auth.isAuth)
console.log(isAuthenticated)
   return (
      <>
         <UserHeader isAuthenticated={isAuthenticated}/>
         <Outlet />
      </>
   )
}

export default UserLayout
