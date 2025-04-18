import { Outlet, useNavigate } from 'react-router'
import Header from './headers/Header'

const MainLayout = () => {
   const navigate = useNavigate()
   const navigateToJoinUs = () => {
      navigate('/login')
   }

   return (
      <>
         <Header onJoinUs={navigateToJoinUs} />
         <Outlet />
      </>
   )
}

export default MainLayout
