// const App = () => <h1>Airbnb Front js-16</h1>

import { useDispatch } from 'react-redux'
import { AUTH_THUNK } from './store/slices/auth/authThunk'
import Intro from "./pages/Intro"
// export default App

export default function App() {
   const dispatch = useDispatch()

   const Onsubmit = () => {
      const values = {
         firstName: 'ПРоверка',
         lastName: 'ПРоверка',
         email: 'use@gmail.com',
         password: '123HGHdsf23f',
      }
      dispatch(AUTH_THUNK.singUp({ values }))
   }

   return (
      <div>
     <Intro />
      </div>
   )
}
