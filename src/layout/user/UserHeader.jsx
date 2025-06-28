import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
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
import Air from '../../assets/icons/black-air.svg'
import Checkbox from '../../components/UI/Checkbox'
import Input from '../../components/UI/Input'
import { AUTH_ACTIONS } from '../../store/slices/auth/authSlice'
import { useState } from 'react'
import { USER_OPTIONS } from '../../utils/helpers'
import { REGION_ACTIONS } from '../../store/slices/user/region/regionSlice'
import { ROUTES } from '../../routes/routes'

const UserHeader = ({
   isAuth,
   onJoinUs,
   onProfileClick,
   onAddLeave,
   favoriteCount = 9,
   handleLeaveAddClick,
}) => {
   const [searchValue, setSearchValue] = useState('')

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const handleMenuSelect = (option) => {
      if (option.action === 'my-profile') {
         navigate('/user/profile')
      }
      if (option.action === 'log-out') {
         dispatch(AUTH_ACTIONS.logOut({ navigate }))
      }
   }

   const handleSearchChange = (e) => {
      setSearchValue(e.target.value)
      dispatch(REGION_ACTIONS.setSearch(e.target.value))
   }

   const goToFavorites = () => {
      navigate(ROUTES.USER.FAVORITE)
   }

   return (
      <StyledAppBar position="static">
         <Toolbar className="toolbar-container">
            <Box className="left-box">
               <Box className="logo-box">
                  <IconButton edge="start">
                     <img src={Air} alt="Company Logo" width="74" />
                  </IconButton>
               </Box>

               {!isAuth && (
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

                  <Input
                     placeholder="Search"
                     icon={true}
                     value={searchValue}
                     onChange={handleSearchChange}
                  />
               </Box>

               <Box className="favorites-container">
                  <Button onClick={isAuth ? onAddLeave : onJoinUs} width={196}>
                     {isAuth ? 'SUBMIT AN AD' : 'JOIN US'}
                  </Button>

                  {!isAuth && (
                     <>
                        <Typography
                           onClick={goToFavorites}
                           sx={{ cursor: 'pointer', fontWeight: 500 }}
                        >
                           FAVORITE
                        </Typography>

                        <Box className="avatar-container">
                           <Avatar
                              className="avatar"
                              onClick={onProfileClick}
                              aria-label="Open profile"
                           />

                           <Meatballs
                              icon={<ExpandMoreIcon className="expend-icon" />}
                              options={USER_OPTIONS}
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
   padding: '16px 100px',

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
