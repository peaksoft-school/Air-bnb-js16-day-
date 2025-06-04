import * as Yup from 'yup'

const VALIDATION_FORGOT_PASSWORD = Yup.object().shape({
   email: Yup.string()
      .email('Некорректный email')
      .required('Обязательное поле'),
})

const VALIDATION_RESET_PASSWORD = Yup.object().shape({
   password: Yup.string()
      .min(8, 'Минимум 8 символов')
      .required('Обязательное поле'),

   confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
      .required('Подтвердите пароль'),
})

export { VALIDATION_FORGOT_PASSWORD, VALIDATION_RESET_PASSWORD }
