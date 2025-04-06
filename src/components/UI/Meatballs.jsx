import { IconButton, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useState } from 'react'
import styled from 'styled-components'

function Meatballs({ options = [], onSelect, icon = <MoreVertIcon /> }) {
   const [anchorEl, setAnchorEl] = useState(null)
   const open = Boolean(anchorEl)

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
   }

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
            {options.map((option, index) => (
               <MenuItem key={index} onClick={() => handleClose(option)}>
                  {option.label}
               </MenuItem>
            ))}
         </Menu>
      </>
   )
}

export default Meatballs

const StyledOnMeatballs = styled(IconButton)(() => ({
   color: 'rgba(255, 255, 255, 1)',
}))
