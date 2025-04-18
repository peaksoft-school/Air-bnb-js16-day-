// src/pages/LoginPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'

const LoginPage = () => {
   const [email, setEmail] = useState('')
   const [role, setRole] = useState('user')
   const { setUser } = useAuth()
   const navigate = useNavigate()

   const handleLogin = () => {
      const loggedUser = {
         isAuthenticated: true,
         role,
         token: '123abc456', // тут будет реальный токен
      }

      setUser(loggedUser)
      localStorage.setItem('auth', JSON.stringify(loggedUser))

      navigate(role === 'admin' ? '/admin' : '/user')
   }

   return (
      <div>
         <h2>Login</h2>
         <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
         />
         <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
         </select>
         <button onClick={handleLogin}>Login</button>
      </div>
   )
}

export default LoginPage
