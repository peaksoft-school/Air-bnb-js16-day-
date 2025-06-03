import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Typography, Box, styled } from '@mui/material'
import { useFormik } from 'formik'
import { Input } from 'antd'
import Modal from '../../components/UI/Modal'
import Button from '../../components/UI/Button'
import { AUTH_THUNK } from '../../store/slices/auth/authThunk'

const SignInModal = ({ open, setOpen, onForgotPasswordClick }) => {
   const { isLoading } = useSelector((state) => state.auth)

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleClose = () => setOpen(false)

   const onSubmit = (values, { setSubmitting }) => {
      dispatch(
         AUTH_THUNK.signIn({ values, navigate, setSubmitting, handleClose })
      )
   }

   const { handleSubmit, values, handleChange, isSubmitting } = useFormik({
      initialValues: {
         email: '',
         password: '',
      },

      onSubmit,
   })

   return (
      <Modal open={open} handleClose={handleClose}>
         <form onSubmit={handleSubmit}>
            <JoinUsBox>
               <Box className="first-block">
                  <Typography className="signin-text">Sign in</Typography>

                  <Input
                     name="email"
                     placeholder="Email"
                     className="signin-input"
                     value={values.email}
                     onChange={handleChange}
                  />

                  <Input.Password
                     name="password"
                     placeholder="Password"
                     className="signin-input"
                     value={values.password}
                     onChange={handleChange}
                  />

                  <Box className="forgot-box">
                     <Typography
                        className="forgot-pass"
                        onClick={onForgotPasswordClick}
                     >
                        Forgot Password
                     </Typography>
                  </Box>
               </Box>

               <Box className="second-block">
                  <Button
                     width={414}
                     type="submit"
                     htmlType="submit"
                     disabled={isSubmitting || isLoading}
                  >
                     {isLoading ? 'Loading...' : 'SIGN IN'}
                  </Button>
               </Box>
            </JoinUsBox>
         </form>
      </Modal>
   )
}

export default SignInModal

const JoinUsBox = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '16px',

   '& .first-block': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '17px',

      '& .signin-text': {
         fontFamily: 'Inter, sans-serif',
         fontWeight: 500,
         fontSize: '18px',
         color: '#000',
         textTransform: 'uppercase',
      },

      '& .forgot-box': {
         marginLeft: '18em',
      },
   },

   '& .second-block': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
   },

   '& .forgot-pass': {
      color: '#646464',
      fontSize: '14px',
      textAlign: 'end',
      cursor: 'pointer',
      textDecoration: 'none',
   },

   '& .signin-input': {
      width: '414px',
      height: '39px',
      borderRadius: '2px',
      borderColor: '#828282',
      border: '1px solid #828282',
   },
}))
