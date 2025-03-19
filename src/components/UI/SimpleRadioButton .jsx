import { useState } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

const SimpleRadioButton = ({ options, defaultValue }) => {
   const [value, setValue] = useState(defaultValue)

   const handleChange = (event) => {
      setValue(event.target.value)
   }

   return (
      <RadioGroup value={value} onChange={handleChange}>
         {options.map((option) => (
            <FormControlLabel
               key={option.value}
               value={option.value}
               control={<Radio />}
               label={option.label}
            />
         ))}
      </RadioGroup>
   )
}

export default SimpleRadioButton
