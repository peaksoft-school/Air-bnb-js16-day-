import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, styled } from '@mui/material'

import { getFilteredHousingRequest } from '../../store/slice/admin/allHousing/allHousingThunk'
import Card from '../../components/admin/AdminCard'
import DropDown from '../../components/UI/DropDown'

import {
   BOOKING_FILTER_OPTIONS,
   POPULAR_SORT_OPTIONS,
   HOUSE_TYPE_OPTIONS,
   PRICE_FILTER_OPTIONS,
} from '../../utils/constants/admin/allHousing'

const AllHousing = () => {
   const [filterOption, setFilterOption] = useState('All')
   const [sortByOption, setSortByOption] = useState('All')
   const [homeTypeOption, setHomeTypeOption] = useState('All')
   const [priceOption, setPriceOption] = useState('All')

   const dispatch = useDispatch()
   const { data, loading, error } = useSelector((state) => state.housing)

   const handleChangeFilterOptionValue = (value) => setFilterOption(value)
   const handleChangeSortOptionValue = (value) => setSortByOption(value)
   const handleChangeHomeTypeValue = (value) => setHomeTypeOption(value)
   const handleChangePriceOptionValue = (value) => setPriceOption(value)

   useEffect(() => {
      dispatch(
         getFilteredHousingRequest({
            bookingStatus: filterOption,
            popularity: sortByOption,
            priceSort: priceOption,
            houseType: homeTypeOption,
         })
      )
   }, [filterOption, sortByOption, priceOption, homeTypeOption, dispatch])

   const handleSubmit = () => {
      dispatch(
         getFilteredHousingRequest({
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
            <StyledBox>
               <h2 onClick={handleSubmit}>All housing</h2>
            </StyledBox>
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
            {loading && <Typography>Loading...</Typography>}
            {error && (
               <Typography sx={{ color: 'error.main' }}>{error}</Typography>
            )}
            {!loading &&
               !error &&
               data.length > 0 &&
               data.map((housing) => (
                  <Card
                     key={housing.id}
                     imageUrls={housing.imageUrls}
                     price={housing.price}
                     rating={housing.rating}
                     title={housing.title}
                     location={housing.location}
                     guests={housing.guests}
                  />
               ))}
            {!loading && !error && data.length === 0 && (
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
   padding: '3px',
   alignItems: 'center',
   justifyContent: 'space-between',
}))

const StyledBox = styled(Box)(({}) => ({ paddingLeft: '40px' }))

const StyledSelectBox = styled(Box)(() => ({
   display: 'flex',
   flexWrap: 'wrap',
   gap: '16px',
   padding: '3px',
   paddingRight: '40px',
}))

const StyledCardBox = styled(Box)(() => ({
   display: 'flex',
   flexWrap: 'wrap',
   justifyContent: 'center',
}))
