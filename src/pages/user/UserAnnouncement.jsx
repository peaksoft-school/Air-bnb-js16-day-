import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Box, styled } from '@mui/material'
import { ROUTES } from '../../routes/routes'
import {
   getHouseById,
   getAnnouncementFeedback,
} from '../../store/slices/admin/user/userThunk'
import BreadCrumbs from '../../components/UI/BreadCrumbs'
import InnerPage from '../../pages/user/inner/InnerPage'

const UserAnnouncement = () => {
   const dispatch = useDispatch()
   const { announcementId, userId, id } = useParams()

   const userInfo = useSelector((state) => state.userInfo) || {}
   const { user, announcement, feedbacks, rating } = userInfo

   useEffect(() => {
      if (id) {
         dispatch(getHouseById(id))
         dispatch(getAnnouncementFeedback(id))
      }
   }, [dispatch, id])

   const ANNOUNCEMENT_BREADCRUMBS = [
      {
         label: 'Users',
         href: ROUTES.USER.DETAIL,
      },
      {
         label: user?.name || 'User',
         href: `${ROUTES.USER.DETAIL}/${userId}`,
      },
      {
         label: announcement?.title || 'Announcement',
         href: announcementId,
      },
   ]

   return (
      <StyledContainer>
         <BreadCrumbs links={ANNOUNCEMENT_BREADCRUMBS} />

         <InnerPage
            houseInfo={announcement}
            feedbacks={feedbacks}
            rating={rating}
            isMyAnnouncement={false}
         />
      </StyledContainer>
   )
}

export default UserAnnouncement

const StyledContainer = styled(Box)(() => ({
   padding: '45px 40px',
}))
