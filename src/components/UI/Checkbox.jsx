import { Checkbox as MuiCheckbox } from '@mui/material'
import styled from 'styled-components'

const Checkbox = ({ checked, onChange, disabled = false, ...rest }) => {
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

export default Checkbox

const StyledCheckbox = styled(MuiCheckbox)({
   fontSize: 24,
   color: '#B0B0B0',

   '&.MuiCheckbox-root.Mui-checked': {
      color: '#D9830D',
   },

   '&.MuiCheckbox-root.Mui-disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
   },
})
