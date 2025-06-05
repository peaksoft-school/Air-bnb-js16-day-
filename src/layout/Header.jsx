import {
   AppBar as MuiAppBar,
   Toolbar,
   IconButton,
   Typography,
   Box,
   Avatar,
   styled,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Button from '../components/UI/Button'
import Meatballs from '../components/UI/Meatballs'
import Air from '../assets/icons/air.svg'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { AUTH_ACTIONS } from '../store/slices/auth/authSlice'

const Header = ({ onJoinUs, onProfileClick, onAddLeave, isAuthenticated }) => {
   const dispach = useDispatch()
   const navigate = useNavigate()
   const menuOptions = [
      { label: 'My profile', action: 'my-profile' },
      { label: 'Log out', action: 'log-out' },
   ]

   const handleMenuAction = (action) => {
      if (action.action === 'log-out') {
         dispach(AUTH_ACTIONS.logOut({ navigate }))
      }
   }

   return (
      <AppBar position="static">
         <Toolbar className="toolbar-container">
            <Box className="icon-container">
               <IconButton aria-label="Go to homepage">
                  <img src={Air} alt="Company Logo" width="80" />
               </IconButton>
            </Box>

            <Box className="header-box">
               <Typography className="text" onClick={onAddLeave}>
                  leave an ad
               </Typography>

               {isAuthenticated ? (
                  <Box className="profile-box">
                     <Avatar
                        className="avatar"
                        onClick={onProfileClick}
                        aria-label="Open profile"
                     />

                     <Meatballs
                        icon={<ExpandMoreIcon className="expend-icon" />}
                        options={menuOptions}
                        onSelect={handleMenuAction}
                     />
                  </Box>
               ) : (
                  <Button onClick={onJoinUs} width={196}>
                     JOIN US
                  </Button>
               )}
            </Box>
         </Toolbar>
      </AppBar>
   )
}

export default Header

const AppBar = styled(MuiAppBar)(() => ({
   width: '100%',
   display: 'flex',
   justifyContent: 'center',
   boxShadow: 'none',
   padding: '10px 100px',
   backgroundColor: 'inherit',

   '& .toolbar-container': {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0 20px',

      '& .icon-container': {
         display: 'flex',
         alignItems: 'center',
         background: 'none',
      },
   },

   '& .header-box': {
      display: 'flex',
      alignItems: 'center',
      gap: '60px',

      '& .text': {
         cursor: 'pointer',
         color: 'white',
      },

      '& .profile-box': {
         display: 'flex',
         alignItems: 'center',

         '& .avatar': {
            backgroundColor: 'blue',
            cursor: 'pointer',
         },

         '& .expend-icon': {
            color: 'grey',
         },
      },
   },
}))
