import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Box, styled } from '@mui/material'
import Modal from '../../components/UI/Modal'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import { AUTH_THUNK } from '../../store/slices/auth/authThunk'
import { useNavigate } from 'react-router'
import { ROUTES } from '../../routes/routes'

const SignInModal = ({ open, setOpen, onForgotPasswordClick }) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { isLoading } = useSelector((state) => state.auth)

   const [formData, setFormData] = useState({ email: '', password: '' })

   const handleClose = () => setOpen(false)

   const handleChange = (e) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
   }

   const handleSubmit = async () => {
      const result = dispatch(AUTH_THUNK.login(formData))

      if (result.meta.requestStatus === 'fulfilled') {
         handleClose()
         if (result.payload.role === 'ADMIN') {
            navigate(ROUTES.ADMIN.INDEX)
         } else {
            navigate(ROUTES.USER.INDEX)
         }
      } else {
         alert(result.payload.message || 'Login failed')
      }
   }

   return (
      <Modal open={open} handleClose={handleClose}>
         <JoinUsBox>
            <Box className="first-block">
               <Typography className="signin-text">Sign in</Typography>
               <Input
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
               />
            </Box>
            <Box className="second-block">
               <Input
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
               />

               <Typography
                  className="forgot-pass"
                  onClick={onForgotPasswordClick}
               >
                  Forgot Password
               </Typography>

               <Button width={414} onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'SIGN IN'}
               </Button>
            </Box>
         </JoinUsBox>
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
      gap: '24px',

      '& .signin-text': {
         fontFamily: 'Inter, sans-serif',
         fontWeight: 500,
         fontSize: '18px',
         color: '#000',
         textTransform: 'uppercase',
      },
   },
   '& .second-block': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      '& .forgot-pass': {
         color: '#828282',
         fontSize: '14px',
         padding: '0 0 0 20em',
         cursor: 'pointer',
         textDecoration: 'none',
      },
   },
}))
