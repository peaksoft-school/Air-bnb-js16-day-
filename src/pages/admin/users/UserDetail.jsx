import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
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
import AdminCard from '../AdminCard'
import BreadCrumbs from '../../../components/UI/BreadCrumbs'
import { USERS_THUNKS } from '../../../store/slices/admin/users/userThunk'
import { ADMIN_CARD_OPTIONS } from '../../../utils/helpers'

const UserDetail = () => {
   const { userProfile, loading, error } = useSelector((state) => state.users)

   const [activeTab, setActiveTab] = useState('booking')

   const { id } = useParams()

   const dispatch = useDispatch()

   const user = userProfile?.user

   useEffect(() => {
      dispatch(USERS_THUNKS.getUserProfile({ choice: activeTab, id }))
   }, [dispatch, activeTab, id])

   const handleBlockAll = (id) => {
      dispatch(blockAllAnnoucement(id))
   }

   const links = [
      { href: '/admin/users', label: 'Users' },
      { href: `/users/${id}`, label: `User ${id}` },
   ]

   const handleDeleteHouse = (houseId) => {
      dispatch(deleteHouse(houseId))
   }

   return (
      <UsersBox>
         <Box className="box-users">
            <BreadCrumbs links={links} />

            <Typography variant="h4" gutterBottom>
               {user?.fullName}
            </Typography>

            <ContactBox>
               {user && (
                  <Box className="contact-user">
                     <Avatar
                        className="avatar"
                        src={user.image}
                        aria-label="User avatar"
                     />

                     <Box className="name-email">
                        <Box className="flex">
                           <Typography variant="strong" className="name-text">
                              Name:
                           </Typography>

                           <Typography className="contact-name">
                              {user.fullName}
                           </Typography>
                        </Box>

                        <Box className="flex">
                           <Typography variant="strong" className="name-text">
                              Contact:
                           </Typography>

                           <Typography className="contact-name">
                              {user.email}
                           </Typography>
                        </Box>
                     </Box>
                  </Box>
               )}
            </ContactBox>
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

            {loading ? (
               <CircularProgress />
            ) : error ? (
               <Alert severity="error">{error}</Alert>
            ) : activeTab === 'booking' ? (
               <Box className="cards-container">
                  {userProfile?.houses.map((house, i) => (
                     <AdminCard
                        key={i}
                        house={house}
                        options={ADMIN_CARD_OPTIONS}
                        onDelete={(houseId) => handleDeleteHouse(houseId)}
                     />
                  ))}
               </Box>
            ) : (
               <>
                  <Button
                     onClick={handleBlockAll(user?.id)}
                     disabled={user?.isBlocked}
                     className="block-button"
                  >
                     {user?.isBlocked ? 'Blocked' : 'Block All'}
                  </Button>

                  <Box className="cards-container">
                     {userProfile?.houses.map((house, i) => (
                        <AdminCard
                           key={i}
                           house={house}
                           options={ADMIN_CARD_OPTIONS}
                           onDelete={(houseId) => handleDeleteHouse(houseId)}
                        />
                     ))}
                  </Box>
               </>
            )}
         </HousesBox>
      </UsersBox>
   )
}

const UsersBox = styled(Box)(() => ({
   display: 'flex',
   gap: '47px',
   padding: '46px 0px 193px 0',
   justifyContent: 'center',

   '& .box-users': {
      display: 'flex',
      gap: '22px',
      flexDirection: 'column',
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
   marginTop: '96px',
   width: '900px',

   '& .tabs': {
      maxWidth: '100%',
      borderBottom: '1px solid #C4C4C4',

      '& .MuiTabs-indicator': {
         backgroundColor: '#000',
      },
   },

   '& .block-button': {
      position: 'absolute',
      left: '137px',
      top: '580px',
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

   '& .cards-container': {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      padding: '37px 0 0 0',
   },
}))

export default UserDetail
