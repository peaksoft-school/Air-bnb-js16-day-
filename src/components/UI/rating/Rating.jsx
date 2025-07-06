import { Box, Typography, styled } from '@mui/material'
import { useSelector } from 'react-redux'
import FullStarIcon from '../../../assets/icons/FullStar.svg'
import Button from '../Button'

const Rating = ({ rating = {}, toggleFeedbackModal }) => {
   const { role } = useSelector((state) => state.auth)

   const RATINGS = [
      { label: 5, progress: rating.rating_5_count || 0 },
      { label: 4, progress: rating.rating_4_count || 0 },
      { label: 3, progress: rating.rating_3_count || 0 },
      { label: 2, progress: rating.rating_2_count || 0 },
      { label: 1, progress: rating.rating_1_count || 0 },
   ]

   return (
      <StyledContainer>
         <RatingChart>
            <RatingCont>
               <p>{rating.total_feedback || 0}</p>
               <img src={FullStarIcon} alt="fullStarIcon" />
            </RatingCont>
            <RatingChartBarContainer>
               {RATINGS.map(({ label, progress }) => (
                  <RatingChartBar key={label}>
                     <RatingLabel>{label}</RatingLabel>
                     <RatingProgressCont>
                        <RatingProgress progress={progress} />
                     </RatingProgressCont>
                     <RatingLabel>{progress}%</RatingLabel>
                  </RatingChartBar>
               ))}
            </RatingChartBarContainer>
         </RatingChart>

         {role !== 'ADMIN' && (
            <Button variant="second" width={"424px"} onClick={toggleFeedbackModal}>
               Leave Feedback
            </Button>
         )}
      </StyledContainer>
   )
}

export default Rating

const StyledContainer = styled(Box)(() => ({
   '& .MuiButton-root': {
      width: '100%',
   },
}))

const RatingChart = styled(Box)(() => ({
   border: '1px solid #C4C4C4',
   borderRadius: '16px',
   padding: '21px 40px',
   width: '424px',
   marginBottom: '20px',
}))

const RatingCont = styled(Box)(() => ({
   marginBottom: '20px',
   display: 'flex',
   alignItems: 'center',
   gap: '10px',

   '& p': {
      fontSize: '24px',
   },

   '& img': {
      width: '31px',
      height: '31px',
   },
}))

const RatingChartBarContainer = styled(Box)(() => ({
   color: '#363636',
}))

const RatingChartBar = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   gap: '14px',
}))

const RatingLabel = styled(Typography)(() => ({
   width: '10px',
}))

const RatingProgressCont = styled(Box)(() => ({
   width: '20vw',
   backgroundColor: '#d4cdd3',
   overflow: 'hidden',
   display: 'flex',
   flexDirection: 'column',
   height: '3px',
}))

const RatingProgress = styled(Box)(({ progress }) => ({
   width: `${progress}%`,
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   transition: '0.4s ease-out',
   height: '10px',
   backgroundColor: '#4F7755',
}))
