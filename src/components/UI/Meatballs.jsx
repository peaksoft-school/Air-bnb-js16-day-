import { useState } from 'react'
import { IconButton, Menu, MenuItem, styled } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'

function Meatballs({
   options = [],
   onSelect,
   icon = <MoreVertIcon />,
   color = false,
}) {
   const [anchorEl, setAnchorEl] = useState(null)
   const open = Boolean(anchorEl)

   const handleClick = (e) => setAnchorEl(e.currentTarget)

   const handleClose = (option) => {
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
               <MenuItem key={i} onClick={() => handleClose(option)}>
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
}))
