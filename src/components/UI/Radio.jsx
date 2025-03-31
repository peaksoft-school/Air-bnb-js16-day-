import { Radio as MuiRadio, RadioGroup, FormControlLabel } from '@mui/material'
import styled from 'styled-components'

const Radio = ({ options, value, onChange, ...rest }) => {
   const changeHandler = (e) => onChange(e.target.value)

   return (
      <RadioGroup value={value} onChange={changeHandler} {...rest}>
         {options.map((option) => (
            <FormControlLabel
               key={option.value}
               value={option.value}
               control={<StyledRadio />}
               label={option.label}
            />
         ))}
      </RadioGroup>
   )
}

export default Radio

const StyledRadio = styled(MuiRadio)({
   color: '#B0B0B0',

   '&.MuiRadio-root.Mui-checked': {
      color: '#D9830D',
      backgroundColor: '#rgba(196, 196, 196, 1)',
   },

   '& .MuiSvgIcon-root': {
      width: 32,
      height: 32,
   },
})
