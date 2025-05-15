import { Formik, Form, Field } from 'formik'
import { Typography, Box, styled } from '@mui/material'
import Modal from '../../components/UI/Modal'
import Button from '../../components/UI/Button'
import { AUTH_THUNK } from '../../store/slices/auth/authThunk'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { ROUTES } from '../../routes/routes'
import { showToast } from '../../utils/helpers/showToast'
import { Input } from 'antd'

const SignInModal = ({ open, setOpen, onForgotPasswordClick }) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { isLoading } = useSelector((state) => state.auth)

   const handleClose = () => setOpen(false)

   return (
      <Modal open={open} handleClose={handleClose}>
         <Formik
            initialValues={{ email: '', password: '' }}
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
            {({ isSubmitting }) => (
               <Form>
                  <JoinUsBox>
                     <Box className="first-block">
                        <Typography className="signin-text">Sign in</Typography>

                        <Field name="email">
                           {({ field }) => (
                              <Input
                                 {...field}
                                 placeholder="Email"
                                 className="signin-input"
                              />
                           )}
                        </Field>

                        <Field name="password">
                           {({ field }) => (
                              <Input.Password
                                 {...field}
                                 placeholder="Password"
                                 className="signin-input"
                              />
                           )}
                        </Field>

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
               </Form>
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
