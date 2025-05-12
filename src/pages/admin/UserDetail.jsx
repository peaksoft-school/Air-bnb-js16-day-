import { useState } from 'react'
import axios from '../../utils/axios'
import { useParams } from 'react-router'
import {
   Box,
   styled,
   Tab,
   Tabs,
   Avatar,
   Button,
   Typography,
} from '@mui/material'
import AdminCard from './AdminCard'
import BreadCrumbs from '../../components/UI/BreadCrumbs'

const UserDetail = () => {
   const { id } = useParams()
   const [user, setUser] = useState([])
   const [bookings, setBookings] = useState([
      {
         image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
         price: 26,
         rating: 3.4,
         address: 'Beautiful and picturesque...',
         location: '12 Morris Ave, Torontohtsjhgjghghssfgshnbjhgfhjhgd',
         guests: 2,
      },
      {
         image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
         price: 26,
         rating: 3.4,
         address: 'Beautiful and picturesque...',
         location: '12 Morris Ave, Toronto',
         guests: 2,
      },
   ])
   const [announcements, setAnnouncements] = useState([])

   const [isBlocked, setIsBlocked] = useState(false)
   const [activeTab, setActiveTab] = useState('bookings')

   const options = [
      { label: 'Edit', value: 'edit' },
      { label: 'Delete', value: 'delete' },
   ]
   const links = [
      { href: '/admin/users', label: 'Users' },
      { htef: '/users/:id', label: `User ${id}` },
   ]

   const handleBlockAll = async () => {
      try {
         await axios.delete(`/user/delete`, { params: { userId: id } })
         setIsBlocked(true)
      } catch (err) {
         console.error('Ошибка блокировки:', err)
      }
   }

   return (
      <UsersBox>
         <Box className="box-users">
            <BreadCrumbs links={links} />
            <div>
               <h1>Медер медербеков</h1>
            </div>
            <ContactBox>
               {user && (
                  <div className="contact-user">
                     <Avatar
                        className="avatar"
                        src={user.image}
                        aria-label="Open profile"
                     />

                     <div className="name-email">
                        <div className="flex">
                           <strong className="name-text">Name:</strong>
                           <Typography className="contact-name">
                              Медер Медербеков
                           </Typography>
                        </div>

                        <div className="flex">
                           <strong className="name-text">Contact:</strong>
                           <Typography className="contact-name">
                              mederbekov@gmail.com
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
               onChange={(e, newValue) => setActiveTab(newValue)}
               indicatorColor="secondary"
               textColor="inherit"
               variant="standard"
               centered
               className="tabs"
            >
               <Tab label="Bookings" value="bookings" />
               <Tab label="My Announcements" value="announcements" />
            </Tabs>

            {activeTab === 'bookings' ? (
               <div
                  style={{
                     display: 'flex',
                     flexWrap: 'wrap',
                     padding: '37px 0 0 0  ',
                     gap: '20px',
                  }}
               >
                  {bookings.map((house, i) => (
                     <AdminCard
                        key={i}
                        imageUrls={[house.image]}
                        price={house.price}
                        rating={house.rating || 0}
                        title={house.address}
                        location={house.location || house.address}
                        guests={house.guests}
                        options={options}
                     />
                  ))}
               </div>
            ) : (
               <>
                  <Button
                     onClick={handleBlockAll}
                     disabled={isBlocked}
                     className="block-button"
                  >
                     {isBlocked ? 'Blocked' : 'Block All Announcements'}
                  </Button>

                  <div
                     style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '20px',
                        padding: '37px 0 0 0  ',
                     }}
                  >
                     {announcements.map((house, i) => (
                        <AdminCard
                           key={i}
                           imageUrls={[house.image]}
                           price={house.price}
                           rating={house.rating || 0}
                           title={house.address}
                           location={house.location || house.address}
                           guests={house.guests}
                           sx={{
                              opacity: isBlocked ? 0.5 : 1,
                              pointerEvents: isBlocked ? 'none' : 'auto',
                           }}
                           options={options}
                        />
                     ))}
                  </div>
               </>
            )}
         </HousesBox>
      </UsersBox>
   )
}

export default UserDetail

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
      Maxwidth: '100%',
      Minheigth: '100px',
      borderBottom: '1px  solid #C4C4C4',
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
