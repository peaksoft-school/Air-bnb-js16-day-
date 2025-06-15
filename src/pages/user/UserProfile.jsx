import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Box, styled } from '@mui/material'
import InnerPage from '../../components/house/InnerPage'
import { ROUTES } from '../../routes/routes'
import {
   getHouseById,
   getAnnouncementFeedback,
} from '../../store/slices/admin/user/userThunk'
import BreadCrumbs from '../../components/UI/Breadcrumbs'

const UserProfile = () => {
   const dispatch = useDispatch()
   const { announcementId, userId } = useParams()

   const { house, feedbacks, rating } = useSelector((state) => state.userInfo)

   useEffect(() => {
      if (announcementId) {
         dispatch(getHouseById(announcementId))
         dispatch(getAnnouncementFeedback(announcementId))
      }
   }, [dispatch, announcementId])

   const ANNOUNCEMENT_BREADCRUMBS = [
      {
         label: 'Users',
         href: ROUTES.USER.PROFILE,
      },
      {
         label: house?.userResponse?.fullName || 'User',
         href: `${ROUTES.USER.PROFILE}/${userId}`,
      },
      {
         label: house?.title || house?.name || 'House',
         href: announcementId,
      },
   ]

   return (
      <StyledContainer>
         <BreadCrumbs links={ANNOUNCEMENT_BREADCRUMBS} />
         <InnerPage
            houseInfo={house}
            feedbacks={feedbacks}
            rating={rating}
            isMyAnnouncement={false}
         />
      </StyledContainer>
   )
}

export default UserProfile

const StyledContainer = styled(Box)(() => ({
   padding: '45px 40px',
}))
