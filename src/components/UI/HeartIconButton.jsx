import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

const HeartIconButton = ({ active = false, onClick, ...props }) => {
   return (
      <StyledIconButton onClick={onClick} $active={active} {...props}>
         {active ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </StyledIconButton>
   )
}

export default HeartIconButton

const StyledIconButton = styled(IconButton, {
   shouldForwardProp: (prop) => prop !== '$active',
})(({ $active }) => ({
   width: '55px',
   height: '37px',
   border: '2px solid #FF8A00',
   borderRadius: '2px',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   transition: 'all 0.2s ease',
   backgroundColor: $active ? '#FF8A00' : 'transparent',
   color: $active ? '#fff' : '#FF8A00',
   '&:hover': {
      backgroundColor: !$active ? 'rgba(255, 138, 0, 0.1)' : '#FF8A00',
   },
   '& svg': {
      fontSize: '20px',
   },
}))
