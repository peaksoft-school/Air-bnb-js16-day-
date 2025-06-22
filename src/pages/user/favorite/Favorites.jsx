import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled, Typography, Box } from '@mui/material'
import { Link } from 'react-router'
import { getFavorites } from '../../../store/slices/user/favorite/favoriteThunk'
import nodata from '../../../assets/images/no-data.png'
import Card from '../../../components/UI/cards/Card'
import { ROUTES } from '../../../routes/routes'

const Favorites = () => {
   const dispatch = useDispatch()
   const { favorites, isLoading } = useSelector((state) => state.favorite)

   useEffect(() => {
      dispatch(getFavorites())
   }, [dispatch])

   if (isLoading) {
      return <StyledContainer>Loading favorites...</StyledContainer>
   }

   return (
      <StyledContainer>
         <Box className="heading-box">
            <StyledPath>
               Main
               <span className="path-favorite"> / Favorite </span>
            </StyledPath>

            <h3 className="heading">FAVORITE</h3>
         </Box>

         <Box className="card-box">
            {favorites.length > 0 ? (
               favorites.map((item) => (
                  <Link
                     key={item.id}
                     to={ROUTES.USER.ANNOUNCEMENT_DETAIL.replace(
                        ':id',
                        item.id
                     )}
                     style={{ textDecoration: 'none' }}
                  >
                     <Card
                        imageUrls={item.images}
                        price={item.price}
                        rating={item.rating}
                        title={item.description}
                        location={item.address}
                        guests={item.guest}
                     />
                  </Link>
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
   padding: ' 2.75rem 2.50rem',
   color: 'gray',

   '& .path-favorite': {
      color: 'black',
   },
})
