import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { Typography, Box, styled } from '@mui/material'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import Modal from '../../components/UI/Modal'
import Button from '../../components/UI/Button'
import { auth } from '../../configs/firebase'
import { AUTH_THUNK } from '../../store/slices/auth/authThunk'

const SignUpModal = ({ open, setOpen, onAdminLoginClick }) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleClose = () => setOpen(false)

   const handleGoogleSignIn = async () => {
      try {
      const provider = new GoogleAuthProvider()
      provider.addScope('email')
      provider.addScope('profile')

      const result = await signInWithPopup(auth, provider)
      const idToken = await result.user.getIdToken()

      await dispatch(
         AUTH_THUNK.authWithGoogle({ 
            idToken, 
            navigate,
            onSuccess: () => {
               const selectedRegion = localStorage.getItem('selectedRegion')
               if (selectedRegion) {
                  navigate('/user/region', { 
                     state: { selectedRegion } 
                  })
               } else {
                  navigate('/user')
               }
            },
            handleClose 
         })
      ).unwrap()
   } catch (error) {
      console.error('Google sign-in error:', error)
   }
   }

   return (
      <Modal open={open} handleClose={handleClose}>
         <JoinUsBox>
            <Box className="first-block">
               <Typography className="joinus-text">JOIN US</Typography>

               <Typography className="signin-text">
                  {localStorage.getItem('selectedRegion') 
                     ? 'Sign in with Google to view properties in selected region!'
                     : 'Sign in with Google to start booking available listings!'}
               </Typography>
            </Box>

            <Box className="second-block">
               <Button variant="third" icon onClick={handleGoogleSignIn}>
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
   )
}

export default SignUpModal

// ... rest of the styling code remains the same

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
         color: '#000000',
      },

      '& .signin-text': {
         fontFamily: 'Inter, sans-serif',
         fontWeight: 400,
         fontSize: '16px',
         lineHeight: '100%',
         color: theme.palette.tertiary.middleGray,
         textAlign: 'center',
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
         color: '#266BD3',
         textDecoration: 'underline',
         cursor: 'pointer',
      },
   },
}))
