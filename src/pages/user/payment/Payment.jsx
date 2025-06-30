import { useState, useEffect } from 'react'
import { Box, Typography, styled } from '@mui/material'
import Modal from '../../../components/UI/Modal'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useDispatch, useSelector } from 'react-redux'
import { createPayment } from '../../../store/slices/user/payment/paymentThunk'
import StripePaymentForm from './PaymentForm'
const Payment = ({ pricePerDay, userId, houseId }) => {
   const dispatch = useDispatch()
   const [checkIn, setCheckIn] = useState(null)
   const [checkOut, setCheckOut] = useState(null)
   const [showCalendar, setShowCalendar] = useState(false)
   const [selectingCheckIn, setSelectingCheckIn] = useState(true)
   const [showPayment, setShowPayment] = useState(false)
   const [bookingComplete, setBookingComplete] = useState(false)
   const [showChangeDate, setShowChangeDate] = useState(false)
   const [showHistory, setShowHistory] = useState(false)
   const [paymentError, setPaymentError] = useState('')
   const { loading, error, paymentHistory } = useSelector(
      (state) => state.payment
   )
   const days =
      checkIn && checkOut
         ? Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
         : 0
   const total = pricePerDay * days
   const formatDate = (date) => date?.toLocaleDateString('en-GB') || ''
   const handleDateSelect = (date) => {
      if (selectingCheckIn) {
         setCheckIn(date)
         setSelectingCheckIn(false)
      } else {
         if (date <= checkIn) {
            alert('Check-out must be after check-in')
            return
         }
         setCheckOut(date)
         setShowCalendar(false)
      }
   }
   const handleStripeSuccess = async (paymentMethod) => {
      try {
         console.log('Stripe payment successful:', paymentMethod)
         await dispatch(
            createPayment({
               userId,
               houseId,
               checkin: checkIn?.toISOString() || checkIn,
               checkout: checkOut?.toISOString() || checkOut,
            })
         ).unwrap()
         setBookingComplete(true)
         setPaymentError('')
      } catch (error) {
         console.error('Payment processing error:', error)
         setPaymentError('Payment processing failed. Please try again.')
      }
   }
   const handleStripeError = (errorMessage) => {
      console.error('Stripe error:', errorMessage)
      setPaymentError(errorMessage)
   }
   const resetDates = () => {
      setShowChangeDate(false)
      setCheckIn(null)
      setCheckOut(null)
      setShowPayment(false)
      setBookingComplete(false)
      setPaymentError('')
   }
   return (
      <Container>
         <Price>$ {pricePerDay} / day</Price>
         <Divider />
         <DateGrid>
            <Box>
               <Label>Check in</Label>
               <DateBox
                  onClick={() => {
                     setShowCalendar(true)
                     setSelectingCheckIn(true)
                  }}
               >
                  {formatDate(checkIn) || 'Select date'}
               </DateBox>
            </Box>
            <Box>
               <Label>Check out</Label>
               <DateBox
                  onClick={() => {
                     setShowCalendar(true)
                     setSelectingCheckIn(false)
                  }}
               >
                  {formatDate(checkOut) || 'Select date'}
               </DateBox>
            </Box>
         </DateGrid>
         <Message>You have to be signed in to book a listing!</Message>
         <MainButton
            onClick={() => setShowPayment(true)}
            disabled={!checkIn || !checkOut}
         >
            REQUEST TO BOOK
         </MainButton>
         <SecondaryButton onClick={() => setShowHistory(true)}>
            View Past Payments
         </SecondaryButton>
         <Heart />
         <Modal open={showCalendar} handleClose={() => setShowCalendar(false)}>
            <CalendarWrapper>
               <Typography variant="h6" mb={2}>
                  {selectingCheckIn
                     ? 'Select check-in date'
                     : 'Select check-out date'}
               </Typography>
               <Calendar
                  onChange={handleDateSelect}
                  value={selectingCheckIn ? checkIn : checkOut}
                  minDate={
                     selectingCheckIn ? new Date() : checkIn || new Date()
                  }
                  tileDisabled={({ date }) =>
                     !selectingCheckIn && checkIn && date <= checkIn
                  }
               />
            </CalendarWrapper>
         </Modal>
         <Modal open={showPayment} handleClose={() => setShowPayment(false)}>
            {bookingComplete ? (
               <PaymentContainer>
                  <Typography variant="h5" fontWeight={600}>
                     Payment Successful!
                  </Typography>
                  <Typography my={2}>
                     Your booking from {formatDate(checkIn)} to{' '}
                     {formatDate(checkOut)} is confirmed.
                  </Typography>
                  <Typography mb={1}>You paid ${total}</Typography>
                  <MainButton onClick={() => setShowChangeDate(true)}>
                     Change the date
                  </MainButton>
               </PaymentContainer>
            ) : (
               <PaymentContainer>
                  <Typography variant="h5" fontWeight={600}>
                     BOOK YOUR TRIP
                  </Typography>
                  <Typography my={2}>
                     Enter your payment information to book the listing from{' '}
                     {formatDate(checkIn)} to {formatDate(checkOut)} inclusive.
                  </Typography>
                  <Typography mb={1}>
                     ${pricePerDay} × {days} days = ${total}
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                     Total = ${total}
                  </Typography>
                  <StripePaymentForm
                     totalAmount={total}
                     onSuccess={handleStripeSuccess}
                     onError={handleStripeError}
                     loading={loading}
                     disabled={!checkIn || !checkOut}
                  />
                  {paymentError && (
                     <Typography
                        color="error"
                        sx={{ mt: 2, textAlign: 'center' }}
                     >
                        {paymentError}
                     </Typography>
                  )}
                  {error && (
                     <Typography
                        color="error"
                        sx={{ mt: 2, textAlign: 'center' }}
                     >
                        {error}
                     </Typography>
                  )}
               </PaymentContainer>
            )}
         </Modal>
         <Modal
            open={showChangeDate}
            handleClose={() => setShowChangeDate(false)}
         >
            <PaymentContainer>
               <Typography variant="h6" mb={2}>
                  Change your booking dates
               </Typography>
               <MainButton onClick={resetDates}>Update Dates</MainButton>
            </PaymentContainer>
         </Modal>
         <Modal open={showHistory} handleClose={() => setShowHistory(false)}>
            <PaymentContainer>
               <Typography variant="h6" mb={2}>
                  Your Past Bookings
               </Typography>
               {paymentHistory?.length > 0 ? (
                  paymentHistory.map((payment, index) => (
                     <Box key={index} mb={2}>
                        <Typography>
                           From: {formatDate(new Date(payment.checkin))}
                        </Typography>
                        <Typography>
                           To: {formatDate(new Date(payment.checkout))}
                        </Typography>
                        <Typography>
                           Total Paid: ${payment.total || 'N/A'}
                        </Typography>
                     </Box>
                  ))
               ) : (
                  <Typography>No past payments found.</Typography>
               )}
            </PaymentContainer>
         </Modal>
      </Container>
   )
}
export default Payment

const Container = styled(Box)(() => ({
   border: '1px solid #ddd',
   padding: '20px',
   borderRadius: '8px',
   maxWidth: '420px',
   margin: '0 auto',
   position: 'relative',
}))
const Price = styled(Typography)(() => ({
   fontSize: '24px',
   fontWeight: 500,
   textAlign: 'center',
}))
const Divider = styled('hr')(() => ({
   margin: '20px 0',
   borderColor: '#eee',
}))
const DateGrid = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   gap: '10px',
}))
const Label = styled(Typography)(() => ({
   marginBottom: '4px',
   fontSize: '14px',
}))
const DateBox = styled(Box)(() => ({
   border: '1px solid #ccc',
   padding: '12px',
   borderRadius: '6px',
   cursor: 'pointer',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
}))
const Message = styled(Typography)(() => ({
   fontSize: '14px',
   color: '#777',
   marginTop: '12px',
   marginBottom: '20px',
}))
const MainButton = styled('button')(() => ({
   backgroundColor: '#FF8A00',
   color: 'white',
   border: 'none',
   width: '100%',
   padding: '14px',
   fontWeight: 500,
   borderRadius: '6px',
   cursor: 'pointer',
   '&:disabled': {
      backgroundColor: '#ccc',
      cursor: 'not-allowed',
   },
}))
const SecondaryButton = styled(MainButton)(() => ({
   backgroundColor: '#fff',
   color: '#FF8A00',
   border: '1px solid #FF8A00',
   marginTop: '12px',
}))
const Heart = styled('div')(() => ({
   position: 'absolute',
   bottom: '20px',
   right: '20px',
   width: '42px',
   height: '42px',
   border: '1px solid #FF8A00',
   borderRadius: '6px',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   color: '#FF8A00',
   fontSize: '20px',
}))
const CalendarWrapper = styled(Box)(() => ({
   padding: '24px',
}))
const PaymentContainer = styled(Box)(() => ({
   padding: '24px',
   width: '100%',
   maxWidth: '400px',
}))
const Input = styled('input')(() => ({
   width: '100%',
   padding: '12px',
   marginBottom: '16px',
   border: '1px solid #ccc',
   borderRadius: '6px',
}))
const InputRow = styled(Box)(() => ({
   display: 'flex',
   gap: '12px',
}))
