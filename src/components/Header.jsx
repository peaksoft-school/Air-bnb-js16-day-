import {
   AppBar,
   Toolbar,
   IconButton,
   Typography,
   Box,
} from '@mui/material'
import Input from './UI/Input'
import Button from './UI/Button'
import Checkbox from './UI/Checkbox'
import Air from '../assets/icons/BlackAir.svg'

const Header = ({ title, handleClick }) => {
   return (
      <AppBar
         sx={{
            width: '100%',
            height: '88px',
            display: 'flex',
            justifyContent: 'center',
         }}
      >
         <Toolbar sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '60px' }}>
               <IconButton>
                  <img src={Air} alt="Logo" />
               </IconButton>

               <Typography
                  variant="h6"
                  onClick={handleClick}
                  sx={{ cursor: 'pointer', color: 'secondary.lightBrown' }}
               >
                  leave an ad
               </Typography>

            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
               <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox />
                  <Typography>Search nearby</Typography>
               </Box>
               <Input icon={true} placeholder={'Search'} />

               <Button width={196}>{title}</Button>
            </Box>

         </Toolbar>
      </AppBar>
   )
}

export default Header
