import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Box, styled } from '@mui/material'
import HouseInner from '../../../components/house/HouseInner'
import { routes } from '../../../utils/constants/routes'
import {
   getHouseById,
   getAnnouncementFeedback,
} from '../../../store/slices/admin/user/userThunk'
import BreadCrumbs from '../../../components/UI/Breadcrumbs'

const AnnouncementHouse = () => {
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
         href: routes.ADMIN.users,
      },
      {
         label: user?.name || 'User',
         href: `${routes.ADMIN.users}/${userId}`,
      },
      {
         label: announcement?.title || 'Announcement',
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

export default AnnouncementHouse

const StyledContainer = styled(Box)(() => ({
   padding: '45px 40px',
}))
