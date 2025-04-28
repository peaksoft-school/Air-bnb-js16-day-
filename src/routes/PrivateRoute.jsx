import { Navigate } from 'react-router'

const PrivateRoute = ({ roles, Component, fallbackPath }) => {
   const role = 'USER'

   const allowedRole = roles.includes(role)

   if (!allowedRole) {
      return <Navigate to={fallbackPath} />
   }

   return Component
}
export default PrivateRoute
