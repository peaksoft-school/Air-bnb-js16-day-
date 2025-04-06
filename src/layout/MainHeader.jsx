import styled from 'styled-components'
import {
   AppBar as MuiAppBar,
   Toolbar as MuiToolbar,
   IconButton as MuiIconButton,
   Typography as MuiTypography,
   Box as MuiBox,
   Avatar as MuiAvatar,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Button from '../components/UI/Button'
import Meatballs from '../components/UI/Meatballs'
import Air from '../assets/icons/air.svg'

const MainHeader = ({
   isAuthenticated = false,
   onLoginClick,
   onProfileClick,
   onAddLeave,
   JoinTitle,
   Profile,
}) => {
   const menuOptions = [
      { label: 'Edit', action: 'edit' },
      { label: 'Delete', action: 'delete' },
      { label: 'Share', action: 'share' },
   ]

   return (
      <AppBar position="static">
         <Toolbar>
            <LogoBox>
               <IconButton aria-label="Go to homepage">
                  <img src={Air} alt="Company Logo" width="88" height="auto" />
               </IconButton>
            </LogoBox>

            <HeaderBox>
               <StyledTypography variant="body1" onClick={onAddLeave}>
                  leave an ad
               </StyledTypography>

               {isAuthenticated ? (
                  <ProfileBox>
                     <StyledAvatar
                        onClick={onProfileClick}
                        aria-label="Open profile"
                     >
                        {Profile}
                     </StyledAvatar>
                     <Meatballs
                        icon={<ExpandMoreIcon />}
                        options={menuOptions}
                     />
                  </ProfileBox>
               ) : (
                  <Button
                     variant="contained"
                     onClick={onLoginClick}
                     aria-label="Sign up"
                     width={196}
                     sx={{ cursor: 'pointer' }}
                  >
                     {JoinTitle}
                  </Button>
               )}
            </HeaderBox>
         </Toolbar>
      </AppBar>
   )
}

export default MainHeader

const AppBar = styled(MuiAppBar)(() => ({
   width: '100%',
   height: '88px',
   display: 'flex',
   justifyContent: 'center',
   backgroundColor: 'initial !important',
   boxShadow: 'none !important',
   padding: '0px 100px',
}))

const Toolbar = styled(MuiToolbar)(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   paddingLeft: '20px',
   paddingRight: '20px',
}))

const IconButton = styled(MuiIconButton)(() => ({
   cursor: 'pointer',
}))

const LogoBox = styled(MuiBox)(() => ({
   display: 'flex',
   alignItems: 'center',
   background: 'none',
}))

const HeaderBox = styled(MuiBox)(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '60px',
}))

const StyledTypography = styled(MuiTypography)(() => ({
   cursor: 'pointer',
   color: 'white !important',
}))

const ProfileBox = styled(MuiBox)(() => ({
   display: 'flex',
   alignItems: 'center',
}))

const StyledAvatar = styled(MuiAvatar)(() => ({
   backgroundColor: 'blue !important',
   cursor: 'pointer',
}))
