import { Typography, Box, styled } from '@mui/material'
import Modal from '../../components/UI/Modal'
import Button from '../../components/UI/Button'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../../configs/firebase'
import { useDispatch } from 'react-redux'
import { AUTH_THUNK } from '../../store/slices/auth/authThunk'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const SignUpModal = ({ open, setOpen, onAdminLoginClick }) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [error, setError] = useState(null)

   const handleClose = () => {
      setOpen(false)
      setError(null)
   }

   const handleGoogleSignIn = async () => {
      try {
         setError(null)
         const provider = new GoogleAuthProvider()
         provider.addScope('email')
         provider.addScope('profile')

         const result = await signInWithPopup(auth, provider)
         const idToken = await result.user.getIdToken()

         const response = dispatch(
            AUTH_THUNK.googleSignIn({ idToken, navigate })
         )

         if (response.error) {
            throw new Error(
               response.payload?.message || 'Authentication failed'
            )
         }

         handleClose()
      } catch (error) {
         console.error('Google sign-in error:', error)
         setError(
            error.message || 'Failed to sign in with Google. Please try again.'
         )
      }
   }

   return (
      <Modal open={open} handleClose={handleClose}>
         <JoinUsBox>
            <Box className="first-block">
               <Typography className="joinus-text">JOIN US</Typography>
               <Typography className="signin-text">
                  Sign in with Google to start booking available listings!
               </Typography>
               {error && (
                  <Typography
                     sx={{ color: 'red', fontSize: '14px', marginTop: '8px' }}
                  >
                     {error}
                  </Typography>
               )}
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

export default SignUpModal
