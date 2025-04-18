import { Navigate, Outlet } from 'react-router'

const PrivateRoute = ({ isAuthenticated, allowedRoles = [], userRole }) => {
   if (!isAuthenticated) return <Navigate to="/login" />
   if (allowedRoles.length && !allowedRoles.includes(userRole)) {
      return <Navigate to="/unauthorized" />
   }
   return <Outlet />
}

export default PrivateRoute
