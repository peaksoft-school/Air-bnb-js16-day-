import { ButtonBase as MuiButtonBase, styled } from '@mui/material'
import GoogleLogo from '../../assets/icons/google-logo.svg'
import { CircularProgress } from '@mui/material'

const Button = ({
   children,
   onClick,
   type = 'button',
   disabled,
   variant = 'first',
   icon = false,
   width,
   loading = false,
}) => {
   const ButtonComponent =
      variant === 'second'
         ? SecondButton
         : variant === 'third'
           ? ThirdButton
           : variant === 'fourth'
             ? FourthButton
             : FirstButton

   return (
      <ButtonComponent
         type={type}
         onClick={loading ? undefined : onClick}
         disabled={disabled || loading}
         width={width}
      >
         {loading ? (
            <CircularProgress size={20} sx={{ color: 'white' }} />
         ) : (
            <>
               {icon && <img src={GoogleLogo} alt="Google-Logo" />}
               {children}
            </>
         )}
      </ButtonComponent>
   )
}

export default Button

const FirstButton = styled(MuiButtonBase)(({ width }) => ({
   width: width,
   height: '37px',
   borderRadius: '2px',
   cursor: 'pointer',

   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '10px',

   textTransform: 'uppercase',
   fontFamily: 'Arial',
   fontWeight: '500',
   fontSize: '14px',
   color: '#F7F7F7',
   backgroundColor: '#DD8A08',
   '&:hover': { backgroundColor: '#BB7200' },
   '&:active': { backgroundColor: '#F2B75B' },
   '&:disabled': { backgroundColor: '#C4C4C4' },
}))

const SecondButton = styled(MuiButtonBase)(({ width }) => ({
   width: width,
   height: '35px',
   border: '1px solid grey',
   borderRadius: '2px',
   cursor: 'pointer',

   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '10px',

   textTransform: 'uppercase',
   fontFamily: 'Arial',
   fontWeight: '500',
   fontSize: '16px',
   color: '#737272',
   '&:hover': { border: '1.5px solid black' },
   '&:active': { backgroundColor: '#DD8A08', color: '#FFF' },
   '&:disabled': { backgroundColor: '#C4C4C4' },
}))

const ThirdButton = styled(MuiButtonBase)(({ width }) => ({
   width: width || '424px',
   height: '50px',
   borderRadius: '8px',
   border: '1px solid lightgrey',
   cursor: 'pointer',

   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '10px',

   fontFamily: 'Inter, sans-serif',
   fontWeight: '550',
   fontSize: '18px',
   lineHeight: '100%',

   '&:hover': { border: '1px solid grey', backgroundColor: '#fff' },
   '&:active': { backgroundColor: '#C4C4C433', border: '1px solid grey' },
   '&:disabled': { backgroundColor: '#C4C4C4' },
}))

const FourthButton = styled(MuiButtonBase)(({ width }) => ({
   width: width,
   height: '33px',
   padding: '8px 16px 8px 16px',
   cursor: 'pointer',

   fontFamily: 'Arial',
   fontWeight: '400',
   fontSize: '14px',
   lineHeight: '100%',
   textTransform: 'uppercase',

   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '10px',

   color: '#828282',

   gap: '10px',
   '&:active': { background: '#F3F3F3', color: '#363636' },
   '&:disabled': { backgroundColor: '#C4C4C4' },
}))
