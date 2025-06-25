import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import {
   fetchHouseById,
   fetchFeedbackByHouseId,
   fetchFavoritesByHouseId,
   fetchBookingsByHouseId,
   deleteHouseById,
   updateHouseById,
} from '../../../store/slices/user/profile/announcementDetail/announcementDetailThunk'
import {
   Box,
   Typography,
   Button,
   Card,
   CardMedia,
   CardContent,
   Avatar,
   Grid,
   Rating,
   Modal,
   TextField,
   IconButton,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import StarIcon from '@mui/icons-material/Star'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'


export default function AnnouncementDetailPage() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const {
      house,
      feedback,
      favorites,
      bookings,
      updateSuccess,
      deleteSuccess,
   } = useSelector((s) => s.announcementDetail)
   const [editOpen, setEditOpen] = useState(false)
   const [editData, setEditData] = useState({})
   const [showAllFeedback, setShowAllFeedback] = useState(false)
   const id = 1

   useEffect(() => {
      dispatch(fetchHouseById(id))
      dispatch(fetchFeedbackByHouseId(id))
      dispatch(fetchFavoritesByHouseId(id))
      dispatch(fetchBookingsByHouseId(id))
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
            address: house.addressDetail,
            imageUrls: house.imageUrls,
         })
      }
   }, [house])

   useEffect(() => {
      if (updateSuccess) setEditOpen(false)
      if (deleteSuccess) navigate('/profile')
   }, [updateSuccess, deleteSuccess, navigate])

   if (!house) return <Typography>Loading...</Typography>

   const feedbackList = feedback?.feedbackResponses || []
   const ratingStats = feedback?.ratingResponse || {}
   const feedbackToShow = showAllFeedback
      ? feedbackList
      : feedbackList.slice(0, 3)

   const handleEdit = () => setEditOpen(true)
   const handleEditChange = (e) =>
      setEditData({ ...editData, [e.target.name]: e.target.value })
   const handleEditSubmit = (e) => {
      e.preventDefault()
      dispatch(updateHouseById(editData))
   }
   const handleDelete = () => {
      if (window.confirm('Delete this house?'))
         dispatch(deleteHouseById(house.id))
   }

   return (
      <StyledBox>
         <Box
            sx={{
               maxWidth: 1200,
               margin: '0 auto',
               background: '#fff',
               borderRadius: 4,
               p: 4,
            }}
         >
            <Typography sx={{ color: '#bdbdbd', mb: 2 }}>
               Main / {house.state} / Hotel / Profile / {house.name}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
               {house.name}
            </Typography>
            <Grid container spacing={4}>
               <Grid item xs={12} md={6}>
                  <MainImage>
                     <CardMedia
                        component="img"
                        image={house.imageUrls?.[0]}
                        alt={house.name}
                        sx={{
                           width: '100%',
                           height: '100%',
                           objectFit: 'cover',
                        }}
                     />
                  </MainImage>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                     {house.imageUrls?.slice(0, 3).map((img, idx) => (
                        <SmallImage key={idx}>
                           <CardMedia
                              component="img"
                              image={img}
                              alt={`img-${idx}`}
                              sx={{
                                 width: '100%',
                                 height: '100%',
                                 objectFit: 'cover',
                              }}
                           />
                        </SmallImage>
                     ))}
                  </Box>
               </Grid>
               <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                     <Button size="small" variant="outlined" sx={{ mr: 1 }}>
                        Apartment
                     </Button>
                     <Button size="small" variant="outlined">
                        2 Guests
                     </Button>
                  </Box>
                  <Typography variant="h6">{house.name}</Typography>
                  <Typography sx={{ color: '#bdbdbd', mb: 1 }}>
                     {house.addressDetail}
                  </Typography>
                  <Typography sx={{ mb: 2 }}>{house.description}</Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                     <ActionButton
                        startIcon={<DeleteIcon />}
                        onClick={handleDelete}
                     >
                        DELETE
                     </ActionButton>
                     <ActionButton
                        startIcon={<EditIcon />}
                        onClick={handleEdit}
                     >
                        EDIT
                     </ActionButton>
                  </Box>
               </Grid>
            </Grid>

            {/* BOOKED */}
            <SectionTitle>BOOKED</SectionTitle>
            <Grid container spacing={2}>
               {bookings?.map((b, idx) => (
                  <Grid item xs={12} md={4} key={idx}>
                     <Card sx={{ p: 2, borderRadius: 2 }}>
                        <Typography variant="h6">
                           ${house.price}{' '}
                           <span style={{ color: '#bdbdbd', fontWeight: 400 }}>
                              / day
                           </span>
                        </Typography>
                        <Box
                           sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              mt: 1,
                           }}
                        >
                           <Box>
                              <Typography variant="body2" color="textSecondary">
                                 Check in
                              </Typography>
                              <Typography>{b.checkIn || '02.02.22'}</Typography>
                           </Box>
                           <Box>
                              <Typography variant="body2" color="textSecondary">
                                 Check out
                              </Typography>
                              <Typography>
                                 {b.checkOut || '02.02.22'}
                              </Typography>
                           </Box>
                        </Box>
                        <UserInfo sx={{ mt: 2 }}>
                           <Avatar src={b.user?.imageUrl} />
                           <Box sx={{ ml: 1 }}>
                              <Typography fontWeight={600}>
                                 {b.user?.fullName || 'Anna Annova'}
                              </Typography>
                              <Typography fontSize={14} color="#bdbdbd">
                                 {b.user?.email || 'anna@gmail.com'}
                              </Typography>
                           </Box>
                        </UserInfo>
                     </Card>
                  </Grid>
               ))}
            </Grid>

            {/* IN FAVORITES */}
            <SectionTitle>IN FAVORITES</SectionTitle>
            <Box sx={{ display: 'flex', gap: 4 }}>
               {favorites?.map((fav, idx) => (
                  <UserInfo key={idx}>
                     <Avatar src={fav.imageUrl} />
                     <Box sx={{ ml: 1 }}>
                        <Typography fontWeight={600}>{fav.fullName}</Typography>
                        <Typography fontSize={14} color="#bdbdbd">
                           {fav.email}
                        </Typography>
                        <Typography fontSize={14} color="#bdbdbd">
                           {fav.addedAt}
                        </Typography>
                     </Box>
                  </UserInfo>
               ))}
            </Box>

            {/* FEEDBACK */}
            <SectionTitle>FEEDBACK</SectionTitle>
            <Grid container>
               <Grid item xs={12} md={8}>
                  {feedbackToShow.map((fb, idx) => (
                     <FeedbackCard key={fb.id}>
                        <UserInfo>
                           <Avatar src={fb.userFeedbackResponse?.image} />
                           <Box sx={{ ml: 1 }}>
                              <Typography fontWeight={600}>
                                 {fb.userFeedbackResponse?.fullName}
                              </Typography>
                           </Box>
                           <Rating
                              value={fb.rating}
                              readOnly
                              size="small"
                              sx={{ ml: 2 }}
                           />
                           <Typography
                              fontSize={14}
                              color="#bdbdbd"
                              sx={{ ml: 1 }}
                           >
                              ({fb.rating})
                           </Typography>
                        </UserInfo>
                        <Typography sx={{ mb: 1 }}>{fb.text}</Typography>
                        {fb.images?.length > 0 && (
                           <FeedbackImages>
                              {fb.images.map((img, i) => (
                                 <SmallImage key={i}>
                                    <CardMedia
                                       component="img"
                                       image={img}
                                       alt={`fb-img-${i}`}
                                       sx={{
                                          width: '100%',
                                          height: '100%',
                                          objectFit: 'cover',
                                       }}
                                    />
                                 </SmallImage>
                              ))}
                           </FeedbackImages>
                        )}
                        <Typography
                           fontSize={12}
                           color="#bdbdbd"
                           sx={{ mt: 1 }}
                        >
                           {fb.createdAt}
                        </Typography>
                        <Box
                           sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 2,
                              mt: 1,
                           }}
                        >
                           <Typography fontSize={14}>
                              👍 {fb.likeCount}
                           </Typography>
                           <Typography fontSize={14}>
                              👎 {fb.dislikeCount}
                           </Typography>
                        </Box>
                     </FeedbackCard>
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
                  <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
                     LEAVE FEEDBACK
                  </Button>
               </Grid>
               <Grid item xs={12} md={4}>
                  <FeedbackStats>
                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography variant="h5">
                           {ratingStats.rating?.toFixed(1) || '0.0'}
                        </Typography>
                        <StarIcon sx={{ color: '#FBB03B', ml: 1 }} />
                     </Box>
                     {[5, 4, 3, 2, 1].map((star) => (
                        <Box
                           key={star}
                           sx={{
                              display: 'flex',
                              alignItems: 'center',
                              mb: 0.5,
                           }}
                        >
                           <Typography sx={{ width: 16 }}>{star}</Typography>
                           <Box
                              sx={{
                                 flex: 1,
                                 mx: 1,
                                 height: 6,
                                 bgcolor: '#eee',
                                 borderRadius: 2,
                                 position: 'relative',
                              }}
                           >
                              <Box
                                 sx={{
                                    width: `${(ratingStats.ratingCount?.[`additionalProp${6 - star}`] || 0) * 20}%`,
                                    height: '100%',
                                    bgcolor: '#FBB03B',
                                    borderRadius: 2,
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                 }}
                              />
                           </Box>
                           <Typography sx={{ width: 32 }}>
                              {ratingStats.ratingCount?.[
                                 `additionalProp${6 - star}`
                              ] || 0}
                              %
                           </Typography>
                        </Box>
                     ))}
                  </FeedbackStats>
               </Grid>
            </Grid>
         </Box>

         {/* Edit Modal */}
         <EditModal open={editOpen} onClose={() => setEditOpen(false)}>
            <EditForm component="form" onSubmit={handleEditSubmit}>
               <Typography variant="h6">Edit House</Typography>
               <TextField
                  label="Name"
                  name="name"
                  value={editData.name || ''}
                  onChange={handleEditChange}
                  required
               />
               <TextField
                  label="Description"
                  name="description"
                  value={editData.description || ''}
                  onChange={handleEditChange}
                  required
               />
               <TextField
                  label="Price"
                  name="price"
                  type="number"
                  value={editData.price || ''}
                  onChange={handleEditChange}
                  required
               />
               <TextField
                  label="Max Guests"
                  name="maxGuests"
                  type="number"
                  value={editData.maxGuests || ''}
                  onChange={handleEditChange}
                  required
               />
               <TextField
                  label="Address"
                  name="address"
                  value={editData.address || ''}
                  onChange={handleEditChange}
                  required
               />
               <Box
                  sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}
               >
                  <Button onClick={() => setEditOpen(false)}>Cancel</Button>
                  <Button type="submit" variant="contained" color="primary">
                     Save
                  </Button>
               </Box>
            </EditForm>
         </EditModal>
      </StyledBox>
   )
}

const StyledBox = styled(Box)(({ theme }) => ({
    background: '#fafafa',
    minHeight: '100vh',
    padding: '32px 0',
 }))
 
 const MainImage = styled(Card)(({ theme }) => ({
    width: 500,
    height: 350,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
 }))
 
 const SmallImage = styled(Card)(({ theme }) => ({
    width: 120,
    height: 80,
    marginRight: 8,
    borderRadius: 8,
    overflow: 'hidden',
    display: 'inline-block',
 }))
 
 const SectionTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    fontSize: 20,
    margin: '32px 0 16px 0',
 }))
 
 const UserInfo = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
 }))
 
 const FeedbackCard = styled(Card)(({ theme }) => ({
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    background: '#fff',
 }))
 
 const FeedbackImages = styled(Box)(({ theme }) => ({
    display: 'flex',
    marginTop: 8,
 }))
 
 const FeedbackStats = styled(Box)(({ theme }) => ({
    background: '#fff',
    borderRadius: 12,
    padding: 16,
    marginLeft: 32,
    minWidth: 220,
 }))
 
 const ActionButton = styled(Button)(({ theme }) => ({
    background: '#FBB03B',
    color: '#fff',
    marginRight: 16,
    '&:hover': {
       background: '#FFA000',
    },
 }))
 
 const EditModal = styled(Modal)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
 }))
 
 const EditForm = styled(Box)(({ theme }) => ({
    background: '#fff',
    padding: 32,
    borderRadius: 12,
    minWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
 }))
 
 const ShowMore = styled(Typography)(({ theme }) => ({
    color: '#222',
    textAlign: 'center',
    textDecoration: 'underline',
    cursor: 'pointer',
    margin: '16px 0',
 }))
 