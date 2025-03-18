import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const wrongToast = (message, type = 'error') => {
   toast[type](
      <div style={{ padding: '28px 12px 28px 12px' }}>
         <strong style={{ paddingTop: '1rem' }}>
            Uh oh! Something went wrong :(
         </strong>

         <p>
            We either couldn't find anything matching your search or have
            encountered an error. If you're searching for a unique location, try
            searching again with more common keywords.
         </p>
      </div>,
      {
         position: 'top-center',
         autoClose: 5000,
         closeOnClick: true,
         draggable: true,
         hideProgressBar: true,
         icon: false,
         style: {
            background: '#ffeeee',
            color: '#333',
            minWidth: '612px',
            height: '100px',
            borderRadius: '5px',
         },
      }
   )
}

const correctToast = (message, type = 'success') => {
   toast[type](
      <div style={{ padding: '28px 12px 28px 12px' }}>
         <strong style={{ paddingTop: '1rem' }}>Booked :)</strong>

         <p>The house was successfully booked</p>
      </div>,
      {
         position: 'top-center',
         autoClose: 5000,
         closeOnClick: true,
         draggable: true,
         hideProgressBar: true,
         icon: false,
         style: {
            background: '#F0FFF1',
            color: '#333',
            minWidth: '612px',
            height: '66px',
            borderRadius: '5px',
         },
      }
   )
}

const Toastify = () => {
   return <ToastContainer />
}

export { correctToast, wrongToast, Toastify }
