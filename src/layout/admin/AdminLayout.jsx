import { Navigate, Outlet, useLocation } from 'react-router'
import AdminHeader from './AdminHeader'
import { Box, styled } from '@mui/material'

const AdminLayout = () => {
   const location = useLocation()

   if (location.pathname === '/admin') {
      return <Navigate to="/admin/application" replace />
   }

   return (
      <StyledContainer>
         <AdminHeader />

         <Box className="content">
            <Outlet />
         </Box>
      </StyledContainer>
   )
}

export default AdminLayout

const StyledContainer = styled(Box)(() => ({
   backgroundColor: '#F7F7F7',
   width: '100%',
   height: '100vh',
   maxHeight: '100%',

   '& .content': {
      padding: '46px 40px',
   },
}))
