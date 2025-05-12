import { Formik } from 'formik'
import { Typography, Box, styled } from '@mui/material'
import Modal from '../../components/UI/Modal'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import { AUTH_THUNK } from '../../store/slices/auth/authThunk'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { ROUTES } from '../../routes/routes'
import { showToast } from '../../utils/helpers/showToast'

const SignInModal = ({ open, setOpen, onForgotPasswordClick }) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { isLoading } = useSelector((state) => state.auth)

   const handleClose = () => setOpen(false)

   return (
      <Modal open={open} handleClose={handleClose}>
         <Formik
            initialValues={{ email: '', password: '' }}
            validate={(values) => {
               const errors = {}
               if (!values.email) errors.email = 'Email is required'
               if (!values.password) errors.password = 'Password is required'
               return errors
            }}
            onSubmit={(values, { setSubmitting }) => {
               dispatch(AUTH_THUNK.login(values))
                  .unwrap()
                  .then((result) => {
                     showToast({
                        title: 'Успешно!',
                        message: 'Вы успешно вошли в систему!',
                        type: 'success',
                     })
                     if (result.role === 'ADMIN') {
                        navigate(ROUTES.ADMIN.INDEX)
                     } else {
                        navigate(ROUTES.USER.INDEX)
                     }
                     handleClose()
                  })
                  .catch(() => {
                     showToast({
                        title: 'Ошибка!',
                        message:
                           'Неверный адрес электронной почты или пароль. Пожалуйста, проверьте введённые данные.',
                        type: 'error',
                     })
                  })
                  .finally(() => {
                     setSubmitting(false)
                  })
            }}
         >
            {({ values, handleChange, handleSubmit, isSubmitting }) => (
               <form onSubmit={handleSubmit}>
                  <JoinUsBox>
                     <Box className="first-block">
                        <Typography className="signin-text">Sign in</Typography>
                        <Input
                           placeholder="Email"
                           name="email"
                           onChange={handleChange}
                           value={values.email}
                        />
                        <Input
                           placeholder="Password"
                           name="password"
                           onChange={handleChange}
                           type="password"
                           value={values.password}
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
                           disabled={isSubmitting || isLoading}
                        >
                           {isLoading ? 'Loading...' : 'SIGN IN'}
                        </Button>
                     </Box>
                  </JoinUsBox>
               </form>
            )}
         </Formik>
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
      color: '#828282',
      fontSize: '14px',
      textAlign: 'end',
      cursor: 'pointer',
      textDecoration: 'none',
   },
}))
