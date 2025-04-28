import { Typography, Box, styled } from '@mui/material'
import Modal from '../components/UI/Modal'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'

const SignInModal = ({ open, setOpen }) => {
   const handleClose = () => setOpen(false)

   return (
      <div>
         <Modal open={open} handleClose={handleClose}>
            <JoinUsBox>
               <Box className="first-block">
                  <Typography className="signin-text">Sign in</Typography>
                  <Input placeholder={'Login'} />
               </Box>

               <Box className="second-block">
                  <Input placeholder={'Password'} />
                  <Button width={414}>SIGN IN</Button>
               </Box>
            </JoinUsBox>
         </Modal>
      </div>
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
         lineHeight: '100%',
         letterSpacing: '0%',
         color: '#000000',
         textTransform: 'uppercase',
      },
   },
   '& .second-block': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '36px',
   },
}))
