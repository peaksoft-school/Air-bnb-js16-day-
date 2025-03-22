import { styled } from '@mui/material'

const Input = ({ width }) => {
   return (
      <>
         <StyledInput placeholder="Введите текст..." width={width} />
      </>
   )
}

export default Input

const StyledInput = styled('input')(({ width }) => ({
   width: width || '414px',
   height: '39px',

   border: '1px',
   borderRadius: '2px',
   paddingTop: '10px',
   paddingRight: '8px',
   paddingBottom: '10px',
   paddingLeft: '16px',
   gap: '10px',
   border: '1.6px solid #C4C4C4',

   fontFamily: 'Arial',
   fontWeight: '400',
   fontSize: '16px',
   lineHeight: '100%',

   '&:hover': {
      border: '1.6px solid #828282',
   },

   '&:active': {
      border: '1.6px solid #828282',
   },
}))
