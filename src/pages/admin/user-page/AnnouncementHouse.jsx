import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Box, styled } from '@mui/material'
import HouseInner from '../../../components/house/HouseInner'
import { ROUTES } from '../../../routes/routes'

import {
   getHouseById,
   getAnnouncementFeedback,
   getAnnouncementRating,
} from '../../../store/slice/admin/user/announcementThunk'
import BreadCrumbs from '../../../components/UI/BreadCrumbs'

const AnnouncementHose = () => {
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
   }, [announcementId])

   const ANNOUNCEMENT_BREADCRUMBS = [
      {
         label: 'Users',
         href: ROUTES.ADMIN.users,
      },
      {
         label: user?.name || 'User',
         href: `${ROUTES.ADMIN.users}/${userId}`,
      },
      {
         label: announcement.title || 'Announcement',
         href: announcementId,
      },
   ]

   return (
      <StyledContainer>
         <BreadCrumbs links={ANNOUNCEMENT_BREADCRUMBS} />
         <HouseInner
            houseInfo={announcement}
            feedbacks={feedbacks}
            rating={rating}
            isMyAnnouncement={false}
         />
      </StyledContainer>
   )
}

export default AnnouncementHose

const StyledContainer = styled(Box)(() => ({
   padding: '45px 40px',
}))
