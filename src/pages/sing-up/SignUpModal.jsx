import { Typography, Box, styled } from '@mui/material'
import Modal from '../../components/UI/Modal'
import Button from '../../components/UI/Button'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../../configs/firebase'
import { useDispatch } from 'react-redux'
import { AUTH_THUNK } from '../../store/slices/auth/authThunk'
import { useNavigate } from 'react-router'
import { showToast } from '../../utils/helpers/showToast'

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

         const response = await dispatch(
            AUTH_THUNK.googleSignIn({ idToken, navigate })
         ).unwrap()

         showToast({
            title: 'Успешно!',
            message: 'Вы успешно вошли через Google!',
            type: 'success',
         })
         handleClose()
      } catch (error) {
         console.error('Google sign-in error:', error)
         showToast({
            title: 'Ошибка!',
            message:
               error.message ||
               'Не удалось войти через Google. Пожалуйста, попробуйте снова.',
            type: 'error',
         })
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

export default SignUpModal
