import { Chip as MuiChip } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import styled from 'styled-components'

const Chip = ({ onClick, onDelete, label }) => {
   return (
      <StyledMuiChip
         deleteIcon={<ClearIcon />}
         onDelete={onDelete}
         onClick={onClick}
         label={label}
      />
   )
}

export default Chip

const StyledMuiChip = styled(MuiChip)({
   '&.MuiChip-root': {
      width: '95px',
      height: '35px',
      borderRadius: '1px',
      backgroundColor: '#F3F3F3',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '9px 8px 9px 8px',

      '&:hover': {
         backgroundColor: '#C4C4C4',
      },

      '&:active': {
         backgroundColor: '#A1A1A1',
      },

      '& .MuiChip-label, & .MuiSvgIcon-root': {
         fontFamily: 'Arial',
         fontWeight: 400,
         fontSize: '16px',
         lineHeight: '100%',
         color: '#828282',
         transition: 'color 0.3s ease',
      },

      '& .MuiSvgIcon-root': {
         order: '-1',
      },

      '&:hover .MuiChip-label, &:hover .MuiSvgIcon-root': {
         color: '#F7F7F7',
      },

      '&:active .MuiChip-label, &:active .MuiSvgIcon-root': {
         color: '#F7F7F7',
      },
   },
})
