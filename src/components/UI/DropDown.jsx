import { Box, MenuItem, Select, styled, Typography } from '@mui/material'

const DropDown = ({ label, value, onChange, options, disabled = false }) => {
   const handleChange = (e) => onChange(e.target.value)

   return (
      <StyledSelectBox>
         <StyledLabel>{label}</StyledLabel>

         <Select
            value={value}
            onChange={handleChange}
            variant="standard"
            disableUnderline
            disabled={disabled}
            className="select"
         >
            {options.map(({ value, label }) => (
               <MenuItem key={value} value={value} className='Menu-item'>
                  {label}
               </MenuItem>
            ))}
         </Select>
      </StyledSelectBox>
   )
}

export default DropDown

const StyledSelectBox = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   border: '1px solid #C4C4C4',
   borderRadius: '2px',
   padding: '0px 12px',
   width: '271px',
   height: '42px',
   backgroundColor: 'white',
   cursor:'pointer',

   '&:hover': {
      backgroundColor: '#F3F3F3',
   },

   '& .select': {
      color: 'black',
      cursor:'pointer',
      '& .MuiSelect-select': {
         paddingRight: '24px',cursor:'pointer',
      },

      '& svg': {
         right: 0,
         cursor:'pointer',
      },
   },
   '& .Menu-item':{
      cursor:'pointer',
   }
}))

const StyledLabel = styled(Typography)(() => ({
   fontWeight: '400',
   fontSize: '16px',
   lineHeight: '100%',
   letterSpacing: '0%',
   color: '#828282',
   cursor:'pointer',
}))
