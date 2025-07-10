import { useEffect } from 'react'
import { Box, styled, Typography } from '@mui/material'

const Loading = () => {
   useEffect(() => {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      window.scrollTo({ top: 0, behavior: 'smooth' })

      return () => {
         document.body.style.overflow = originalOverflow
      }
   }, [])

   return (
      <StyledLoaderWrapper>
         <LoaderDots>
            <Typography variant="span"></Typography>
            <Typography variant="span"></Typography>
            <Typography variant="span"></Typography>
         </LoaderDots>
      </StyledLoaderWrapper>
   )
}

export default Loading

const StyledLoaderWrapper = styled(Box)(() => ({
   height: '100vh',
   width: '100vw',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   background: 'linear-gradient(135deg, #fff 0%, #f8f8f8 100%)',
   position: 'relative',
   overflow: 'hidden',
}))

const LoaderDots = styled('div')(() => ({
   display: 'flex',
   gap: '8px',
   marginTop: 0,

   '& span': {
      width: '15px',
      height: '15px',
      borderRadius: '50%',
      backgroundColor: '#FF9900',
      animation: 'bounce 1.4s infinite ease-in-out both',
   },

   '& span:nth-of-type(1)': {
      animationDelay: '0s',
   },

   '& span:nth-of-type(2)': {
      animationDelay: '0.2s',
   },

   '& span:nth-of-type(3)': {
      animationDelay: '0.4s',
   },

   '@keyframes bounce': {
      '0%, 80%, 100%': {
         transform: 'scale(0)',
      },

      '40%': {
         transform: 'scale(1)',
      },
   },
}))
