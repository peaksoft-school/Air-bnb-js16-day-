import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

const StyledLoaderWrapper = styled(Box)(() => ({
   height: '100vh',
   width: '100vw',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   background: 'linear-gradient(135deg, #fff 0%, #f8f8f8 100%)',
   position: 'relative',
   overflow: 'hidden',
}))

const LoaderDots = styled('div')(() => ({
   display: 'flex',
   gap: '8px',
   marginTop: '8px',

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

const SuspenseLoader = () => {
   return (
      <StyledLoaderWrapper>
         <LoaderDots>
            <span></span>
            <span></span>
            <span></span>
         </LoaderDots>
      </StyledLoaderWrapper>
   )
}

export default SuspenseLoader
