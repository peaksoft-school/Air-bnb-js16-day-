import { Routes, Route } from 'react-router'
import Main from '../pages/Main'
import Next from '../pages/Next'
import Hotel from '../pages/Hotel'
import Profile from '../pages/Profile'
import Name from '../pages/Name'

const Router = () => (
   <Routes>
      <Route path="/main" element={<Main />}>
         <Route index element={<Main />} />
         <Route path="/main" element={<Next />} />
         <Route path="/main" element={<Hotel />} />
         <Route path="/main" element={<Profile />} />
         <Route path="/main" element={<Name />} />
      </Route>
   </Routes>
)

export default Router
