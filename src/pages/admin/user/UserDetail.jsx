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
import {
   fetchUserProfile,
   deleteUser,
} from '../../../store/slices/admin/userThunk'

const UserDetail = () => {
   const { id } = useParams()
   const dispatch = useDispatch()

   const [activeTab, setActiveTab] = useState('booking')

   const { users, userProfile, loading, error } = useSelector((s) => s.user)
   const viewedUser = users.find((u) => u.id === Number(id))

   useEffect(() => {
      dispatch(fetchUserProfile({ choice: activeTab }))
   }, [dispatch, activeTab])

   const handleBlockAll = async () => {
      try {
         await dispatch(deleteUser(id)).unwrap()
      } catch (err) {
         console.error('Blocking error:', err)
      }
   }

   return (
      <UsersBox>
         <ContactBox>
            {viewedUser && (
               <div className="contact-user">
                  <Avatar className="avatar" src={viewedUser.image} />
                  <div className="name-email">
                     <div className="flex">
                        <strong>Name:</strong>
                        <Typography>{viewedUser.fullName}</Typography>
                     </div>
                     <div className="flex">
                        <strong>Contact:</strong>
                        <Typography>{viewedUser.email}</Typography>
                     </div>
                  </div>
               </div>
            )}
         </ContactBox>

         <HousesBox>
            <Tabs
               value={activeTab}
               onChange={(_, v) => setActiveTab(v)}
               centered
            >
               <Tab label="Bookings" value="booking" />
               <Tab label="Announcements" value="announcement" />
            </Tabs>

            {loading ? (
               <CircularProgress sx={{ m: '20% auto' }} />
            ) : error ? (
               <Alert severity="error">{error}</Alert>
            ) : activeTab === 'booking' ? (
               <div className="cards-container">
                  {(userProfile?.bookings || []).map((b, i) => (
                     <AdminCard
                        key={i}
                        title={b.name}
                        price={b.price}
                        location={b.address}
                     />
                  ))}
               </div>
            ) : (
               <>
                  <Button
                     onClick={handleBlockAll}
                     disabled={viewedUser?.isBlocked}
                     className="block-button"
                  >
                     {viewedUser?.isBlocked ? 'Blocked' : 'Block All'}
                  </Button>
                  <div className="cards-container">
                     {(userProfile?.announcements || []).map((a, i) => (
                        <AdminCard
                           key={i}
                           title={a.name}
                           price={a.price}
                           location={a.address}
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
   display: 'flex',
   gap: '47px',
   padding: '46px 0px 193px 0',
   justifyContent: 'center',
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
      minHeight: '100px',
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
      '&:hover': { backgroundColor: '#BB7200' },
      '&:active': { backgroundColor: '#F2B75B' },
      '&:disabled': { backgroundColor: '#C4C4C4' },
   },
}))

export default UserDetail
