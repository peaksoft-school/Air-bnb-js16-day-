import {
   AppBar,
   Toolbar,
   IconButton,
   Typography,
   Box,
   Avatar,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import styled from 'styled-components'
import Button from '../../components/UI/Button'
import Meatballs from '../../components/UI/Meatballs'
import Air from '../../assets/icons/BlackAir.svg'
import Checkbox from '../../components/UI/Checkbox'
import Input from '../../components/UI/Input'

const UserHeader = ({
   isAuthenticated = false,
   onLoginClick,
   onProfileClick,
   onAddLeave,
   JoinTitle = 'JOIN US',
   Profile = 'A',
   favoriteCount = 9,
   handleLeaveAddClick,
}) => {
   const menuOptions = [
      { label: 'Edit', action: 'edit' },
      { label: 'Delete', action: 'delete' },
      { label: 'Share', action: 'share' },
   ]

   return (
      <StyledAppBar position="static">
         <StyledToolbar>
            <LeftBox>
               <LogoBox>
                  <IconButton edge="start">
                     <img
                        src={Air}
                        alt="Company Logo"
                        width="74"
                        height="auto"
                     />
                  </IconButton>
               </LogoBox>
               {!isAuthenticated && (
                  <AdText onClick={handleLeaveAddClick}>leave an ad</AdText>
               )}
            </LeftBox>
            <RightBox>
               <SearchBox>
                  <CheckboxBox>
                     <Checkbox />
                     <Typography
                        variant="body2"
                        color="rgba(82, 82, 82, 1)"
                        fontSize={16}
                     >
                        Search nearby
                     </Typography>
                  </CheckboxBox>

                  <Input placeholder="Search" icon={true} />
               </SearchBox>

               <FavoritesBox>
                  <Button
                     onClick={isAuthenticated ? onAddLeave : onLoginClick}
                     width={196}
                  >
                     {isAuthenticated ? 'SUBMIT AN AD' : JoinTitle}
                  </Button>

                  {isAuthenticated && (
                     <>
                        <Typography variant="body2">
                           FAVORITE({favoriteCount})
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                           <Avatar
                              sx={{
                                 backgroundColor: 'blue',
                                 cursor: 'pointer',
                              }}
                              onClick={onProfileClick}
                              aria-label="Open profile"
                           >
                              {Profile}
                           </Avatar>
                           <Meatballs
                              icon={
                                 <ExpandMoreIcon
                                    sx={{ color: 'tertiary.lightGrey' }}
                                 />
                              }
                              options={menuOptions}
                           />
                        </Box>
                     </>
                  )}
               </FavoritesBox>
            </RightBox>
         </StyledToolbar>
      </StyledAppBar>
   )
}

export default UserHeader
const StyledAppBar = styled(AppBar)(() => ({
   backgroundColor: '#ffffff',
   boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
   padding: '0px 100px',
   height: '88px',
   justifyContent: 'center',
}))

const StyledToolbar = styled(Toolbar)(() => ({
   justifyContent: 'space-between',
}))

const LeftBox = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '60px',
}))

const LogoBox = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '8px',
}))

const AdText = styled(Typography)(() => ({
   fontSize: '18px',
   color: 'rgba(255, 190, 88, 1)',
   cursor: 'pointer',
}))

const RightBox = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   gap: '30px',
}))

const SearchBox = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   gap: '30px',
}))

const CheckboxBox = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
}))

const FavoritesBox = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '16px',
}))
