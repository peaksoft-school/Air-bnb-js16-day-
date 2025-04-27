import { Typography, Box, styled } from '@mui/material'
import Modal from '../components/UI/Modal'
import Button from '../components/UI/Button'

const SignUpModal = ({ open, setOpen }) => {
   const handleClose = () => setOpen(false)

   return (
      <div>
         <Modal open={open} handleClose={handleClose}>
            <JoinUsBox>
               <Box className="first-block">
                  <Typography className="joinus-text">JOIN US</Typography>
                  <Typography className="signin-text">
                     Sign in with Google to start booking available listings!
                  </Typography>
               </Box>

               <Box className="second-block">
                  <Button variant={'third'} icon={true}>
                     Google
                  </Button>
                  <Typography className="log-admin-text">
                     log in as admin
                  </Typography>
               </Box>
            </JoinUsBox>
         </Modal>
      </div>
   )
}

export default SignUpModal

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
         letterSpacing: '0%',
         color: '#000000',
      },

      '& .signin-text': {
         fontFamily: 'Inter, sans-serif',
         fontWeight: 400,
         fontSize: '16px',
         lineHeight: '100%',
         letterSpacing: '0%',
         color: theme.palette.tertiary.middleGray,
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
         letterSpacing: '0%',
         color: '#266BD3',
         textDecoration: 'underline',
         cursor: 'pointer',
      },
   },
}))
