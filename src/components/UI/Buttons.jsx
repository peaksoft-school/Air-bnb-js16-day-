import { Button, styled } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'

const Buttons = ({
   children,
   onClick,
   type = 'button',
   disabled = false,
   variant,
}) => {
   if (variant === 'first') {
      return (
         <StyledButton type={type} onClick={onClick} disabled={disabled}>
            {children}
         </StyledButton>
      )
   }
   if (variant === 'second') {
      return (
         <SecondButton type={type} onClick={onClick} disabled={disabled}>
            {children}
         </SecondButton>
      )
   }
   if (variant === 'third') {
      return (
         <CustomButton type={type} onClick={onClick} disabled={disabled}>
            <GoogleIcon style={{ color: '#42b3f4' }} />
            {children}
         </CustomButton>
      )
   }
   return null
}

export default Buttons

const StyledButton = styled(Button)({
   width: 196,
   height: 37,
   top: '16px',
   left: '16px',
   borderRadius: '2px',
   paddingTop: '10px',
   paddingRight: '16px',
   paddingBottom: '10px',
   paddingLeft: '16px',

   display: 'flex',
   gap: '10px',

   fontFamily: 'Inter',
   fontWeight: 500,
   fontSize: '14px',
   lineHeight: '100%',
   letterSpacing: '0%',
   textTransform: 'uppercase',

   backgroundColor: '#DD8A08',
   color: '#F7F7F7',

   '&:hover': {
      backgroundColor: '#BB7200',
   },
   '&:active': {
      backgroundColor: '#F2B75B',
   },
   '&:disabled': {
      backgroundColor: '#C4C4C4',
   },
})

const SecondButton = styled(Button)({
   width: 630,
   height: 35,
   top: '413px',
   left: '33px',
   border: '1px solid grey',
   paddingTop: '8px',
   paddingRight: '16px',
   paddingBottom: '8px',
   paddingLeft: '16px',

   display: 'flex',
   gap: '10px',

   fontFamily: 'Inter',
   fontWeight: 500,
   fontSize: '16px',
   lineHeight: '100%',
   letterSpacing: '0%',
   textTransform: 'uppercase',
   color: '#737272',

   '&:hover': {
      border: '1.6px solid black',
   },

   '&:active': {
      backgroundColor: '#DD8A08',
      border: '1px',
      color: '#ffff',
   },
})

const CustomButton = styled(Button)({
   width: 425,
   height: 50,
   top: '30px',
   left: '266px',
   borderRadius: '8px',
   border: '1px solid lightgrey',
   paddingTop: '10px',
   paddingRight: '158px',
   paddingBottom: '10px',
   paddingLeft: '158px',

   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '16px',

   '&:hover': {
      border: '1px solid grey',
      backgroundColor: '#fff',
   },

   '&:active': {
      backgroundColor: '#C4C4C433',
      border: '1px solid grey',
   },
})
