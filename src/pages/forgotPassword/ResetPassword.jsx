import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router'
import { AUTH_THUNK } from '../../store/slices/auth/authThunk'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Button, Input, Card } from 'antd'
import { toast } from 'react-toastify'

const ResetPasswordSchema = Yup.object().shape({
   password: Yup.string()
      .min(8, 'Минимум 8 символов')
      .required('Обязательное поле'),
   confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
      .required('Подтвердите пароль'),
})

const ResetPassword = () => {
   const { token } = useParams()
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { resetPasswordStatus } = useSelector((state) => state.auth)

   const handleSubmit = (values) => {
      if (!token) {
         toast.error('Токен отсутствует!')
         return
      }
      dispatch(AUTH_THUNK.resetPassword({ token, password: values.password }))
         .unwrap()
         .then(() => {
            toast.success('Пароль успешно изменен!')
            navigate('/login')
         })
         .catch((err) => {
            toast.error(err.message || 'Ошибка при сбросе пароля')
         })
   }

   return (
      <Card
         title="Установка нового пароля"
         style={{ width: 400, margin: '24px auto' }}
      >
         <Formik
            initialValues={{ password: '', confirmPassword: '' }}
            validationSchema={ResetPasswordSchema}
            onSubmit={handleSubmit}
         >
            {({ errors, touched }) => (
               <Form>
                  <div style={{ marginBottom: 16 }}>
                     <Field name="password">
                        {({ field }) => (
                           <Input.Password
                              {...field}
                              placeholder="Новый пароль"
                              status={
                                 touched.password && errors.password
                                    ? 'error'
                                    : ''
                              }
                           />
                        )}
                     </Field>
                     {errors.password && touched.password && (
                        <div style={{ color: 'red', marginTop: 4 }}>
                           {errors.password}
                        </div>
                     )}
                  </div>

                  <div style={{ marginBottom: 24 }}>
                     <Field name="confirmPassword">
                        {({ field }) => (
                           <Input.Password
                              {...field}
                              placeholder="Подтвердите пароль"
                              status={
                                 touched.confirmPassword &&
                                 errors.confirmPassword
                                    ? 'error'
                                    : ''
                              }
                           />
                        )}
                     </Field>
                     {errors.confirmPassword && touched.confirmPassword && (
                        <div style={{ color: 'red', marginTop: 4 }}>
                           {errors.confirmPassword}
                        </div>
                     )}
                  </div>

                  <Button
                     type="primary"
                     htmlType="submit"
                     loading={resetPasswordStatus === 'loading'}
                     block
                  >
                     Сохранить пароль
                  </Button>
               </Form>
            )}
         </Formik>
      </Card>
   )
}

export default ResetPassword
