import { useEffect, useRef, useState } from 'react'
import { Box, Grid, Typography, LinearProgress, Alert } from '@mui/material'
import { styled } from '@mui/material/styles'
import Pagination from '@mui/material/Pagination'
import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import Card from '../../../components/UI/AdminCard'
import { fetchApplications } from '../../../store/slices/admin/user/houseApplicationsThunk'
import { resetApplications } from '../../../store/slices/admin/user/houseApplicationsSlice'

import Loading from '../../Loading'
import { CardOptions } from '../../../utils/helpers/options'

import { useNavigate } from 'react-router'

const CARDS_PER_PAGE = 18

export default function Application() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const {
      applications: cards,
      loading,
      error,
      currentPage: page,
      totalPages: pageCount,
   } = useSelector((state) => state.applicationSlice)

   const [direction, setDirection] = useState(0)
   const [containerHeight, setContainerHeight] = useState(0)
   const gridRef = useRef(null)

   useEffect(() => {
      dispatch(fetchApplications({ page: 1, size: CARDS_PER_PAGE }))
      return () => dispatch(resetApplications())
   }, [dispatch])

   useEffect(() => {
      if (gridRef.current) {
         setContainerHeight(gridRef.current.offsetHeight)
      }
   }, [page, cards])

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
      dispatch(fetchApplications({ page: value, size: CARDS_PER_PAGE }))
   }

   const options = CardOptions

   const handleClick = async (id) => {
      navigate(`/admin/application/${id}`)
   }

   return (
      <>
         <Box
            sx={{
               p: 4,
               background: '#fafafa',
               minHeight: '100vh',
               position: 'relative',
            }}
         >
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
                  height: ` containerHeight ? ${containerHeight}px  : 'auto'`,
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
                                 sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                 }}
                                 onClick={() => {
                                    handleClick(house.id)
                                 }}
                              >
                                 <Card
                                    key={index}
                                    house={house}
                                    options={options}
                                    onDelete={(houseId) =>
                                       handleDeleteHouse(houseId)
                                    }
                                 />
                              </Grid>
                           )
                        })}
                     </Grid>
                  </motion.div>
               </AnimatePresence>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
               <StyledPagination
                  count={pageCount}
                  page={page}
                  onChange={handlePageChange}
                  shape="rounded"
                  siblingCount={1}
                  boundaryCount={1}
               />
            </Box>
         </Box>
      </>
   )
}

const StyledPagination = styled(Pagination)(({ theme }) => ({
   background: '#fafafa',
   borderRadius: '8px',
   padding: '10px 0',
   minHeight: 48,
   '& .MuiPagination-ul': {
      justifyContent: 'center',
      gap: '20px',
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
