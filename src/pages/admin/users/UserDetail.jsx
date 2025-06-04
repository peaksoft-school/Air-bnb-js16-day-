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
import {
   fetchUserProfile,
   deleteHouse,
   blockAllAnnoucement,
} from '../../../store/slices/admin/userThunk'
import { CardOptions } from '../../../utils/helpers/options'

const UserDetail = () => {
   const { id } = useParams()
   const dispatch = useDispatch()

   const [activeTab, setActiveTab] = useState('booking')
   const { userProfile, loading, error } = useSelector((s) => s.user)
   const user = userProfile?.user

   useEffect(() => {
      dispatch(fetchUserProfile({ choice: activeTab, id }))
   }, [dispatch, activeTab, id])

   const handleBlockAll = async (id) => {
      try {
         await dispatch(blockAllAnnoucement(id)).unwrap()
      } catch (err) {
         console.error('Blocking error:', err)
      }
   }

   const links = [
      { href: '/admin/users', label: 'Users' },
      { href: `/users/${id}`, label: ` ${user.fullName}` },
   ]
   const options = CardOptions

   const handleDeleteHouse = async (houseId) => {
      try {
         await dispatch(deleteHouse(houseId)).unwrap()
      } catch (err) {
         console.error('Delete error:', err)
      }
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
                  <div className="contact-user">
                     <Avatar
                        className="avatar"
                        src={user.image}
                        aria-label="User avatar"
                     />
                     <div className="name-email">
                        <div className="flex">
                           <strong className="name-text">Name:</strong>
                           <Typography className="contact-name">
                              {user.fullName}
                           </Typography>
                        </div>
                        <div className="flex">
                           <strong className="name-text">Contact:</strong>
                           <Typography className="contact-name">
                              {user.email}
                           </Typography>
                        </div>
                     </div>
                  </div>
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
               <div className="cards-container">
                  {userProfile?.houses.map((house, i) => (
                     <AdminCard
                        key={i}
                        house={house}
                        options={options}
                        onDelete={(houseId) => handleDeleteHouse(houseId)}
                     />
                  ))}
               </div>
            ) : (
               <>
                  <Button
                     onClick={() => handleBlockAll(user?.id)}
                     disabled={user?.isBlocked}
                     className="block-button"
                  >
                     {user?.isBlocked ? 'Blocked' : 'Block All'}
                  </Button>
                  <div className="cards-container">
                     {userProfile?.houses.map((house, i) => (
                        <AdminCard
                           key={i}
                           house={house}
                           options={options}
                           onDelete={(houseId) => handleDeleteHouse(houseId)}
                        />
                     ))}
                  </div>
               </>
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
      top: '670px',
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
      '&:hover': { backgroundColor: '#BB7200' },
      '&:active': { backgroundColor: '#F2B75B' },
      '&:disabled': { backgroundColor: '#C4C4C4' },
   },
   '& .cards-container': {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      padding: '37px 0 0 0',
   },
}))

export default UserDetail
