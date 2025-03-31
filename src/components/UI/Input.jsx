import { InputAdornment, TextField } from '@mui/material'
import Search from '../../assets/icons/Search.svg'
import styled from 'styled-components'

const Input = ({
   type,
   label,
   placeholder,
   onChange,
   onClick,
   icon = false,
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
         InputProps={{
            startAdornment: icon ? (
               <InputAdornment position="start">
                  {icon && <img src={Search} alt="Search" />}
               </InputAdornment>
            ) : null,
         }}
         {...rest}
      />
   )
}

export default Input

const StyledTextField = styled(TextField)(() => ({
   '& .MuiOutlinedInput-root': {
      borderRadius: '2px',
      width: '414px',

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
