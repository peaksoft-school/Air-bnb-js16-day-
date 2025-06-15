import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
   Box,
   styled,
   Tab,
   Tabs,
   Avatar,
   Typography,
   CircularProgress,
   Alert,
   Button,
} from '@mui/material'
import Card from '../../../components/UI/cards/Card'
import BreadCrumbs from '../../../components/UI/BreadCrumbs'
import DropDown from '../../../components/UI/DropDown'
import Chip from '../../../components/UI/Chip'
import { AUTH_ACTIONS } from '../../../store/slices/auth/authSlice'
import { useNavigate } from 'react-router'
import { PROFILE_THUNK } from '../../../store/slices/user/profile/profileThunk'

const TABS = [
   { label: 'Bookings', value: 'booking' },
   { label: 'My announcement', value: 'announcement' },
   { label: 'On moderation', value: 'on moderation' },
]

const sortOptions = [
   { label: 'All', value: '' },
   { label: 'High to low', value: 'high' },
   { label: 'Low to high', value: 'low' },
]
const ratingOptions = [
   { label: 'All', value: '' },
   { label: '★★★★★', value: 5 },
   { label: '★★★★', value: 4 },
   { label: '★★★', value: 3 },
   { label: '★★', value: 2 },
   { label: '★', value: 1 },
]

const typeOptions = [
   { label: 'All', value: '' },
   { label: 'Apartement', value: 'apartement' },
   { label: 'House', value: 'house' },
]

const Profile = () => {
   const { userProfile, loading, error } = useSelector((state) => state.profile)

   // const user = userProfile?.user

   const { fullName, email, image } = userProfile.user

   const [activeTab, setActiveTab] = useState('booking')
   const [sort, setSort] = useState('')
   const [type, setType] = useState('')
   const [rating, setRating] = useState('')

   const navigate = useNavigate()
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(PROFILE_THUNK.getUserProfile({ choice: activeTab }))
   }, [dispatch, activeTab])

   const filteredHouses = (userProfile?.houses || [])
      .filter((house) => {
         if (type && house.type !== type) return false
         if (rating && Math.round(house.rating) !== Number(rating)) return false
         return true
      })
      .sort((a, b) => {
         if (sort === 'high') return b.price - a.price
         if (sort === 'low') return a.price - b.price
         return 0
      })

   const handleClearAll = () => {
      setSort('')
      setType('')
      setRating('')
   }

   const handleDeleteChip = (filter) => {
      if (filter === 'sort') setSort('')
      if (filter === 'type') setType('')
      if (filter === 'rating') setRating('')
   }

   const handleLogout = () => {
      dispatch(AUTH_ACTIONS.logOut())

      navigate('/')
   }

   const links = [
      { href: '/user', label: 'Main' },
      { href: '/user/profile', label: 'Profile' },
   ]

   return (
      <ProfileWrapper>
         <BreadCrumbs links={links} />

         <ProfileBox>
            <LeftBox>
               <Typography className="profile-title">PROFILE</Typography>
               <ProfileCard>
                  <Avatar className="avatar">
                     {<img src={image} alt="" /> || 'U'}
                  </Avatar>

                  <Typography className="profile-name">
                     Name: {fullName}
                  </Typography>

                  <Typography className="profile-email">
                     Contact: {email}
                  </Typography>

                  <Button
                     className="logout-btn"
                     color="error"
                     onClick={handleLogout}
                  >
                     Log out
                  </Button>
               </ProfileCard>
            </LeftBox>

            <RightBox>
               <Tabs
                  value={activeTab}
                  onChange={(_, v) => setActiveTab(v)}
                  indicatorColor="secondary"
                  textColor="inherit"
                  variant="standard"
                  className="tabs"
               >
                  {TABS.map((tab) => (
                     <Tab key={tab.value} label={tab.label} value={tab.value} />
                  ))}
               </Tabs>

               {activeTab === 'announcement' && (
                  <>
                     <Box className="drop-downs">
                        <DropDown
                           label="Sort"
                           value={sort}
                           onChange={setSort}
                           options={sortOptions}
                        />

                        <DropDown
                           label="Type"
                           value={type}
                           onChange={setType}
                           options={typeOptions}
                        />

                        <DropDown
                           label="Sort by ratings"
                           value={rating}
                           onChange={setRating}
                           options={ratingOptions}
                        />
                     </Box>

                     <Box className="sort-content">
                        {sort && (
                           <Chip
                              label={
                                 sort === 'high' ? 'High to low' : 'Low to high'
                              }
                              onDelete={() => handleDeleteChip('sort')}
                           />
                        )}

                        {type && (
                           <Chip
                              label={
                                 type.charAt(0).toUpperCase() + type.slice(1)
                              }
                              onDelete={() => handleDeleteChip('type')}
                           />
                        )}

                        {rating && (
                           <Chip
                              label={'★'.repeat(Number(rating))}
                              onDelete={() => handleDeleteChip('rating')}
                              style={{ color: '#FFD600', fontWeight: 600 }}
                           />
                        )}

                        {(sort || type || rating) && (
                           <Button
                              variant="text"
                              sx={{ textDecoration: 'underline', minWidth: 0 }}
                              onClick={handleClearAll}
                           >
                              Clear all
                           </Button>
                        )}
                     </Box>
                  </>
               )}

               {loading ? (
                  <CircularProgress />
               ) : error ? (
                  <Alert severity="error">{error}</Alert>
               ) : (
                  <Box className="cards-container">
                     {filteredHouses.map((house, i) => (
                        <Card key={i} house={house} />
                     ))}
                  </Box>
               )}
            </RightBox>
         </ProfileBox>
      </ProfileWrapper>
   )
}

export default Profile

const ProfileWrapper = styled(Box)(() => ({
   width: '100%',
   minHeight: '100vh',
   padding: '40px 100px',
}))

const ProfileBox = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'center',
   gap: '48px',
}))

const LeftBox = styled(Box)(() => ({
   minWidth: '320px',

   '& .profile-title': {
      fontWeight: 600,
      fontSize: '20px',
      marginBottom: '20px',
   },
}))

const ProfileCard = styled(Box)(() => ({
   background: '#fff',
   border: '1px solid #E0E0E0',
   borderRadius: '12px',
   padding: '32px 24px',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   gap: '18px',

   '& .avatar': {
      width: '80px',
      height: '80px',
      fontSize: '32px',
      background: '#1976d2',
   },

   '& .profile-name, & .profile-email': {
      fontSize: '16px',
      color: '#363636',
      fontWeight: 500,
   },

   '& .logout-btn': {
      marginRight: '12rem',
      textAlign: 'start',
   },
}))

const RightBox = styled(Box)(() => ({
   flex: 1,
   background: '#fff',
   borderRadius: '12px',
   minHeight: '400px',

   '& .tabs': {
      borderBottom: '1px solid #C4C4C4',
      marginBottom: '24px',

      '& .MuiTabs-indicator': {
         backgroundColor: '#000',
      },
   },

   '& .drop-downs': {
      display: 'flex',
      gap: '16px',
      marginBottom: '16px',
   },

   '& .sort-content': {
      display: 'flex',
      gap: '8px',
      marginBottom: '16px',
   },

   '& .cards-container': {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
   },
}))
