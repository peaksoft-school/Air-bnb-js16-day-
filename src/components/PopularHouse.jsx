import AsmanHouse1 from '../assets/images/AsmanHouse1.png'
import AsmanHouse2 from '../assets/images/AsmanHouse2.png'
import AsmanHouse3 from '../assets/images/AsmanHouse3.png'

import { Box } from '@mui/material'
import styled from 'styled-components'

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

               <div>
                  <a href="#">View all</a>
               </div>
            </StyledDiv>

            <StyledBox>
               <StyledCardBox>
                  <img src={AsmanHouse1} alt="" />
                  <div>
                     <h3>Asman guest house</h3>
                     <p>723510 Osh Muzurbek Alimbekov 9/7</p>
                  </div>
                  <p>
                     <span>$26</span> / day
                  </p>
               </StyledCardBox>
               <StyledCardBox>
                  <img src={AsmanHouse2} alt="" />
                  <div>
                     <h3>Asman guest house</h3>
                     <p>723510 Osh Muzurbek Alimbekov 9/7</p>
                  </div>
                  <p>
                     <span>$26</span> / day
                  </p>
               </StyledCardBox>
               <StyledCardBox>
                  <img src={AsmanHouse3} alt="" />
                  <div>
                     <h3>Asman guest house</h3>
                     <p>723510 Osh Muzurbek Alimbekov 9/7</p>
                  </div>
                  <p>
                     <span>$26</span> / day
                  </p>
               </StyledCardBox>
            </StyledBox>
         </StyledSecondBox>
      </StyledMainBox>
   )
}

export default PopularHouse

const StyledMainBox = styled(Box)(() => ({
   width: '100%',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}))

const StyledBox = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   flexWrap: 'wrap',
   gap: '20px',
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
   '& a': {
      fontFamily: 'Arial',
      fontWeight: 400,
      fontSize: '18px',
      lineHeight: '100%',
      textDecoration: 'underline',
      color: '#363636',
   },
}))

const StyledCardBox = styled(Box)(() => ({
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
      '& span': {
         color: '#000',
      },
   },
}))
const StyledSecondBox = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '60px',
}))
