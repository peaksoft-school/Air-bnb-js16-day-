import { toast } from 'react-toastify'

const showToast = ({ title, message, autoClose = 5000, type = 'type' }) => {
   toast[type](
      <div>
         <strong>{title}</strong>
         <p>{message}</p>
      </div>,
      {
         autoClose,
         icon: false,
      }
   )
}

export { showToast }
