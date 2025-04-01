import { Chip as MuiChip } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import { styled } from '@mui/material/styles'

const Chip = ({ icon = false, onClick, onDelete, label }) => {
   return (
      <StyledMuiChip
         icon={icon && <ClearIcon />}
         onDelete={onDelete}
         onClick={onClick}
         label={label}
      />
   )
}

export default Chip

const StyledMuiChip = styled(MuiChip)({
   width: '95px',
   height: '35px',
   borderRadius: '1px',
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

   '& .MuiChip-label, & .MuiChip-icon': {
      fontFamily: 'Arial',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '100%',
      color: '#828282',
      transition: 'color 0.3s ease',
   },

   '&:hover .MuiChip-label, &:hover .MuiChip-icon': {
      color: '#F7F7F7',
   },

   '&:active .MuiChip-label, &:active .MuiChip-icon': {
      color: '#F7F7F7',
   },
})
