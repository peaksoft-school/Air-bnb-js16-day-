import { Box, styled, Typography } from '@mui/material'
import GeoIcon from '../assets/icons/Geo.svg'

const PopularHouse = () => {
   const houses = [
      {
         id: 1,
         title: 'Asman guest house',
         address: '723510 Osh Muzurbek Alimbekov 9/7',
         image: 'https://apartment.kg/Files/catalog/nrdhf2plki.jpg',
         price: 26,
         rating: 3.5,
      },
      {
         id: 2,
         title: 'Asman guest house',
         address: '723510 Osh Muzurbek Alimbekov 9/7',
         image: 'https://www.artsandcollections.com/wp-content/uploads/2018/08/PatelWEB.jpg',
         price: 26,
         rating: 4.8,
      },
      {
         id: 3,
         title: 'Asman guest house',
         address: '723510 Osh Muzurbek Alimbekov 9/7',
         image: 'https://lirp.cdn-website.com/a23a3fdf/dms3rep/multi/opt/home-hero1-960-600-960x600-960w.jpg',
         price: 26,
         rating: 4.8,
      },
   ]
   return (
      <StyledMainBox>
         <StyledSecondBox>
            <StyledDiv>
               <div>
                  <h2>Popular House</h2>
                  <p>
                     Helping you make the best decisions in buying, selling, &
                     renting your last minute locations.
                  </p>
               </div>
               <Box>
                  <StyledTypography>View all</StyledTypography>
               </Box>
            </StyledDiv>

            <StyledBox>
               {houses.map((house) => (
                  <StyledCardBox key={house.id}>
                     <p>⭐ {house.rating}</p>
                     <StyledImg src={house.image} alt={house.title} />
                     <div>
                        <h3>{house.title}</h3>
                        <p>
                           <StyledSecondImg src={GeoIcon} alt="GeoIcon" />
                           {house.address}
                        </p>
                     </div>
                     <p>
                        <span>${house.price}</span> / day
                     </p>
                  </StyledCardBox>
               ))}
            </StyledBox>
         </StyledSecondBox>
      </StyledMainBox>
   )
}

export default PopularHouse

const StyledMainBox = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
}))

const StyledSecondBox = styled(Box)(() => ({
   height: '880px',
   display: 'flex',
   flexDirection: 'column',

   gap: '60px',
}))

const StyledDiv = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',

   '& h2': {
      fontFamily: 'Arial',
      fontWeight: 500,
      fontSize: '20px',
      lineHeight: '100%',
      textTransform: 'uppercase',
      marginBottom: '16px',
      color: '#363636',
   },

   '& p': {
      fontFamily: 'Arial',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '100%',
      color: '#363636',
   },

   '& Typography': {
      fontFamily: 'Arial',
      fontWeight: 400,
      fontSize: '18px',
      lineHeight: '100%',
      textDecoration: 'underline',
      color: '#363636',
   },
}))

const StyledBox = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   flexWrap: 'wrap',
   gap: '20px',
}))

const StyledCardBox = styled(Box)(() => ({
   width: '400px',
   height: '582px',
   display: 'flex',
   flexDirection: 'column',
   gap: '16px',
   fontFamily: 'Arial',

   '& div': {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
   },

   '& h3': {
      fontWeight: 400,
      fontSize: '18px',
      lineHeight: '100%',
   },

   '& p': {
      fontWeight: 200,
      fontSize: '14px',
      lineHeight: '100%',
      color: '#757575',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',

      '& span': {
         color: '#000',
      },
   },
}))
const StyledImg = styled('img')(() => ({
   width: '400px',
   height: '484px',
   borderRadius: '2px',
   objectFit: 'cover',
}))

const StyledSecondImg = styled('img')(() => ({
   width: '12px',
   height: '16px',
}))
const StyledTypography = styled(Typography)(() => ({
   fontFamily: 'Arial',
   fontWeight: 400,
   fontSize: '18px',
   lineHeight: '100%',
   textDecoration: 'underline',
   color: '#363636',
}))
