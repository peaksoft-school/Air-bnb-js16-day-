import { useState } from 'react';
import { IconButton, Menu, MenuItem, styled } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function Meatballs({ options = [], onSelect, icon = <MoreVertIcon /> }) {
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);

   const handleClick = (e) => setAnchorEl(e.currentTarget);

   const handleClose = (option) => {
      setAnchorEl(null);
      if (option && onSelect) {
         onSelect(option); // Передаем выбранную опцию в родительский компонент
      }
   };

   return (
      <>
         <StyledOnMeatballs onClick={handleClick}>{icon}</StyledOnMeatballs>
         <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose(null)}>
            {options.map((option, i) => (
               <MenuItem key={i} onClick={() => handleClose(option)}>
                  {option.label}
               </MenuItem>
            ))}
         </Menu>
      </>
   );
}

export default Meatballs;

const StyledOnMeatballs = styled(IconButton)(() => ({
   color: 'rgba(255, 255, 255, 1)',
}));
