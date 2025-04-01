import { Chip as MuiChip } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import styled from 'styled-components'

const Chip = ({ icon = false, onClick, onDelete, label }) => {
   return (
      <StyledMuiChip
         icon={icon && <ClearIcon />}
         onDelete={onDelete}
         onClick={onClick}
         label={label}
         sx={{ borderRadius: '1px' }}
         className="custom-chip"
      />
   )
}

export default Chip

const StyledMuiChip = styled(MuiChip)(() => ({
   width: '95px',
   height: '35px',
   backgroundColor: '#F3F3F3',

   fontSize: '16px',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '6px',

   '&:hover': {
      backgroundColor: '#C4C4C4',
   },

   '&:active': {
      backgroundColor: '#A1A1A1',
   },

   '&.custom-chip .MuiChip-label': {
      fontFamily: 'Arial',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '100%',
      color: '#828282',
      '&:hover': {
         color: '#F7F7F7',
      },
   },

   '&.custom-chip .MuiChip-icon': {
      fontSize: '16px',
      '&:hover': {
         color: '#F7F7F7',
      },
   },
}))
