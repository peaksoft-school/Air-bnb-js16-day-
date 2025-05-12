import { Typography, Box, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AUTH_THUNK } from '../../store/slices/auth/authThunk'
import { Formik, Form, Field } from 'formik'
import { Input, Card } from 'antd'
import Modal from '../../components/UI/Modal'
import Button from '../../components/UI/Button'
import { ForgotPasswordSchema } from '../../utils/helpers/validation'
import { showToast } from '../../utils/helpers/showToast'

const ForgotPassword = ({ open, handleClose }) => {
   const dispatch = useDispatch()
   const { forgotPasswordStatus } = useSelector((state) => state.auth)

   const handleSubmit = (values) => {
      dispatch(
         AUTH_THUNK.forgotPassword({
            email: values.email,
            onSuccess: () => {
               showToast({
                  title: 'Успешно!',
                  message: 'Ссылка для сброса пароля отправлена на ваш email',
                  type: 'success',
               })
               handleClose()
            },
         })
      )
   }

   return (
      <Modal open={open} handleClose={handleClose}>
         <AuthCard title="FORGOT PASSWORD">
            <Formik
               initialValues={{ email: '' }}
               validationSchema={ForgotPasswordSchema}
               onSubmit={handleSubmit}
            >
               {({ errors, touched }) => (
                  <Form>
                     <FormBlock>
                        <Field name="email">
                           {({ field }) => (
                              <Input
                                 {...field}
                                 placeholder="Your email"
                                 status={
                                    touched.email && errors.email ? 'error' : ''
                                 }
                                 className="forgot-password-change"
                              />
                           )}
                        </Field>
                        {errors.email && touched.email && (
                           <ErrorText>{errors.email}</ErrorText>
                        )}
                     </FormBlock>

                     <Button
                        width={414}
                        type="submit"
                        loading={forgotPasswordStatus === 'loading'}
                        block
                     >
                        Send by mail
                     </Button>
                  </Form>
               )}
            </Formik>
         </AuthCard>
      </Modal>
   )
}

export default ForgotPassword

export const AuthCard = styled(Card)(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   border: 'none',
   '& .forgot-password-change': {
      width: '414px',
      height: '39px',
      borderRadius: '2px',
      borderColor: '#828282',
      border: '1px solid #828282',
   },
   '& .ant-card-head-title': {
      fontSize: '18px',
      fontWeight: 500,
      textAlign: 'center',
      fontFamily: 'Inter, sans-serif',
   },
}))

export const FormBlock = styled(Box)(({ gap = 16 }) => ({
   marginBottom: `${gap}px`,
}))

export const ErrorText = styled(Typography)(({ theme }) => ({
   color: theme.palette.error.main,
   marginTop: 4,
   fontSize: 13,
}))
