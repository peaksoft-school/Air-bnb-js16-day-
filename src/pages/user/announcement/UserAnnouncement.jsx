import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Box, styled } from '@mui/material'
import { ROUTES } from '../../../routes/routes'
import {
   getHouseById,
   getAnnouncementFeedback,
} from '../../../store/slices/admin/user/userThunk'
import InnerPage from './inner/InnerPage'
import Loading from '../../Loading'
import BreadCrumbs from '../../../components/UI/BreadCrumbs'

const UserAnnouncement = () => {
   const dispatch = useDispatch()
   const { id } = useParams()

   const announcement = useSelector((state) => state.userInfo?.announcement)
   const feedbacks = useSelector((state) => state.userInfo?.feedbacks)
   const rating = useSelector((state) => state.userInfo?.rating)

   useEffect(() => {
      if (id) {
         dispatch(getHouseById(id))
         dispatch(getAnnouncementFeedback(id))
      }
   }, [dispatch, id])

   const links = [
      { href: ROUTES.USER.INDEX, label: 'Main' },
      { href: ROUTES.USER.REGION_PAGE, label: 'Region' },
      {
         href: ROUTES.USER.ANNOUNCEMENT_DETAIL.replace(':id', id),
         label: announcement?.title || 'Announcement',
      },
   ]

   if (!announcement) {
      return <Loading />
   }

   return (
      <StyledContainer>
         <BreadCrumbs links={links} />
         <InnerPage
            houseInfo={announcement}
            feedbacks={feedbacks || []}
            rating={rating || 0}
            isMyAnnouncement={false}
         />
      </StyledContainer>
   )
}

export default UserAnnouncement

const StyledContainer = styled(Box)(() => ({
   padding: '45px 40px',
}))
