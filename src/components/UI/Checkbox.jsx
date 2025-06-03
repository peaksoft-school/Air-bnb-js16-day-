import { Checkbox as MuiCheckbox, styled } from '@mui/material'

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
