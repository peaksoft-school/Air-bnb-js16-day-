import { InputAdornment, styled, TextField } from '@mui/material'
import Search from '../../assets/icons/search.svg'

const Input = ({
   type,
   label,
   placeholder,
   onChange,
   onClick,
   icon = false,
   value,
   sizeVariant = 'default',
   ...rest
}) => (
   <StyledTextField
      type={type}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onClick={onClick}
      sizevariant={sizeVariant}
      InputProps={{
         startAdornment: icon ? (
            <InputAdornment position="start">
               <img src={Search} alt="Search" />
            </InputAdornment>
         ) : null,
      }}
      {...rest}
   />
)

export default Input

const StyledTextField = styled(TextField)(({ sizevariant }) => ({
   '& .MuiOutlinedInput-root': {
      borderRadius: '2px',
      width: sizevariant === 'large' ? '725px' : '414px',
      backgroundColor: sizevariant === 'large' ? '#F7F7F7' : '#c4c4c40',
      height: sizevariant === 'large' ? '42px' : '37px',

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
