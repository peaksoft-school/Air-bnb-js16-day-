import { showToast } from './utils/helpers/showToast'

const App = () => (
   <>
      <button
         onClick={() =>
            showToast({
               title: 'hello',
               message: 'hi',
               type: 'error',
               autoClose: 2000,
            })
         }
      >
         click
      </button>
   </>
)

export default App
