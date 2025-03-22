import { ToastContainer } from 'react-toastify'
import { styled } from '@mui/material/styles'
import 'react-toastify/dist/ReactToastify.css'

const Notification = () => {
   return (
      <StyledToastContainer
         position="top-right"
         closeOnClick
         draggable
         hideProgressBar
         limit={1}
      />
   )
}

export default Notification

const StyledToastContainer = styled(ToastContainer)({
   '.Toastify__toast': {
      minWidth: '612px',
      borderRadius: '2px',
      fontFamily: 'Inter, sans-serif',

      padding: '12px 28px 12px 28px',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',

      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
   },

   '.Toastify__toast-body': {
      padding: '16px',
      fontSize: '14px',
      fontWeight: 500,
   },

   '.Toastify__toast--success': {
      backgroundColor: '#F0FFF1',
      color: '#333',
   },

   '.Toastify__toast--error': {
      backgroundColor: '#FFEEEE',
      color: '#333',
   },
})
