import { TextField } from '@mui/material'
import { styled } from '@mui/system'

const Input = ({
   width,
   type,
   label,
   placeholder,
   onChange,
   onClick,
   icon,
   value,
   ...rest
}) => {
   return (
      <StyledTextField
         type={type}
         label={label}
         placeholder={placeholder}
         value={value}
         onChange={onChange}
         onClick={onClick}
         icon={icon}
         sx={{ width }}
         {...rest}
      />
   )
}

export default Input

const StyledTextField = styled(TextField)(() => ({
   '& .MuiOutlinedInput-root': {
      borderRadius: '2px',
      border: '1px solid #C4C4C4',

      '&:hover fieldset': {
         borderColor: '#828282',
      },

      '&.Mui-focused fieldset': {
         borderColor: '#828282',
      },
   },

   '& .MuiInputLabel-root': {
      color: '#828282',
   },
   '& .MuiInputLabel-root.Mui-focused': {
      color: '#555',
   },
   '& .MuiInputBase-input': {
      color: '#333',
      fontSize: '16px',
      padding: '12px',
   },
}))
