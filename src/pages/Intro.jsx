import { Box, Typography } from '@mui/material'
import Header from '../layout/Header'
import styled from '@emotion/styled'
import MainPagePhoto from '../assets/images/Image-main-page.png'
import Input from '../components/UI/Input'
import Checkbox from '../components/UI/Checkbox'
import SignUpModal from './SignUpModal'
import { useState } from 'react'
import SignInModal from './SignInModal'

const Intro = () => {
   const [open, setOpen] = useState(false)
   const handleOpen = () => setOpen(true)

   const isAuthenticated = false
   return (
      <StyledMain>
         <StyledImage>
            <div>
               <Header
                  isAuthenticated={isAuthenticated}
                  onJoinUs={handleOpen}
               />
            </div>
            <StyledSearch>
               {isAuthenticated ? (
                  <>
                     <StyledText>
                        Find a place you'll love to stay at
                     </StyledText>
                     <Input
                        placeholder={'Region, city, apartment, house...'}
                        icon={true}
                        sizeVariant="large"
                     />
                  </>
               ) : (
                  <>
                     <StyledText>
                        Find a place you'll love to stay at
                     </StyledText>
                     <Input
                        placeholder={'Region, city, apartment, house...'}
                        icon={true}
                        sizeVariant="large"
                     />
                     <StyledCheckbox>
                        <Checkbox />
                        <Typography className="SearchText">
                           Искать поблизости
                        </Typography>
                     </StyledCheckbox>
                  </>
               )}
            </StyledSearch>
            <SignInModal open={open} setOpen={setOpen} />
         </StyledImage>
      </StyledMain>
   )
}

export default Intro

const StyledMain = styled(Box)(() => ({
   width: '100%',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
}))

const StyledImage = styled(Box)(() => ({
   backgroundImage: `url(${MainPagePhoto})`,
   backgroundSize: 'cover',
   backgroundPosition: 'center',
   backgroundRepeat: 'no-repeat',
   minHeight: '100vh',
   width: '100%',
   display: 'flex',
   flexDirection: 'column',
}))

const StyledSearch = styled(Box)(() => ({
   height: '600px',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   flexDirection: 'column',
}))

const StyledText = styled(Typography)(() => ({
   color: '#fff',
   fontWeight: 400,
   fontSize: '40px',
   lineHeight: '100%',
   letterSpacing: '0%',
   textTransform: 'uppercase',
   fontFamily: 'Jenriv Titling',
   padding: '0 0 50px 0',
}))

const StyledCheckbox = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   padding: '0 0 0 528px',
   '& .SearchText': {
      color: '#EDEDED',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '100%',
      letterSpacing: '0%',
   },
}))
