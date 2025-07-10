import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import {
   Box,
   styled,
   Tab,
   Tabs,
   Avatar,
   Button,
   Typography,
   CircularProgress,
   Alert,
} from '@mui/material'
import AdminCard from '../../../pages/admin/AdminCard'
import BreadCrumbs from '../../UI/Breadcrumbs'
import { USERS_THUNKS } from '../../../store/slices/admin/users/usersThunk'
import { ADMIN_CARD_OPTIONS } from '../../../utils/helpers'
import Loading from '../../../pages/Loading'

const UserDetail = () => {
   const { userProfile, loading, error } = useSelector((state) => state.users)

   const [activeTab, setActiveTab] = useState('booking')
   const [isBlocked, setIsBlocked] = useState(false)

   const { id } = useParams()

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const user = userProfile?.user
   const houses = userProfile?.houses || []

   useEffect(() => {
      if (user?.isBlocked !== undefined) {
         setIsBlocked(user.isBlocked)
      }
   }, [user?.isBlocked])

   useEffect(() => {
      dispatch(USERS_THUNKS.getUserProfile({ choice: activeTab, id }))
   }, [dispatch, activeTab, id])

   const handleBlockAll = async (id) => {
      try {
         await dispatch(USERS_THUNKS.blockAllAnnoucement(id)).unwrap()
         setIsBlocked(!isBlocked)
      } catch (error) {
         console.error('Error blocking user:', error)
      }
   }

   const links = [
      { href: '/admin/users', label: 'Users' },
      { href: `/users/${id}`, label: user?.fullName || 'User' },
   ]

   const handleDeleteHouse = (houseId) => {
      dispatch(USERS_THUNKS.deleteHouse(houseId))
   }

   const handleNavigate = (houseId) => {
      navigate(`/admin/users/${id}/announcement/${houseId}`)
   }

   if (loading) {
      return (
         <>
            <Loading />
         </>
      )
   }

   if (error) {
      return (
         <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="400px"
         >
            <Alert severity="error">{error}</Alert>
         </Box>
      )
   }

   if (!userProfile) {
      return (
         <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="400px"
         >
            <Alert severity="info">No user data available</Alert>
         </Box>
      )
   }

   return (
      <UsersBox>
         <Box className="box-users">
            <BreadCrumbs links={links} />

            <Typography variant="h4" gutterBottom>
               {user?.fullName || 'User'}
            </Typography>

            <ContactBox>
               {user && (
                  <Box className="contact-user">
                     <Avatar
                        className="avatar"
                        src={user?.image}
                        aria-label="User avatar"
                     />

                     <Box className="name-email">
                        <Box className="flex">
                           <Typography variant="strong" className="name-text">
                              Name:
                           </Typography>

                           <Typography className="contact-name">
                              {user?.fullName}
                           </Typography>
                        </Box>

                        <Box className="flex">
                           <Typography variant="strong" className="name-text">
                              Contact:
                           </Typography>

                           <Typography className="contact-name">
                              {user?.email}
                           </Typography>
                        </Box>
                     </Box>
                  </Box>
               )}
            </ContactBox>
            {activeTab === 'announcement' && (
               <Button
                  onClick={() => handleBlockAll(user?.id)}
                  disabled={!user?.id}
                  className="block-button"
               >
                  {isBlocked ? 'Blocked' : 'Block All Announcements'}
               </Button>
            )}
         </Box>

         <HousesBox>
            <Tabs
               value={activeTab}
               onChange={(_, v) => setActiveTab(v)}
               indicatorColor="secondary"
               textColor="inherit"
               variant="standard"
               centered
               className="tabs"
            >
               <Tab label="Bookings" value="booking" />
               <Tab label="Announcements" value="announcement" />
            </Tabs>

            {houses.length === 0 ? (
               <Alert severity="info">Ничего нет!</Alert>
            ) : (
               <Box className="cards-container">
                  {houses.map((house, i) => (
                     <AdminCard
                        key={house.id || i}
                        house={house}
                        options={ADMIN_CARD_OPTIONS}
                        onDelete={(houseId) => handleDeleteHouse(houseId)}
                        onNavigate={() =>
                           handleNavigate(house.houseId || house.id)
                        }
                     />
                  ))}
               </Box>
            )}
         </HousesBox>
      </UsersBox>
   )
}

const UsersBox = styled(Box)(() => ({
   width: '100%',
   height: '100%',
   display: 'flex',
   gap: '47px',
   justifyContent: 'center',

   '& .box-users': {
      display: 'flex',
      gap: '22px',
      flexDirection: 'column',
   },

   '& .block-button': {
      position: 'absolute',
      left: '137px',
      top: '600px',
      width: '292px',
      height: '37px',
      borderRadius: '2px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      textTransform: 'uppercase',
      fontFamily: 'Arial',
      fontWeight: '500',
      fontSize: '14px',
      color: '#F7F7F7',
      backgroundColor: '#DD8A08',

      '&:hover': {
         backgroundColor: '#BB7200',
      },

      '&:active': {
         backgroundColor: '#F2B75B',
      },

      '&:disabled': {
         backgroundColor: '#C4C4C4',
      },
   },
}))

const ContactBox = styled(Box)(() => ({
   width: '413px',
   height: '251px',
   border: 'solid 1px #C4C4C4',
   borderRadius: '16px',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',

   '& .avatar': {
      width: '89px',
      height: '89px',
   },

   '& .contact-name': {
      fontSize: '18px',
      fontWeight: '700',
      lineHeight: '100%',
      color: '#363636',
      fontFamily: 'Inter',
   },

   '& .flex': {
      display: 'flex',
      gap: '16px',
   },

   '& .name-text': {
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '100%',
      color: '#363636',
      fontFamily: 'Inter',
   },

   '& .contact-user': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '30px',
   },

   '& .name-email': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
   },
}))

const HousesBox = styled(Box)(() => ({
   marginTop: '115px',
   width: '900px',

   '& .tabs': {
      maxWidth: '100%',
      borderBottom: '1px solid #C4C4C4',

      '& .MuiTabs-indicator': {
         backgroundColor: '#000',
      },
   },

   '& .cards-container': {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      padding: '37px 0 0 0',
   },
}))

export default UserDetail
