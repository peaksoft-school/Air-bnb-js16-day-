import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link } from 'react-router'

const NotFound = () => (
   <Wrapper>
      <HouseBackground
         src="https://img.freepik.com/free-photo/greyscale-low-angle-shot-concrete-building-with-lot-windows-dark-sky_181624-14824.jpg?semt=ais_hybrid&w=740"
         alt="House illustration"
      />
      <Code
         initial={{ scale: 0 }}
         animate={{ scale: 1 }}
         transition={{ type: 'spring', stiffness: 100 }}
      >
         404
      </Code>
      <Message
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.3 }}
      >
         Упс! Страница, которую вы ищете, не существует.
      </Message>
      <StyledLink to="/">Назад</StyledLink>
   </Wrapper>
)

export default NotFound

const Wrapper = styled.div`
   height: 100vh;
   background: linear-gradient(to bottom, #f3f3f3, #e0e0e0);
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   position: relative;
   overflow: hidden;
   text-align: center;
   font-family: 'Inter', sans-serif;
`

const HouseBackground = styled.img`
   position: absolute;
   opacity: 0.08;
   width: 90%;
   max-width: 100%;
   bottom: 0;
   z-index: 0;
`

const Code = styled(motion.h1)`
   font-size: 10rem;
   font-weight: 900;
   color: #dd8a08;
   margin: 0;
   z-index: 1;
`

const Message = styled(motion.p)`
   font-size: 1.8rem;
   color: #333;
   margin-top: 1rem;
   z-index: 1;
`

const StyledLink = styled(Link)`
   margin-top: 2rem;
   padding: 12px 28px;
   background: #dd8a08;
   color: white;
   border-radius: 8px;
   font-weight: bold;
   text-decoration: none;
   transition: 0.3s;
   z-index: 1;
   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

   &:hover {
      background: white;
      color: #ff9900;
   }
`
