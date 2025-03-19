import React from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/Typography'

const ReusableCheckbox = ({
   label,
   checked,
   onChange,
   name,
   disabled = false,
   color = 'primary',
   size = 'medium',
   labelPlacement = 'end',
   sx = {},
}) => {
   return (
      <FormControlLabel
         control={
            <Checkbox
               checked={checked}
               onChange={onChange}
               name={name}
               disabled={disabled}
               color={color}
               size={size}
            />
         }
         label={<Typography variant="body1">{label}</Typography>}
         labelPlacement={labelPlacement}
         sx={sx}
      />
   )
}

export default ReusableCheckbox
