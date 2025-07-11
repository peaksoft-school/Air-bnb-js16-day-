import { useState } from 'react'
import { IconButton, Menu, MenuItem, styled } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

const Meatballs = ({
   options = [],
   onSelect,
   icon = <MoreHorizIcon className="dots" />,
   color = false,
}) => {
   const [anchorEl, setAnchorEl] = useState(null)

   const open = Boolean(anchorEl)

   const handleClick = (e) => {
      e.stopPropagation(), setAnchorEl(e.currentTarget)
   }

   const handleClose = (option,e) => {
      e.stopPropagation()
      setAnchorEl(null)

      if (option && onSelect) {
         onSelect(option)
      }
   }

   return (
      <>
         <StyledOnMeatballs onClick={handleClick} colorU={color}>
            {icon}
         </StyledOnMeatballs>

         <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleClose(null)}
         >
            {options.map((option, i) => (
               <MenuItem key={i} onClick={(e) => handleClose(option,e)}>
                  {option.label}
               </MenuItem>
            ))}
         </Menu>
      </>
   )
}

export default Meatballs

const StyledOnMeatballs = styled(IconButton)(({ colorU }) => ({
   color: colorU ? '#C4C4C4' : 'rgba(255, 255, 255, 1)',

   '& .dots': {
      color: '#C4C4C4',
   },
}))
