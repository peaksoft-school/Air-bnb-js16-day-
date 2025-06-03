import { toast } from 'react-toastify'
import { styled } from '@mui/material'

const showToast = ({ title, message, autoClose = 5000, type = 'type' }) => {
   toast[type](
      <ToastContent>
         <strong>{title}</strong>
         <p>{message}</p>
      </ToastContent>,
      {
         autoClose,
         icon: false,
      }
   )
}

export { showToast }

const ToastContent = styled('div')({
   display: 'flex',
   flexDirection: 'column',
   gap: 8,
})
