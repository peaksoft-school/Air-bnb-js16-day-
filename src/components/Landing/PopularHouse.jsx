import { Box, styled, Typography } from '@mui/material'
import GeoIcon from '../../assets/icons/Geo.svg'
import { HOUSES } from '../../utils/constants/Index'

const PopularHouse = () => {
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
               {HOUSES.map((house) => (
                  <StyledCardBox key={house.id}>
                     <ImageWrapper>
                        <StyledImg src={house.image} alt={house.title} />
                        <RatingTag>⭐ {house.rating}</RatingTag>
                     </ImageWrapper>

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
   padding: '170px 0 0 0',
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

const ImageWrapper = styled(Box)(() => ({
   position: 'relative',
   width: '400px',
   height: '484px',
}))

const RatingTag = styled('p')(() => ({
   position: 'absolute',
   top: '12px',
   right: '12px',
   backgroundColor: 'white',
   padding: '4px 8px',
   borderRadius: '4px',
   fontSize: '14px',
   fontWeight: 500,
   color: '#000',
   boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
}))
