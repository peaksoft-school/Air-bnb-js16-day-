import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, styled } from '@mui/material'
import { ALL_HOUSING_THUNK } from '../../../store/slices/admin/all-housing/allHousingThunk'
import AdminCard from '../../../components/UI/cards/AdminCard'
import DropDown from '../../../components/UI/DropDown'
import {
   BOOKING_FILTER_OPTIONS,
   POPULAR_SORT_OPTIONS,
   HOUSE_TYPE_OPTIONS,
   PRICE_FILTER_OPTIONS,
} from '../../../utils/constants/admin'
import Loading from '../../Loading'

const AllHousing = () => {
   const [filterOption, setFilterOption] = useState('All')
   const [sortByOption, setSortByOption] = useState('All')
   const [homeTypeOption, setHomeTypeOption] = useState('All')
   const [priceOption, setPriceOption] = useState('All')

   const { housing, loading, error } = useSelector((state) => state.housing)

   const dispatch = useDispatch()

   const handleChangeFilterOptionValue = (value) => setFilterOption(value)
   const handleChangeSortOptionValue = (value) => setSortByOption(value)
   const handleChangeHomeTypeValue = (value) => setHomeTypeOption(value)
   const handleChangePriceOptionValue = (value) => setPriceOption(value)

   useEffect(() => {
      dispatch(
         ALL_HOUSING_THUNK.getFilteredHousingRequest({
            bookingStatus: filterOption,
            popularity: sortByOption,
            priceSort: priceOption,
            houseType: homeTypeOption,
         })
      )
   }, [filterOption, sortByOption, priceOption, homeTypeOption, dispatch])

   const handleSubmit = () => {
      dispatch(
         ALL_HOUSING_THUNK.getFilteredHousingRequest({
            bookingStatus: filterOption,
            popularity: sortByOption,
            priceSort: priceOption,
            houseType: homeTypeOption,
         })
      )
   }

   return (
      <>
         <StyledFirstBox>
            <Typography onClick={handleSubmit} className="title">
               All housing
            </Typography>

            <StyledSelectBox>
               <DropDown
                  label="Filter by:"
                  value={filterOption}
                  onChange={handleChangeFilterOptionValue}
                  options={BOOKING_FILTER_OPTIONS}
               />

               <DropDown
                  label="Sort by:"
                  value={sortByOption}
                  onChange={handleChangeSortOptionValue}
                  options={POPULAR_SORT_OPTIONS}
               />

               <DropDown
                  label="Filter by home type:"
                  value={homeTypeOption}
                  onChange={handleChangeHomeTypeValue}
                  options={HOUSE_TYPE_OPTIONS}
               />

               <DropDown
                  label="Filter by price:"
                  value={priceOption}
                  onChange={handleChangePriceOptionValue}
                  options={PRICE_FILTER_OPTIONS}
               />
            </StyledSelectBox>
         </StyledFirstBox>

         <StyledCardBox>
            {loading && <Loading />}

            {error && (
               <Typography sx={{ color: 'error.main' }}>{error}</Typography>
            )}

            {!loading &&
               !error &&
               housing?.length > 0 &&
               housing?.map((house) => (
                  <AdminCard key={house.id} house={house} />
               ))}

            {!loading && !error && housing?.length === 0 && (
               <Typography>Not found.</Typography>
            )}
         </StyledCardBox>
      </>
   )
}

export default AllHousing

const StyledFirstBox = styled(Box)(() => ({
   display: 'flex',
   flexWrap: 'wrap',
   gap: '2px',
   alignItems: 'center',
   justifyContent: 'space-between',

   '& .title': {
      fontSize: '20px',
      lineHeight: '100%',
      fontWeight: 500,
      textTransform: 'uppercase',
   },
}))

const StyledSelectBox = styled(Box)(() => ({
   display: 'flex',
   flexWrap: 'wrap',
   gap: '16px',
}))

const StyledCardBox = styled(Box)(() => ({
   display: 'flex',
   flexWrap: 'wrap',
   justifyContent: 'start',
   alignItems: 'center',
   gap: '12px',
   marginTop: '40px',
}))
