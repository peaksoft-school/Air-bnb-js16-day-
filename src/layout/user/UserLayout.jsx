import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router'
import UserHeader from './UserHeader'
import { useNavigate } from 'react-router'
import { getFavorites } from '../../store/slices/user/favorite/favoriteThunk'

const UserLayout = () => {
   const isAuth = useSelector((state) => state.auth.isAuth)

   const navigate = useNavigate()
   const dispatch = useDispatch()

   const handleLeaveAddClick = (e) => {
      e.stopPropagation()

      navigate('/user/create-house')
   }

   useEffect(() => {
      if (isAuth) {
         dispatch(getFavorites())
      }
   }, [isAuth, dispatch])

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
