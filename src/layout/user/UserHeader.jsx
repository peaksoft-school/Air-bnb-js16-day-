import {
   AppBar,
   Toolbar,
   IconButton,
   Typography,
   Box,
   Avatar,
   styled,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Button from '../../components/UI/Button'
import Meatballs from '../../components/UI/Meatballs'
import Air from '../../assets/icons/BlackAir.svg'
import Checkbox from '../../components/UI/Checkbox'
import Input from '../../components/UI/Input'
import { useDispatch } from 'react-redux'
import { AUTH_ACTIONS } from '../../store/slices/auth/authSlice'
import { useNavigate } from 'react-router'

const UserHeader = ({
   isAuthenticated,
   onJoinUs,
   onProfileClick,
   onAddLeave,
   favoriteCount = 9,
   handleLeaveAddClick,
}) => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleLogout = () => {
      dispatch(AUTH_ACTIONS.logOut())
      navigate('/')
   }

   const handleMenuSelect = (option) => {
      if (option.action === 'log-out') {
         handleLogout()
      }
   }

   const menuOptions = [
      { label: 'My profile', action: 'my-profile' },
      { label: 'Log out', action: 'log-out' },
   ]

   return (
      <StyledAppBar position="static">
         <Toolbar className="toolbar-container">
            <Box className="left-box">
               <Box className="logo-box">
                  <IconButton edge="start">
                     <img src={Air} alt="Company Logo" width="74" />
                  </IconButton>
               </Box>

               {!isAuthenticated && (
                  <Typography className="leave" onClick={handleLeaveAddClick}>
                     leave an ad
                  </Typography>
               )}
            </Box>

            <Box className="right-box">
               <Box className="search-container">
                  <Box className="checkbox-container">
                     <Checkbox />
                     <Typography className="search-text">
                        Search nearby
                     </Typography>
                  </Box>

                  <Input placeholder="Search" icon={true} />
               </Box>

               <Box className="favorites-container">
                  <Button
                     onClick={isAuthenticated ? onAddLeave : onJoinUs}
                     width={196}
                  >
                     {isAuthenticated ? 'SUBMIT AN AD' : 'JOIN US'}
                  </Button>

                  {isAuthenticated && (
                     <>
                        <Typography>FAVORITE({favoriteCount})</Typography>

                        <Box className="avatar-container">
                           <Avatar
                              className="avatar"
                              onClick={onProfileClick}
                              aria-label="Open profile"
                           />
                           <Meatballs
                              icon={<ExpandMoreIcon className="expend-icon" />}
                              options={menuOptions}
                              onSelect={handleMenuSelect}
                           />
                        </Box>
                     </>
                  )}
               </Box>
            </Box>
         </Toolbar>
      </StyledAppBar>
   )
}

export default UserHeader

const StyledAppBar = styled(AppBar)(({ theme }) => ({
   backgroundColor: '#ffffff',
   boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
   padding: '25px 100px',
   height: '88px',

   '& .toolbar-container': {
      justifyContent: 'space-between',

      '& .left-box': {
         display: 'flex',
         alignItems: 'center',
         gap: '60px',

         '& .logo-box': {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
         },

         '& .leave': {
            fontSize: '18px',
            color: 'rgba(255, 190, 88, 1)',
            cursor: 'pointer',
         },
      },

      '& .right-box': {
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         gap: '30px',

         '& .search-container': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '30px',

            '& .checkbox-container': {
               display: 'flex',
               alignItems: 'center',

               '& .search-text': {
                  color: 'rgba(82, 82, 82, 1)',
               },
            },
         },

         '& .favorites-container': {
            display: 'flex',
            alignItems: 'center',
            gap: '16px',

            '& .avatar-container': {
               display: 'flex',
               alignItems: 'center',

               '& .avatar': {
                  backgroundColor: 'blue',
                  width: 30,
                  height: 30,
               },

               '& .expend-icon': {
                  color: `${theme.palette.tertiary.lightGrey}`,
               },
            },
         },
      },
   },
}))
