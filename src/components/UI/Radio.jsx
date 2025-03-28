import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { styled } from '@mui/material/styles'
const CustomRadio = ({ options, value, onChange, ...rest }) => {
   return (
      <RadioGroup value={value} onChange={onChange}>
         {options.map((option) => (
            <FormControlLabel
               key={option.value}
               value={option.value}
               control={<StyledRadio />}
               label={option.label}
               {...rest}
            />
         ))}
      </RadioGroup>
   )
}

export default CustomRadio

const StyledRadio = styled(Radio)({
   '&.MuiRadio-root': {
      color: '#B0B0B0',
   },
   '&.Mui-checked': {
      color: '#D9830D',
      backgroundColor: '#rgba(196, 196, 196, 1)',
   },
   '& .MuiSvgIcon-root': {
      width: 32,
      height: 32,
   },
})
