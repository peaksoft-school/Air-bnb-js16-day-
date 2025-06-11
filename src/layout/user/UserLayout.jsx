import { useSelector } from 'react-redux'
import { Outlet } from 'react-router'
import UserHeader from './UserHeader'
import { useNavigate } from 'react-router'

const UserLayout = () => {
   const navigate = useNavigate()
   const { isAuth } = useSelector((state) => state.auth.isAuth)
   const handleLeaveAddClick = () => {
      navigate('/user/create-house')
   }
   return (
      <>
         <UserHeader
            isAuth={isAuth}
            handleLeaveAddClick={handleLeaveAddClick}
         />
         <Outlet />
      </>
   )
}

export default UserLayout
