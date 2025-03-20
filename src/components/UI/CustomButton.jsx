import { ButtonBase, styled } from '@mui/material'
import GoogleLogo from '../../assets/icons/google-logo.svg'

const CustomButton = ({
   children,
   onClick,
   type = 'button',
   disabled,
   variant = 'first',
   icon = false,
   width,
}) => {
   const ButtonComponent =
      variant === 'second'
         ? SecondButton
         : variant === 'third'
           ? ThirdButton
           : FirstButton

   return (
      <ButtonComponent
         type={type}
         onClick={onClick}
         disabled={disabled}
         width={width}
      >
         {icon && <img src={GoogleLogo} alt="Google-Logo" />}
         {children}
      </ButtonComponent>
   )
}

export default CustomButton

const FirstButton = styled(ButtonBase)(({ width }) => ({
   width: width,
   height: '37px',
   borderRadius: '2px',

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

const SecondButton = styled(ButtonBase)(({ width }) => ({
   width: width,
   height: '35px',
   border: '1px solid grey',
   borderRadius: '2px',

   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '10px',

   textTransform: 'uppercase',
   fontFamily: 'Arial',
   fontWeight: '500',
   fontSize: '16px',
   color: '#737272',
   '&:hover': { border: '1.6px solid black' },
   '&:active': { backgroundColor: '#DD8A08', color: '#FFF' },
   '&:disabled': { backgroundColor: '#C4C4C4' },
}))

const ThirdButton = styled(ButtonBase)(({ width }) => ({
   width: width || '424px',
   height: '50px',
   borderRadius: '8px',
   border: '1px solid lightgrey',

   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '10px',

   fontFamily: 'Arial',
   fontWeight: '550',
   fontSize: '18px',
   lineHeight: '100%',

   '&:hover': { border: '1px solid grey', backgroundColor: '#fff' },
   '&:active': { backgroundColor: '#C4C4C433', border: '1px solid grey' },
   '&:disabled': { backgroundColor: '#C4C4C4' },
}))
