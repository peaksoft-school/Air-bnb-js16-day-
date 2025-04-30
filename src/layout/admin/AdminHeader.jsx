import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Meatballs from '../../components/UI/Meatballs'
import Air from '../../assets/icons/air.svg'
import styled from 'styled-components'
import { NavLink } from 'react-router'

const AdminHeader = () => {
   const menuOptions = [{ label: 'Log out', action: 'log-out' }]

   return (
      <StyledAppBar position="static">
         <Toolbar className="toolbar">
            <Box className="left-box">
               <Box>
                  <IconButton edge="start">
                     <img src={Air} alt="Company Logo" width="72" />
                  </IconButton>
               </Box>

               <Box className="navigation-container">
                  <NavLink to={'application'} className="nav-text">
                     {' '}
                     Application
                  </NavLink>
                  <NavLink to={'users'} className="nav-text">
                     Users{' '}
                  </NavLink>
                  <NavLink to={'allhousing'} className="nav-text">
                     {' '}
                     AllHousing
                  </NavLink>
               </Box>
            </Box>

            <Box className="right-box">
               <Box className="user-container">
                  <Typography>Administrator</Typography>

                  <Meatballs
                     icon={<ExpandMoreIcon className="expand-icon" />}
                     options={menuOptions}
                  />
               </Box>
            </Box>
         </Toolbar>
      </StyledAppBar>
   )
}

export default AdminHeader

const StyledAppBar = styled(AppBar)(() => ({
   width: '100%',
   display: 'flex !important',
   alignItems: 'stretch',
   justifyContent: 'center',
   backgroundColor: 'black !important',
   boxShadow: 'none !important',
   padding: '14px 40px',
   margin: 'auto',

   '& .toolbar': {
      display: 'flex',
      justifyContent: 'space-between',

      '& .left-box': {
         display: 'flex',
         alignItems: 'center',
         gap: '83px',

         '& .navigation-container': {
            display: 'flex',
            justifyContent: 'space-between',
            gap: '36px',
            color: 'white',
            '& .nav-text': {
               color: '#E5E5E5',
               fontFamily: " 'Inter', sans-serif",
               textDecoration: 'none',
               fontWeight: '400',
               fontSize: '18px',
               lineHeight: '100%',
               letterSpacing: '0%',
               '&.active': {
                  color: '#FF4B4B',
               },
            },
         },
      },

      '& .right-box': {
         display: 'flex',
         alignItems: 'center',
         gap: '16px',

         '& .user-container': {
            display: 'flex',
            alignItems: 'center',
            color: 'white',
         },

         '& .expand-icon': {
            color: 'grey',
         },
      },
   },
}))
