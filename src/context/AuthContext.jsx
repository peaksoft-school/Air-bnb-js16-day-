import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState({
      isAuthenticated: false,
      role: null,
      token: null,
   })

   useEffect(() => {
      const storedAuth = localStorage.getItem('auth')
      if (storedAuth) {
         setUser(JSON.parse(storedAuth))
      }
   }, [])

   return (
      <AuthContext.Provider value={{ user, setUser }}>
         {children}
      </AuthContext.Provider>
   )
}

export const useAuth = () => useContext(AuthContext)
