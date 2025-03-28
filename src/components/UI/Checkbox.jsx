import { styled } from '@mui/material/styles'
import Checkbox from '@mui/material/Checkbox'

const CustomCheckbox = ({ checked, onChange, disabled = false, ...rest }) => {
   const changeHandler = (e) => onChange(e.target.checked)
   return (
      <StyledCheckbox
         size="large"
         checked={checked}
         onChange={changeHandler}
         disabled={disabled}
         {...rest}
      />
   )
}

export default CustomCheckbox

const StyledCheckbox = styled(Checkbox)({
   fontSize: 24,
   color: '#B0B0B0',

   '&.Mui-checked': {
      color: '#D9830D',
   },

   '&.Mui-disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
   },
})
