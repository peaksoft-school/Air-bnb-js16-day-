import {
   Elements,
   CardElement,
   useStripe,
   useElements,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Box, Typography, styled } from '@mui/material'

const stripePromise = loadStripe(
   'pk_test_51REudZCZmUPb8AYPoDV0Re6ZVuJ0Oue4WQHAL0N6eO4h5DGld53emVHnlGCEcbt2QEIuxAbAtqSeDdPQ1ZE6ugQa00ZtHzSSem'
)
const CheckoutForm = ({
   totalAmount,
   onSuccess,
   onError,
   loading = false,
   disabled = false,
}) => {
   const stripe = useStripe()
   const elements = useElements()
   const handleSubmit = async (e) => {
      e.preventDefault()
      if (!stripe || !elements || loading || disabled) {
         return
      }
      const cardElement = elements.getElement(CardElement)
      try {
         const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
         })
         if (error) {
            onError?.(error.message)
         } else {
            onSuccess?.(paymentMethod)
         }
      } catch (err) {
         console.error('Payment error:', err)
         onError?.('Payment failed. Please try again.')
      }
   }
   return (
      <StyledForm onSubmit={handleSubmit}>
         <Typography variant="h5" className="form-title">
            Payment Details
         </Typography>
         <Typography variant="body1" className="total-amount">
            Total Amount: ${totalAmount.toFixed(2)}
         </Typography>
         <div className="card-element-container">
            <CardElement
               options={{
                  style: {
                     base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                           color: '#aab7c4',
                        },
                     },
                     invalid: {
                        color: '#9e2146',
                     },
                  },
               }}
            />
         </div>
         <StyledButton
            type="submit"
            disabled={!stripe || loading || disabled}
            className={loading ? 'loading' : ''}
         >
            {loading ? 'Processing...' : 'Pay Now'}
         </StyledButton>
      </StyledForm>
   )
}
const StripePaymentForm = ({
   totalAmount,
   onSuccess,
   onError,
   loading = false,
   disabled = false,
}) => (
   <Elements stripe={stripePromise}>
      <CheckoutForm
         totalAmount={totalAmount}
         onSuccess={onSuccess}
         onError={onError}
         loading={loading}
         disabled={disabled}
      />
   </Elements>
)
export default StripePaymentForm

const StyledForm = styled('form')(() => ({
   maxWidth: 400,
   margin: 'auto',
   padding: 20,
   border: '1px solid #ddd',
   borderRadius: 8,
   fontFamily: 'Arial, sans-serif',
   backgroundColor: '#fff',
   '.form-title': {
      textAlign: 'center',
      marginBottom: 20,
      fontWeight: 600,
   },
   '.total-amount': {
      textAlign: 'center',
      marginBottom: 20,
      fontSize: '18px',
      fontWeight: 500,
      color: '#FF8A00',
   },
   '.card-element-container': {
      border: '1px solid #ccc',
      padding: 10,
      borderRadius: 4,
      marginBottom: 20,
   },
}))
const StyledButton = styled('button')(() => ({
   width: '100%',
   padding: 12,
   backgroundColor: '#FF8A00',
   color: 'white',
   fontSize: 18,
   border: 'none',
   borderRadius: 6,
   cursor: 'pointer',
   fontWeight: 'bold',
   transition: 'background-color 0.3s ease',
   '&:hover:not(:disabled)': {
      backgroundColor: '#e67e00',
   },
   '&:disabled': {
      backgroundColor: '#ccc',
      cursor: 'not-allowed',
   },
   '&.loading': {
      backgroundColor: '#999',
   },
}))
