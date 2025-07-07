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
import { USERS_THUNKS } from '../../../store/slices/admin/users/usersThunk'
import BreadCrumbs from '../../../components/UI/BreadCrumbs'

const AnnouncementHouse = () => {
   const dispatch = useDispatch()

   const { announcementId, userId, id } = useParams()

   const userInfo = useSelector((state) => state.userInfo) || {}

   const { userProfile } = useSelector((state) => state.users) || {}

   const { announcement, feedbacks, rating } = userInfo

   useEffect(() => {
      if (id) {
         dispatch(getHouseById(id))
         dispatch(getAnnouncementFeedback(id))
         dispatch(USERS_THUNKS.getUserProfile({ choice: 'booking', id }))
      }
   }, [dispatch, id])

   const USERS_ANNOUNCEMENT_BREADCRUMBS = [
      {
         label: 'Users',
         href: routes.ADMIN.users,
      },
      {
         label: userProfile?.user?.fullName,
         href: `${routes.ADMIN.users}/${userId}`,
      },
      {
         label: announcement?.name || 'Announcement',
         href: announcementId,
      },
   ]

   const APPLICATION_ANNOUNCEMENT_BREADCRUMBS = [
      {
         label: 'Applications',
         href: routes.ADMIN.application,
      },
      {
         label: announcement?.name || 'Announcement',
         href: `${routes.ADMIN.application}/${announcementId}`,
      },
   ]

   const location = window.location.pathname.split('/')[2]

   console.log(location)

   return (
      <StyledContainer>
         <BreadCrumbs
            links={
               location === 'users'
                  ? USERS_ANNOUNCEMENT_BREADCRUMBS
                  : APPLICATION_ANNOUNCEMENT_BREADCRUMBS
            }
         />

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

const StyledContainer = styled(Box)(() => ({}))
