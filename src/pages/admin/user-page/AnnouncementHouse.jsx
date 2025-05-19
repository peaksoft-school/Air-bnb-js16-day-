import {
   Box,
   Typography,
   styled,
   Link,
   Rating as MuiRating,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, NavLink } from 'react-router'
import Button from '../../../components/UI/Button'
import BreadCrumbs from '../../../components/UI/BreadCrumbs'
import { fetchAnnouncementById } from '../../../store/slice/admin/user/announcementThunk'

const AnnouncementHouse = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const [showMore, setShowMore] = useState(false)

   const { data, isLoading, error } = useSelector((state) => state.announcement)

   useEffect(() => {
      dispatch(fetchAnnouncementById(id))
   }, [dispatch, id])

   if (isLoading) return <Typography>Loading...</Typography>
   if (error) return <Typography>Error: {error}</Typography>
   if (!data) return null

   const { announcement, feedbacks, rating } = data

   const breadcrumbs = [
      <LinkStyled underline="hover" key="1" href="/admin/users">
         Users
      </LinkStyled>,
      <LinkStyled underline="hover" key="2" href={`/admin/users/${id}`}>
         Announcement
      </LinkStyled>,
      <TypographyStyled key="3">{announcement.title}</TypographyStyled>,
   ]

   return (
      <Container>
         <BreadCrumbs>{breadcrumbs}</BreadCrumbs>

         <Title>{announcement.title.toUpperCase()}</Title>

         <MainSection>
            <LeftBlock>
               <MainImage>
                  <img src={announcement.image} alt="main" />
               </MainImage>
               <ThumbnailList>
                  {announcement.thumbnails.map((src, i) => (
                     <Thumbnail key={i} src={src} alt={`thumb-${i}`} />
                  ))}
               </ThumbnailList>
            </LeftBlock>

            <StyledBox>
               <Description>{announcement.description}</Description>
               <Owner>
                  <strong>{announcement.owner.name}</strong>
                  <OwnerEmail>{announcement.owner.email}</OwnerEmail>
               </Owner>
               <ButtonGroup>
                  <Button width={'196px'} variant="second" color="error">
                     DELETE
                  </Button>
                  <Button width={'196px'} variant="contained" color="warning">
                     BLOCK
                  </Button>
               </ButtonGroup>
            </StyledBox>
         </MainSection>

         <StyledSecondBox>
            <Box sx={{ flex: 2 }}>
               <FeedbackTitle>FEEDBACK</FeedbackTitle>

               {feedbacks
                  .slice(0, showMore ? feedbacks.length : 2)
                  .map((f, i) => (
                     <Feedback key={i}>
                        <FeedbackAuthor>{f.name}</FeedbackAuthor>
                        <MuiRating value={f.rating} readOnly size="small" />
                        <FeedbackText>{f.text}</FeedbackText>
                        <FeedbackDate>{f.date}</FeedbackDate>
                        {f.images.length > 0 && (
                           <FeedbackImages>
                              {f.images.map((img, idx) => (
                                 <Thumbnail
                                    key={idx}
                                    src={img}
                                    alt="feedback-img"
                                 />
                              ))}
                           </FeedbackImages>
                        )}
                     </Feedback>
                  ))}

               {feedbacks.length > 2 && (
                  <StyledShowMoreBox>
                     <NavLink onClick={() => setShowMore(!showMore)}>
                        {showMore ? 'Show less' : 'Show more'}
                     </NavLink>
                  </StyledShowMoreBox>
               )}
            </Box>

            <RightBlock>
               <RatingValue>{rating.value.toFixed(1)}</RatingValue>
               {Object.keys(rating.breakdown)
                  .reverse()
                  .map((star) => (
                     <RatingRow key={star}>
                        <StarLabel>{star}</StarLabel>
                        <MuiRating
                           readOnly
                           value={parseInt(star)}
                           size="small"
                        />
                        <RatingPercent>{rating.breakdown[star]}%</RatingPercent>
                     </RatingRow>
                  ))}
            </RightBlock>
         </StyledSecondBox>
      </Container>
   )
}

export default AnnouncementHouse

const Container = styled(Box)({
   padding: '40px',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
})

const Title = styled(Typography)`
   font-size: 24px;
   font-weight: bold;
   margin: 32px 0 16px;
`

const MainSection = styled(Box)`
   display: flex;
   gap: 40px;
   align-items: flex-start;
`

const LeftBlock = styled(Box)`
   flex: 2;
`

const StyledBox = styled(Box)`
   display: flex;
   flex-direction: column;
   gap: 16px;
   flex: 1;
`

const StyledSecondBox = styled(Box)`
   display: flex;
   justify-content: space-between;
   align-items: start;
   margin-top: 40px;
   gap: 40px;
`

const MainImage = styled(Box)`
   img {
      width: 630px;
      height: auto;
      border-radius: 8px;
   }
`

const ThumbnailList = styled(Box)`
   display: flex;
   gap: 12px;
   margin-top: 10px;
`

const Thumbnail = styled('img')`
   width: 196px;
   height: 136px;
   object-fit: cover;
   border: 1px solid #ccc;
`

const Description = styled(Typography)`
   font-size: 14px;
`

const Owner = styled(Box)`
   font-size: 14px;
   color: #666;
`

const OwnerEmail = styled('div')`
   margin-top: 4px;
`

const ButtonGroup = styled(Box)`
   display: flex;
   gap: 10px;
   margin-top: 20px;
`

const RatingValue = styled(Typography)`
   font-size: 22px;
   font-weight: bold;
   margin-bottom: 8px;
`

const RatingRow = styled(Box)`
   display: flex;
   align-items: center;
   gap: 8px;
   margin: 4px 0;
`

const StarLabel = styled(Typography)`
   width: 20px;
`

const RatingPercent = styled(Typography)`
   font-size: 14px;
   color: #555;
`

const FeedbackTitle = styled(Typography)`
   font-size: 18px;
   font-weight: bold;
   margin: 32px 0 16px;
`

const Feedback = styled(Box)`
   margin-bottom: 24px;
`

const FeedbackAuthor = styled(Typography)`
   font-weight: bold;
`

const FeedbackText = styled(Typography)`
   font-size: 15px;
   margin-top: 8px;
`

const FeedbackDate = styled(Typography)`
   font-size: 12px;
   color: gray;
   margin-top: 4px;
`

const FeedbackImages = styled(Box)`
   display: flex;
   gap: 10px;
   margin-top: 8px;
`

const StyledShowMoreBox = styled(Box)`
   display: flex;
   justify-content: center;
   margin-top: 16px;
`

const TypographyStyled = styled(Typography)`
   color: #000;
`

const LinkStyled = styled(Link)`
   color: #1976d2;
   text-decoration: none;
   &:hover {
      text-decoration: underline;
   }
`
