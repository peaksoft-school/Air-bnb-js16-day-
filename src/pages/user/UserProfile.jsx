import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Box, styled } from '@mui/material'
import InnerPage from '../../components/house/InnerPage'
import { ROUTES } from '../../routes/routes'
import {
   getHouseById,
   getAnnouncementFeedback,
   getAnnouncementRating,
} from '../../store/slices/admin/user/userThunk'
import BreadCrumbs from '../../components/UI/BreadCrumbs'

const UserProfile = () => {
   const dispatch = useDispatch()
   const { user, announcement, feedbacks, rating } = useSelector(
      (state) => state.userInfo
   )

   const { announcementId, userId } = useParams()

   useEffect(() => {
      if (announcementId) {
         dispatch(getHouseById(announcementId))
         dispatch(getAnnouncementFeedback(announcementId))
         dispatch(getAnnouncementRating(announcementId))
      }
   }, [dispatch, announcementId])
   

   

   const ANNOUNCEMENT_BREADCRUMBS = [
      {
         label: 'Users',
         href: ROUTES.ADMIN.USERS,
      },
      {
         label: user?.name || 'User',
         href: `${ROUTES.ADMIN.USERS}/${userId}`,
      },
      {
         label: announcement?.title || 'Announcement',
         href: announcementId,
      },
   ]

   if (!announcement) return <div>Loading...</div>

   return (
      <StyledContainer>
         <BreadCrumbs links={ANNOUNCEMENT_BREADCRUMBS} />
         <InnerPage
            houseInfo={announcement}
            feedbacks={feedbacks}
            rating={rating}
         />
      </StyledContainer>
   )
}

export default UserProfile

const StyledContainer = styled(Box)(() => ({
   padding: '45px 40px',
}))
