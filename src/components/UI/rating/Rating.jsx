import { Box, Typography, styled } from '@mui/material'
import { useSelector } from 'react-redux'
import FullStarIcon from '../../../assets/icons/FullStar.svg'
import Button from '../Button'

const Rating = ({ toggleFeedbackModal }) => {
   const { role } = useSelector((state) => state.auth)
   const ratingData = useSelector((state) => state.userInfo.rating)

   const counts = ratingData?.ratingCount || {}
   const total = Object.values(counts).reduce((acc, num) => acc + num, 0)
   const averageRating = ratingData?.rating || 0

   const RATINGS = [5, 4, 3, 2, 1].map((label) => {
      const count = counts[label] || 0
      const percent = total ? Math.round((count / total) * 100) : 0
      return { label, percent }
   })

   return (
      <StyledContainer>
         <RatingChart>
            <RatingCont>
               <p>{averageRating.toFixed(1)}</p>
               <img src={FullStarIcon} alt="fullStarIcon" />
            </RatingCont>

            <RatingChartBarContainer>
               {RATINGS.map(({ label, percent }) => (
                  <RatingChartBar key={label}>
                     <RatingLabel>{label}</RatingLabel>
                     <RatingProgressCont>
                        <RatingProgress progress={percent} />
                     </RatingProgressCont>
                     <RatingLabel>{percent}%</RatingLabel>
                  </RatingChartBar>
               ))}
            </RatingChartBarContainer>
         </RatingChart>

         {role !== 'ADMIN' && (
            <Button
               variant="second"
               width={'424px'}
               onClick={toggleFeedbackModal}
            >
               Leave Feedback
            </Button>
         )}
      </StyledContainer>
   )
}

export default Rating

// ==== Стили ====

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
      margin: 0,
   },
   '& img': {
      width: '31px',
      height: '31px',
   },
}))

const RatingChartBarContainer = styled(Box)(() => ({
   color: '#363636',
   display: 'flex',
   flexDirection: 'column',
   gap: '8px',
}))

const RatingChartBar = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   gap: '14px',
   marginBottom: '8px',
}))

const RatingLabel = styled(Typography)(() => ({
   width: '10px',
   userSelect: 'none',
}))

const RatingProgressCont = styled(Box)(() => ({
   flexGrow: 1,
   backgroundColor: '#d4cdd3',
   overflow: 'hidden',
   display: 'flex',
   flexDirection: 'column',
   height: '6px',
   borderRadius: '3px',
}))

const RatingProgress = styled(Box)(({ progress }) => ({
   width: `${progress}%`,
   transition: 'width 0.4s ease-out',
   height: '100%',
   backgroundColor: '#4F7755',
}))
