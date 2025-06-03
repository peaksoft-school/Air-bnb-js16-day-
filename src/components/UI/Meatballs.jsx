import { useState } from 'react'
import { IconButton, Menu, MenuItem, styled } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

function Meatballs({ options = [], onSelect, icon = <MoreHorizIcon /> }) {
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
         <StyledOnMeatballs onClick={handleClick}>{icon}</StyledOnMeatballs>

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

const StyledOnMeatballs = styled(IconButton)(() => ({
   color: 'rgb(149, 136, 136)',
}))
