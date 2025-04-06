import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material'
import styled from 'styled-components'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Meatballs from '../../components/UI/Meatballs'
import Air from '../../assets/icons/air.svg'

const AdminHeader = ({
   userRole = 'Administrator',
   menuOptions = [
      { label: 'Edit', action: 'edit' },
      { label: 'Delete', action: 'delete' },
      { label: 'Share', action: 'share' },
   ],
   Application,
   Users,
   AllHousing,
}) => {
   return (
      <StyledAppBar position="static">
         <StyledToolbar>
            <LeftBox>
               <Box>
                  <IconButton edge="start">
                     <img
                        src={Air}
                        alt="Company Logo"
                        width="72"
                        height="auto"
                     />
                  </IconButton>
               </Box>
               <TitleBox>
                  <Typography color="white">{Application}</Typography>
                  <Typography color="white">{Users}</Typography>
                  <Typography color="white">{AllHousing}</Typography>
               </TitleBox>
            </LeftBox>

            <RightBox>
               <UserBox>
                  <Typography variant="body2" color="white" fontSize={18}>
                     {userRole}
                  </Typography>
                  <Meatballs
                     icon={
                        <ExpandMoreIcon
                           sx={{ color: 'primary.white' }}
                           fontSize="large"
                        />
                     }
                     options={menuOptions}
                  />
               </UserBox>
            </RightBox>
         </StyledToolbar>
      </StyledAppBar>
   )
}

export default AdminHeader

const StyledAppBar = styled(AppBar)(() => ({
   display: 'flex',
   justifyContent: 'center',
   backgroundColor: 'black !important',
   boxShadow: 'none !important',
   height: '82px',
   padding: '0px 40px',
}))

const StyledToolbar = styled(Toolbar)(() => ({
   display: 'flex',
   justifyContent: 'space-between',
}))

const LeftBox = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '83px',
}))

const TitleBox = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   gap: '36px',
}))

const RightBox = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   gap: '16px',
}))

const UserBox = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
}))
