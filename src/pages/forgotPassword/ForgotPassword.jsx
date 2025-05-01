import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { AUTH_THUNK } from '../../store/slices/auth/authThunk'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Button, Input, Card } from 'antd'
import { toast } from 'react-toastify'

const ForgotPasswordSchema = Yup.object().shape({
   email: Yup.string()
      .email('Некорректный email')
      .required('Обязательное поле'),
})

const ForgotPassword = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { forgotPasswordStatus } = useSelector((state) => state.auth)

   const handleSubmit = (values) => {
      dispatch(AUTH_THUNK.forgotPassword(values.email))
         .unwrap()
         .then(() => {
            toast.success('Ссылка для сброса пароля отправлена на ваш email')
            navigate('/')
         })
   }

   return (
      <Card
         title="Восстановление пароля"
         style={{ width: 400, margin: '24px auto' }}
      >
         <Formik
            initialValues={{ email: '' }}
            validationSchema={ForgotPasswordSchema}
            onSubmit={handleSubmit}
         >
            {({ errors, touched }) => (
               <Form>
                  <div style={{ marginBottom: 16 }}>
                     <Field name="email">
                        {({ field }) => (
                           <Input
                              {...field}
                              placeholder="Ваш email"
                              status={
                                 touched.email && errors.email ? 'error' : ''
                              }
                           />
                        )}
                     </Field>
                     {errors.email && touched.email && (
                        <div style={{ color: 'red', marginTop: 4 }}>
                           {errors.email}
                        </div>
                     )}
                  </div>

                  <Button
                     type="primary"
                     htmlType="submit"
                     loading={forgotPasswordStatus === 'loading'}
                     block
                  >
                     Отправить
                  </Button>
               </Form>
            )}
         </Formik>
      </Card>
   )
}

export default ForgotPassword
