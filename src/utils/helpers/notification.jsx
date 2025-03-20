import { toast } from 'react-toastify'

const succesToast = ({ autoClose = 2000, type = 'type' }) => {
   toast[type](
      <div>
         <strong>Booked :)</strong>
         <p>The house was successfully booked</p>
      </div>,
      {
         autoClose,
         icon: false,
      }
   )
}

const wrongToast = ({ autoClose = 2000, type = 'type' }) => {
   toast[type](
      <div>
         <strong>Uh oh! Something went wrong :(</strong>
         <p>
            We either couldn't find anything matching your search or have
            encountered an error. If you're searching for a unique location, try
            searching again with more common keywords.
         </p>
      </div>,
      {
         autoClose,
         icon: false,
      }
   )
}

export { wrongToast, succesToast }
