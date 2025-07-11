import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import {
   fetchHouseById,
   fetchFeedbackByHouseId,
   fetchFavoritesByHouseId,
   fetchBookingsByHouseId,
   deleteHouseById,
} from '../../../store/slices/user/profile/announcementDetail/announcementDetailThunk'
import {
   Box,
   Typography,
   Card,
   Avatar,
   Grid,
   Rating as MuiRating,
   Modal,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import EditHouseForm from './EditHouseForm'
import HouseImageSlider from '../../../components/house/HouseImageSlider'
import Feedback from '../../../components/UI/Feedback'
import Rating from '../../../components/UI/rating/Rating'
import Button from '../../../components/UI/Button'
import Loading from '../../Loading'
import BreadCrumbs from '../../../components/UI/BreadCrumbs'

const AnnouncementDetailPage = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const {
      house,
      feedback,
      favorites,
      bookings,
      updateSuccess,
      deleteSuccess,
      loading,
   } = useSelector((s) => s.announcementDetail)

   const [editOpen, setEditOpen] = useState(false)
   const [editData, setEditData] = useState({})
   const [showAllFeedback, setShowAllFeedback] = useState(false)
   const { id } = useParams()

   useEffect(() => {
      if (id) {
         dispatch(fetchHouseById(id))
         dispatch(fetchFeedbackByHouseId(id))
         dispatch(fetchFavoritesByHouseId(id))
         dispatch(fetchBookingsByHouseId(id))
      }
   }, [id, dispatch])

   useEffect(() => {
      if (house) {
         setEditData({
            houseId: house.id,
            houseType: house.type,
            maxGuests: house.maxGuests,
            price: house.price,
            name: house.name,
            description: house.description,
            region: house.state,
            city: house.city || '',
            address: house.address,
            imageUrls: house.imageUrls,
         })
      }
   }, [house])

   useEffect(() => {
      if (updateSuccess) setEditOpen(false)
      if (deleteSuccess) navigate('/user/profile')
   }, [updateSuccess, deleteSuccess, navigate])

   if (loading || !house) return <Loading />

   const feedbackList = feedback?.feedbackResponses || []
   const ratingStats = feedback?.ratingResponse || {}
   const feedbackToShow = showAllFeedback
      ? feedbackList
      : feedbackList.slice(0, 3)

   return (
      <StyledBox>
         <Box className="container">
            <BreadCrumbs
               links={[
                  { href: '/user', label: 'Main' },
                  { href: `/user/profile`, label: 'Profile' },
                  {
                     href: `/user/profile/announcement/${house.id}`,
                     label: house.name,
                  },
               ]}
            />
            <Typography className="main-title">{house.name}</Typography>
            <Box />
            <Box sx={{ display: 'flex', gap: '68px' }}>
               <HouseImageSlider images={house.imageUrls} />
               <Grid className="house-info">
                  <Box className="tags">
                     <Tag>{house.type}</Tag>
                     <Tag>{house.maxGuests} Guests</Tag>
                  </Box>
                  <Typography className="house-name">{house.name}</Typography>
                  <Typography className="house-location">
                     {house.address}
                  </Typography>
                  <Typography className="house-description">
                     {house.description}
                  </Typography>
                  <Box className="action-btns">
                     <Button
                        variant="second"
                        onClick={() => dispatch(deleteHouseById(house.id))}
                     >
                        DELETE
                     </Button>
                     <Button
                        variant="primary"
                        onClick={() => setEditOpen(true)}
                     >
                        EDIT
                     </Button>
                  </Box>
               </Grid>
            </Box>

            <SectionTitle className='SectionTitle'>BOOKED</SectionTitle>
            <Grid container spacing={2}>
               {bookings?.map((b, idx) => (
                  <Grid item xs={1} md={3.8} key={idx}>
                     <Card className="booked-card">
                        <Typography className="booked-price">
                           ${house.price}{' '}
                           <span className="booked-day">/ day</span>
                        </Typography>
                        <hr />
                        <Box className="booked-dates">
                           <Box>
                              <Typography className="booked-label">
                                 Check in
                              </Typography>
                              <Typography>{b.checkin || '02.02.22'}</Typography>
                           </Box>
                           <Box>
                              <Typography className="booked-label">
                                 Check out
                              </Typography>
                              <Typography>
                                 {b.checkout || '02.02.22'}
                              </Typography>
                           </Box>
                        </Box>

                        <UserInfo>
                           <Avatar src={b.imageUrl} />
                           <Box className="user-info-text">
                              <Typography className="user-name">
                                 {b.fullName}
                              </Typography>
                              <Typography className="user-email">
                                 {b.email}
                              </Typography>
                           </Box>
                        </UserInfo>
                     </Card>
                  </Grid>
               ))}
            </Grid>

            <SectionTitle className='SectionTitle'>IN FAVORITES</SectionTitle>
            <Box className="favorites-list">
               {favorites?.map((fav, idx) => (
                  <UserFavotites key={idx}>
                     <Avatar src={fav.imageUrl} />
                     <Box className="user-info-text">
                        <Typography className="user-name">
                           {fav.fullName}
                        </Typography>
                        <Typography className="user-email">
                           {fav.email}
                        </Typography>
                        <Typography className="user-date">
                           {fav.addedAt}
                        </Typography>
                     </Box>
                  </UserFavotites>
               ))}
            </Box>

            <SectionTitle className='SectionTitle'>FEEDBACK</SectionTitle>
            <Grid container>
               <Grid item xs={12} md={8}>
                  {feedbackToShow.map((item) => (
                     <Feedback key={item.id} {...item} />
                  ))}
                  {feedbackList.length > 3 && !showAllFeedback && (
                     <ShowMore onClick={() => setShowAllFeedback(true)}>
                        Show more
                     </ShowMore>
                  )}
                  {showAllFeedback && (
                     <ShowMore onClick={() => setShowAllFeedback(false)}>
                        Show less
                     </ShowMore>
                  )}
                  <Button variant="outlined">ADD FEEDBACK</Button>
               </Grid>
               <Grid item xs={12} md={4}>
                  <FeedbackStats>
                     <Rating rating={ratingStats?.rating || 0} />
                  </FeedbackStats>
               </Grid>
            </Grid>
         </Box>

         <Modal open={editOpen} onClose={() => setEditOpen(false)}>
            <Box
               sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '90%',
                  maxWidth: '800px',
                  maxHeight: '90vh',
                  overflow: 'auto',
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: 24,
                  outline: 'none',
               }}
            >
               <EditHouseForm
                  initialData={{
                     houseId: house.id,
                     houseType: house.type,
                     maxGuests: house.maxGuests,
                     price: house.price,
                     name: house.name,
                     description: house.description,
                     region: house.region,
                     city: house.city,
                     address: house.address,
                     imageUrls: house.imageUrls,
                  }}
                  onClose={() => setEditOpen(false)}
                  onSuccess={() => setEditOpen(false)}
               />
            </Box>
         </Modal>
      </StyledBox>
   )
}

const StyledBox = styled(Box)(() => ({
   background: '#fafafa',
   padding: '40px 100px',

   '& .container': {},
   '& .breadcrumbs': {
      color: '#bdbdbd',
      fontSize: 16,
   },
   '& .main-title': {
      marginBottom: 16,
      fontSize: 20,
      textTransform: 'uppercase',
      marginBottom: '30px',
   },
   '& .house-name': {
      fontSize: '20px',
      fontWeight: 600,
      marginBottom: '10px',
   },
   '& .house-location': {
      color: '#888',
      margin: '0 0 20px 0',
      fontSize: '16px',
   },
   '& .house-description': {
      width: '100%',
      margin: '0 0 20px 0',
      fontSize: '16px',
      wordBreak: 'break-all',
   },
   '& .SectionTitle': {
      fontWeight: 500,
      fontSize: 20,
      margin: '32px 0 16px 0',
   },
   '& .action-btns': {
      display: 'flex',
      gap: '20px',
   },
   '& .house-info': {
      flex: 1,
   },
   '& .tags': {
      marginBottom: '16px',
   },
   '& .booked-card': {
      width: 400,
      heigth: 227,
      padding: '20px',
      borderRadius: '12px',
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
   },
   '& .booked-price': {
      fontSize: '18px',
      fontWeight: 600,
      marginBottom: '12px',
      textAlign: 'center',
   },
   '& .booked-day': {
      fontSize: '14px',
      color: '#888',
   },
   '& .booked-dates': {
      display: 'flex',
      gap: '20px',
      marginBottom: '16px',
      justifyContent: 'space-between',
      padding: '20px 0',
   },
   '& .booked-label': {
      fontSize: '12px',
      color: '#888',
      marginBottom: '4px',
   },
   '& .favorites-list': {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '30px',
   },
}))

const Tag = styled('span')(() => ({
   display: 'inline-block',
   background: '#fff0f6',
   border: '1px solid #ffcbe0',
   padding: '6px 8px',
   marginRight: 12,
   marginBottom: 8,
   fontSize: 14,
   borderRadius: 4,
   color: '#222',
   textTransform: 'capitalize',
}))

const SectionTitle = styled(Typography)(() => ({
   fontWeight: 600,
   fontSize: 20,
   margin: '32px 0 16px 0',
}))

const UserFavotites = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   marginBottom: 8,
   gap: '16px',
}))

const UserInfo = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   marginBottom: 8,
   gap: '16px',
}))

const FeedbackStats = styled(Box)(() => ({
   borderRadius: 12,
   padding: 16,
   marginLeft: 32,
   minWidth: 220,
}))

const ShowMore = styled(Typography)(() => ({
   color: '#222',
   textAlign: 'center',
   textDecoration: 'underline',
   cursor: 'pointer',
   margin: '16px 0',
}))

export default AnnouncementDetailPage
