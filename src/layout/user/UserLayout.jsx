import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router'
import UserHeader from './UserHeader'
import { getFavorites } from '../../store/slices/user/favorite/favoriteThunk'

const UserLayout = () => {
   const dispatch = useDispatch()
   const isAuth = useSelector((state) => state.auth.isAuth)

   useEffect(() => {
      if (isAuth) {
         dispatch(getFavorites())
      }
   }, [isAuth, dispatch])

   return (
      <>
         <UserHeader isAuth={isAuth} />
         <Outlet />
      </>
   )
}

export default UserLayout
