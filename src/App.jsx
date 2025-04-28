import { useDispatch } from 'react-redux'
import { AUTH_THUNK } from './store/slices/auth/authThunk'
import Intro from './pages/Intro'

import AppRoutes from './routes/AppRouter'

const App = () => <AppRoutes />
