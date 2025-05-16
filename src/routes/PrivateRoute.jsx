import { Navigate } from 'react-router'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ roles, Component, fallbackPath }) => {
   const role = useSelector((state) => state.auth.role)

   const allowedRole = roles.includes(role)

   if (!allowedRole) {
      return <Navigate to={fallbackPath} />
   }

   return Component
}
export default PrivateRoute
