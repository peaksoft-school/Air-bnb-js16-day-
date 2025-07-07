import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router'
import UserHeader from './UserHeader'
<<<<<<< HEAD
import { useNavigate } from 'react-router'

const UserLayout = () => {
   const navigate = useNavigate()
   const isAuth = useSelector((state) => state.auth.isAuth)
   const handleLeaveAddClick = (e) => {
      e.stopPropagation()
      navigate('/user/create-house')
   }
=======
import { getFavorites } from '../../store/slices/user/favorite/favoriteThunk'

const UserLayout = () => {
   const dispatch = useDispatch()
   const isAuth = useSelector((state) => state.auth.isAuth)

   useEffect(() => {
      if (isAuth) {
         dispatch(getFavorites())
      }
   }, [isAuth, dispatch])

>>>>>>> development
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
