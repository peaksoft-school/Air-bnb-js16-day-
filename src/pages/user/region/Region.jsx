import { useState, useEffect } from 'react'
import { Box, styled, Typography, PaginationItem } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { ROUTES } from '../../../routes/routes'
import Chip from '../../../components/UI/Chip'
import Select from '../../../components/UI/DropDown'
import Card from '../../../components/UI/cards/Card'
import { REGION_THUNK } from '../../../store/slices/user/region/regionThunk'
import { REGION_ACTIONS } from '../../../store/slices/user/region/regionSlice'
import Loading from '../../Loading'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import BreadCrumbs from '../../../components/UI/Breadcrumbs'

const Region = () => {
   const { allHouses, isLoading, search, selectedRegion } = useSelector(
      (state) => state.region
   )

   const [filters, setFilters] = useState({
      region: '',
      popularity: '',
      houseType: '',
      priceSort: '',
   })

   const [chips, setChips] = useState([])
   const [page, setPage] = useState(1)

   const dispatch = useDispatch()

   const pageSize = 16

   const total = allHouses?.length || 0
   const totalCount = total || allHouses?.length || 0

   useEffect(() => {
      if (selectedRegion) {
         console.log('Setting selected region:', selectedRegion)
         setFilters((prev) => ({ ...prev, region: selectedRegion }))

         const regionChip = {
            type: 'region',
            label: selectedRegion,
            displayLabel:
               selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1),
         }
         setChips([regionChip])
      }
   }, [selectedRegion])

   useEffect(() => {
      const hasFilters = Object.values(filters).some((v) => v) || search
      console.log('Loading houses with filters:', filters, 'search:', search)

      const timeoutId = setTimeout(() => {
         if (hasFilters) {
            const params = { ...filters, search, page, size: pageSize }
            console.log('Dispatching with params:', params)
            dispatch(REGION_THUNK.getHouses(params))
         } else {
            console.log('Dispatching without filters')
            dispatch(REGION_THUNK.getHouses({ page, size: pageSize }))
         }
      }, 100)

      return () => clearTimeout(timeoutId)
   }, [filters, search, page, dispatch])

   const handleFilterChange = (type, value) => {
      if (value && value !== 'all') {
         const newChip = {
            type,
            label: value,
            displayLabel: value.charAt(0).toUpperCase() + value.slice(1),
         }

         setChips((prev) => [
            ...prev.filter((chip) => chip.type !== type),
            newChip,
         ])
      } else {
         setChips((prev) => prev.filter((chip) => chip.type !== type))
      }

      setFilters((prev) => ({ ...prev, [type]: value }))
   }

   const handleChipDelete = (chipToDelete) => {
      setChips((prev) => prev.filter((chip) => chip.type !== chipToDelete.type))

      setFilters((prev) => ({ ...prev, [chipToDelete.type]: '' }))

      if (chipToDelete.type === 'region') {
         dispatch(REGION_ACTIONS.setSelectedRegion(''))
         localStorage.removeItem('selectedRegion')
      }
   }

   const handleClearAll = () => {
      setChips([])

      setFilters({
         region: '',
         popularity: '',
         houseType: '',
         priceSort: '',
      })

      dispatch(REGION_ACTIONS.setSelectedRegion(''))
      localStorage.removeItem('selectedRegion')
   }

   const handlePrevPage = () => {
      if (page > 1) setPage((prev) => prev - 1)
   }
   const handleNextPage = () => {
      if (!isLastPage) setPage((prev) => prev + 1)
   }

   if (isLoading) return <Loading />

   const isNothingFound = allHouses?.length === 0 && search
   const isLastPage = allHouses.length < pageSize

   const links = [
      { href: ROUTES.USER.INDEX, label: 'Main' },

      {
         href: ROUTES.USER.REGION_PAGE,
         label: filters.region || 'Region',
      },
   ]

   const optionRegion = [
      { value: 'NARYN', label: 'Naryn' },
      { value: 'BISHKEK', label: 'Bishkek' },
      { value: 'BATKEN', label: 'Batken' },
      { value: 'JALALABAT', label: 'Jalal-Abad' },
      { value: 'YSYKKOL', label: 'Issyk-Kul' },
      { value: 'TALAS', label: 'Talas' },
      { value: 'CHUY', label: 'Chui' },
      { value: 'OSH', label: 'Osh' },
   ]

   const optionPopularity = [
      { value: 'popular', label: 'Popular' },
      { value: 'the_lastest', label: 'The latest' },
   ]

   const optionHouseType = [
      { value: 'APARTMENT', label: 'Apartment' },
      { value: 'HOUSE', label: 'House' },
   ]

   const oprionPrice = [
      { value: 'low_to_high', label: 'Low to high' },
      { value: 'high_to_low', label: 'High to low' },
   ]

   return (
      <StyledContainer>
         <BreadCrumbs links={links} />

         {search ? (
            <SearchTitle>
               Search for:{' '}
               <Typography variant="span">"{search.toUpperCase()}"</Typography>
               {total > 0 && <Typography variant="span"> ({total})</Typography>}
            </SearchTitle>
         ) : null}

         {isNothingFound ? (
            <NothingFoundWrapper>
               <NothingFoundTitle>Results for "{search}"</NothingFoundTitle>

               <NothingFoundText>
                  It appears that no listings have yet been created for
                  <Typography variant="span">"{search}"</Typography>.
                  <br />
                  Be the first person to create a
                  <a href="#">listing in this area!</a>
               </NothingFoundText>
            </NothingFoundWrapper>
         ) : (
            <>
               <FilterSection>
                  <RegionTitle>
                     {filters.region
                        ? filters.region.toUpperCase()
                        : 'ALL REGIONS'}
                     {total > 0 && (
                        <Typography variant="span">({total})</Typography>
                     )}
                  </RegionTitle>

                  <FilterContainer>
                     <Select
                        value={filters.region}
                        onChange={(e) => handleFilterChange('region', e)}
                        options={optionRegion}
                        label="Region"
                     />

                     <Select
                        value={filters.popularity}
                        onChange={(e) => handleFilterChange('popularity', e)}
                        options={optionPopularity}
                        label="Sort by"
                     />

                     <Select
                        value={filters.houseType}
                        onChange={(e) => handleFilterChange('houseType', e)}
                        options={optionHouseType}
                        label="Filter by home type"
                     />

                     <Select
                        value={filters.priceSort}
                        onChange={(e) => handleFilterChange('priceSort', e)}
                        options={oprionPrice}
                        label="Filter by price"
                     />
                  </FilterContainer>

                  <ChipsContainer>
                     {chips.map((chip) => (
                        <Chip
                           key={chip.type}
                           label={chip.displayLabel}
                           onDelete={() => handleChipDelete(chip)}
                        />
                     ))}
                     {chips.length > 0 && (
                        <ClearAllButton onClick={handleClearAll}>
                           Clear all
                        </ClearAllButton>
                     )}
                  </ChipsContainer>
               </FilterSection>

               <CardsContainer>
                  {allHouses?.map((house) => (
                     <Card
                        key={house.id}
                        imageUrls={house.imageUrls}
                        price={house.price}
                        rating={house.averageRating}
                        title={house.description}
                        location={house.address}
                        guests={house.maxGuests}
                        favorite={house.favorite}
                     />
                  ))}
               </CardsContainer>

               <StyledPaginationWrapper>
                  <PageButton onClick={handlePrevPage} disabled={page === 1}>
                     {'<'}
                  </PageButton>
                  <PageNumber>{page}</PageNumber>
                  <PageButton onClick={handleNextPage} disabled={isLastPage}>
                     {'>'}
                  </PageButton>
               </StyledPaginationWrapper>
            </>
         )}
      </StyledContainer>
   )
}

export default Region

const StyledPaginationWrapper = styled(Box)(() => ({
   marginTop: '40px',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '16px',
}))

const PageButton = styled('button')(() => ({
   background: 'none',
   border: 'none',
   color: '#DD8A08',
   fontSize: '24px',
   cursor: 'pointer',
   padding: '4px 12px',
   borderRadius: '4px',
   transition: 'background 0.2s',
   '&:disabled': {
      color: '#B0B0B0',
      cursor: 'not-allowed',
   },
   '&:hover:not(:disabled)': {
      background: '#fafafa',
   },
}))

const PageNumber = styled('span')(() => ({
   fontWeight: 600,
   fontSize: '20px',
   color: '#222',
   minWidth: '32px',
   textAlign: 'center',
}))

const StyledContainer = styled(Box)(() => ({
   padding: '40px 100px',
}))

const FilterSection = styled(Box)(() => ({
   marginBottom: '2rem',
}))

const RegionTitle = styled(Typography)(() => ({
   fontSize: '20px',
   fontWeight: 500,
   marginBottom: '1rem',

   '& span': {
      marginLeft: '0.5rem',
      color: '#6C6C6C',
   },
}))

const FilterContainer = styled(Box)(() => ({
   display: 'flex',
   gap: '20px',
   marginBottom: '20px',
   flexWrap: 'wrap',
}))

const ChipsContainer = styled(Box)(() => ({
   display: 'flex',
   gap: '10px',
   alignItems: 'center',
   flexWrap: 'wrap',
}))

const CardsContainer = styled(Box)(() => ({
   display: 'grid',
   gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
   gap: '20px',
}))

const ClearAllButton = styled('button')(() => ({
   background: 'none',
   border: 'none',
   color: '#363636',
   cursor: 'pointer',
   fontSize: '14px',
   padding: '5px 10px',

   '&:hover': {
      textDecoration: 'underline',
   },
}))

const NothingFoundWrapper = styled(Box)(() => ({
   marginTop: '60px',
   background: '#fafafa',
   borderRadius: '8px',
   padding: '48px 32px',
   textAlign: 'left',
   minHeight: '300px',
}))

const NothingFoundTitle = styled('div')(() => ({
   fontWeight: 600,
   fontSize: '22px',
   marginBottom: '18px',
}))

const NothingFoundText = styled('div')(() => ({
   fontSize: '17px',
   color: '#444',

   '& span': {
      color: '#DD8A08',
      fontWeight: 500,
   },

   '& a': {
      color: '#1976d2',
      textDecoration: 'underline',
      cursor: 'pointer',
   },
}))

const SearchTitle = styled(Typography)(() => ({
   fontSize: '20px',
   fontWeight: 400,
   margin: '30px 0 18px 0',
   color: '#444',

   '& span': {
      fontWeight: 600,
      color: '#222',
   },
}))
