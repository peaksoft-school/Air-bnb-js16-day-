import { useEffect, useRef, useState } from 'react'
import { Box, Grid, Typography, Alert, styled } from '@mui/material'
import Pagination from '@mui/material/Pagination'
import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import Card from './AdminCard'
import { CardOptions } from '../../utils/helpers/options'
import Loading from '../Loading'
import {
   acceptOrDeleteHouse,
   acceptOrRejectHouse,
} from '../../store/slices/admin/assept/asseptInRejectThunk'
import { useNavigate } from 'react-router'
import { fetchApplications } from '../../store/slices/admin/user/houseApplicationsThunk'

const CARDS_PER_PAGE = 6

export default function Application() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const {
      applications: cards,
      loading,
      error,
      currentPage: page,
      totalPages: pageCount,
   } = useSelector((state) => state.houseApplications)

   const [direction, setDirection] = useState(0)
   const [containerHeight, setContainerHeight] = useState(0)
   const gridRef = useRef(null)

   useEffect(() => {
      dispatch(fetchApplications({ page: 2, size: 6 }))
      // return () => dispatch(resetApplications())
   }, [dispatch])

   useEffect(() => {
      if (gridRef.current) {
         setContainerHeight(gridRef.current.offsetHeight)
      }
   }, [page, cards])

   useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
   }, [page])

   const flattenedCards = Array.isArray(cards) ? cards : []

   const variants = {
      enter: (direction) => ({
         x: direction > 0 ? 60 : -60,
         opacity: 0,
         position: 'absolute',
         width: '100%',
      }),
      center: {
         x: 0,
         opacity: 1,
         position: 'absolute',
         width: '100%',
      },
      exit: (direction) => ({
         x: direction < 0 ? 60 : -60,
         opacity: 0,
         position: 'absolute',
         width: '100%',
      }),
   }

   const handlePageChange = (_, value) => {
      setDirection(value > page ? 1 : -1)
      // dispatch(fetchApplications({ page: value, size: CARDS_PER_PAGE }))
   }

   const options = CardOptions

   const handleAccept = (houseId) => {
      dispatch(
         acceptOrRejectHouse({ houseId, isAccepted: true, rejectInfo: '' })
      )
   }

   const handleReject = (houseId, reason) => {
      dispatch(
         acceptOrRejectHouse({ houseId, isAccepted: false, rejectInfo: reason })
      )
   }
   const handleDelete = (houseId) => {
      dispatch(acceptOrDeleteHouse(houseId))
   }

   const handleNavigate = (id) => navigate(`/admin/application/${id}`)

   return (
      <StyledBox>
         <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            APPLICATION
         </Typography>

         {loading && <Loading sx={{ mb: 2 }} />}
         {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
               {error.message}
            </Alert>
         )}

         {!loading && flattenedCards.length === 0 && (
            <Alert severity="info" sx={{ mb: 2 }}>
               Данные не загружены или пустой массив. Проверьте API ответ.
            </Alert>
         )}

         <Box
            sx={{
               minHeight: 900,
               position: 'relative',
               width: '100%',
               overflow: 'hidden',
               height: containerHeight ? `${containerHeight}px` : 'auto',
               transition: 'height 0.3s cubic-bezier(.4,0,.2,1)',
            }}
         >
            <AnimatePresence custom={direction} mode="wait">
               <motion.div
                  key={page}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                     x: { type: 'tween', duration: 0.35 },
                     opacity: { duration: 0.2 },
                  }}
                  style={{ width: '100%' }}
               >
                  <Grid
                     ref={gridRef}
                     container
                     spacing={3}
                     sx={{ position: 'relative' }}
                  >
                     {flattenedCards?.map((house, index) => {
                        return (
                           <Grid
                              item
                              key={house.id || index}
                              sx={{ display: 'flex', justifyContent: 'center' }}
                           >
                              <Card
                                 key={index}
                                 house={house}
                                 options={options}
                                 onNavigate={() => handleNavigate(house.id)}
                                 onAccept={handleAccept}
                                 onReject={handleReject}
                                 onDelete={handleDelete}
                              />
                           </Grid>
                        )
                     })}
                  </Grid>
               </motion.div>
            </AnimatePresence>
         </Box>

         <Box
            sx={{
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               mt: 4,
            }}
         >
            <Typography sx={{ mb: 1 }}>
               Page {page} of {pageCount}
            </Typography>
            <StyledPagination
               count={pageCount}
               page={page}
               onChange={handlePageChange}
               shape="rounded"
               siblingCount={1}
               boundaryCount={1}
               disabled={loading}
            />
         </Box>
      </StyledBox>
   )
}

const StyledPagination = styled(Pagination)(({ theme }) => ({
   background: '#fafafa',
   borderRadius: '8px',
   padding: '10px 0',
   minHeight: 48,
   '& .MuiPagination-ul': {
      justifyContent: 'center',
      gap: 8,
   },
   '& .MuiPaginationItem-root': {
      fontWeight: 600,
      fontSize: 18,
      color: '#BDBDBD',
      minWidth: 36,
      minHeight: 36,
      borderRadius: 8,
      '&.Mui-selected': {
         color: '#DD8A08',
         background: 'transparent',
      },
      '&:hover': {
         background: 'transparent',
         color: '#DD8A08',
      },
      '&.MuiPaginationItem-ellipsis': {
         color: '#BDBDBD',
         fontSize: 18,
      },
   },
}))
const StyledBox = styled(Box)(() => ({
   p: 4,
   background: '#fafafa',
   minHeight: '100vh',
   position: 'relative',
}))
