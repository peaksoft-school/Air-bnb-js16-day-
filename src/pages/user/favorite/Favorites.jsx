import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router'
import {
   addFavorite,
   getFavorites,
} from '../../../store/slices/user/favorite/favoriteThunk'
import nodata from '../../../assets/images/no-data.png'
import Card from '../../../components/UI/cards/Card'
import { ROUTES } from '../../../routes/routes'
import BreadCrumbs from '../../../components/UI/BreadCrumbs'

const Favorites = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [refresh, setRefresh] = useState(false)
   const [localFavorites, setLocalFavorites] = useState([])
   const { favorites, isLoading } = useSelector((state) => state.favorite)

   useEffect(() => {
      dispatch(getFavorites()).then((res) => {
         setLocalFavorites(res.payload)
      })
   }, [dispatch, refresh])

   if (isLoading) {
      return <StyledContainer>Loading favorites...</StyledContainer>
   }

   const links = [
      { href: ROUTES.USER.INDEX, label: 'Main' },

      {
         href: 'favorites',
         label: 'FAVORITE',
      },
   ]
   return (
      <StyledContainer>
         <Box className="heading-box">
            <BreadCrumbs links={links} />

            <h3 className="heading">FAVORITE</h3>
         </Box>

         <Box className="card-box">
            {localFavorites.length > 0 ? (
               localFavorites.map((item) => (
                  <Card
                     key={item.id}
                     imageUrls={item.images}
                     price={item.price}
                     rating={item.rating}
                     title={item.description}
                     location={item.address}
                     guests={item.guest}
                     isFavorite={item.isFavorite}
                     onLike={async () => {
                        await dispatch(addFavorite(item.id))
                        setRefresh((prev) => !prev)
                     }}
                     onClick={() =>
                        navigate(
                           ROUTES.USER.ANNOUNCEMENT_DETAIL.replace(
                              ':id',
                              item.id
                           )
                        )
                     }
                  />
               ))
            ) : (
               <Box className="empty-page-box">
                  <img src={nodata} alt="no data" className="noData-img" />
               </Box>
            )}
         </Box>
      </StyledContainer>
   )
}

export default Favorites

const StyledContainer = styled('div')(({ theme }) => ({
   fontSize: '16px',
   fontWeight: '400',
   fontFamily: 'Inter',
   color: 'black',
   width: '100%',
   height: '100%',
   minHeight: '88.8vh',
   backgroundColor: theme.palette.primary.white,
   padding: '0 0 0 2.50rem',

   '& .empty-page-box': {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

      '& .noData-img': {
         width: '30rem',
         height: '30rem',
      },
   },

   '& .card-box': {
      fontSize: '16px',
      fontWeight: '400',
      fontFamily: 'Inter',
      marginTop: '1.875rem',
      padding: '0 0 0 0.70rem',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '25px',
   },

   '& .heading-box': {
      '& .heading': {
         padding: '0 0 0 2.50rem',
         color: 'black',
      },
   },
}))

const StyledPath = styled(Typography)({
   fontSize: '16px',
   fontWeight: '400',
   fontFamily: 'Inter',
   padding: '2.75rem 2.50rem',
   color: 'gray',

   '& .path-favorite': {
      color: 'black',
   },
})
