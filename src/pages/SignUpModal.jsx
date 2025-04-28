import { Typography, Box, styled } from '@mui/material'
import Modal from '../components/UI/Modal'
import Button from '../components/UI/Button'
import { useGoogleLogin } from '@react-oauth/google'

const SignUpModal = ({ open, setOpen, onAdminLoginClick }) => {
   const handleClose = () => setOpen(false)

//    const login = useGoogleLogin({
//       onSuccess: (tokenResponse) =>
//          console.log('TOKEN RESPONSE:', tokenResponse),
//       onError: (errorResponse) => console.error('ERROR:', errorResponse),
//       ux_mode: 'popup',
//    })

const login = ()=>{
    
}




   return (
      <div>
         <Modal open={open} handleClose={handleClose}>
            <JoinUsBox>
               <Box className="first-block">
                  <Typography className="joinus-text">JOIN US</Typography>
                  <Typography className="signin-text">
                     Sign in with Google to start booking available listings!
                  </Typography>
               </Box>

               <Box className="second-block">
                  <Button variant={'third'} icon={true} onClick={() => login()}>
                     Google
                  </Button>

                  <Typography
                     className="log-admin-text"
                     onClick={onAdminLoginClick}
                  >
                     log in as admin
                  </Typography>
               </Box>
            </JoinUsBox>
         </Modal>
      </div>
   )
}

export default SignUpModal

const JoinUsBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '20px',

   '& .first-block': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '24px',

      '& .joinus-text': {
         fontFamily: 'Inter, sans-serif',
         fontWeight: 500,
         fontSize: '18px',
         lineHeight: '100%',
         letterSpacing: '0%',
         color: '#000000',
      },

      '& .signin-text': {
         fontFamily: 'Inter, sans-serif',
         fontWeight: 400,
         fontSize: '16px',
         lineHeight: '100%',
         letterSpacing: '0%',
         color: theme.palette.tertiary.middleGray,
      },
   },
   '& .second-block': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '36px',

      '& .log-admin-text': {
         fontFamily: 'Inter, sans-serif',
         fontWeight: 400,
         fontSize: '14px',
         lineHeight: '100%',
         letterSpacing: '0%',
         color: '#266BD3',
         textDecoration: 'underline',
         cursor: 'pointer',
      },
   },
}))
