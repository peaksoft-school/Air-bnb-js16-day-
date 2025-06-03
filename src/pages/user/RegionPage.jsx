import { useState, useEffect } from 'react'
import { Box, styled, Typography, PaginationItem } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import BreadCrumbs from '../../components/UI/BreadCrumbs'
import { ROUTES } from '../../routes/routes'
import Chip from '../../components/UI/Chip'
import Select from '../../components/UI/DropDown'
import Card from '../../components/UI/cards/Card'
import { getHouses } from '../../store/slices/user/regionPageThunk'
import Loading from '../Loading'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

const RegionPage = () => {
   const dispatch = useDispatch()
   const { allHouses, isLoading, error, search } = useSelector(
      (state) => state.regionPage
   )
   const total = allHouses?.length || 0

   const [filters, setFilters] = useState({
      region: '',
      popularity: '',
      houseType: '',
      priceSort: '',
   })
   const [chips, setChips] = useState([])

   const [page, setPage] = useState(1)
   const pageSize = 16
   const totalCount = total || allHouses?.length || 0
   const totalPages = Math.ceil(totalCount / pageSize)

   useEffect(() => {
      dispatch(getHouses({ page: 1, size: 16 }))
   }, [dispatch])

   useEffect(() => {
      const hasFilters = Object.values(filters).some((v) => v) || search
      if (hasFilters) {
         dispatch(getHouses({ ...filters, search, page, size: pageSize }))
      } else {
         dispatch(getHouses({ page, size: pageSize }))
      }
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
   }

   const handleClearAll = () => {
      setChips([])
      setFilters({
         region: '',
         popularity: '',
         houseType: '',
         priceSort: '',
      })
   }

   const handlePageChange = (event, value) => {
      setPage(value)
      window.scrollTo({ top: 0, behavior: 'smooth' })
   }

   if (isLoading) return <Loading />

   const isNothingFound = allHouses?.length === 0 && search

   return (
      <StyledContainer>
         <BreadCrumbs
            links={[
               { href: ROUTES.USER.INDEX, label: 'Main' },
               {
                  href: ROUTES.USER.REGION_PAGE,
                  label: filters.region || 'Region',
               },
            ]}
         />

         {search ? (
            <SearchTitle>
               Search for: <span>"{search.toUpperCase()}"</span>
               {total > 0 && <span> ({total})</span>}
            </SearchTitle>
         ) : null}

         {isNothingFound ? (
            <NothingFoundWrapper>
               <NothingFoundTitle>Results for "{search}"</NothingFoundTitle>
               <NothingFoundText>
                  It appears that no listings have yet been created for{' '}
                  <span>"{search}"</span>.<br />
                  Be the first person to create a{' '}
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
                     {total > 0 && <span>({total})</span>}
                  </RegionTitle>

                  <FilterContainer>
                     <Select
                        value={filters.region}
                        onChange={(e) => handleFilterChange('region', e)}
                        options={[
                           { value: 'NARYN', label: 'Naryn' },
                           { value: 'bishkek', label: 'Bishkek' },
                           { value: 'batken', label: 'Batken' },
                           { value: 'jalalabat', label: 'Jalalabat' },
                           { value: 'YSYKKOL', label: 'Issyk-Kul' },
                           { value: 'talas', label: 'Talas' },
                           { value: 'CHUY', label: 'Chui' },
                           { value: 'Osh', label: 'Osh' },
                        ]}
                        label="Region"
                     />
                     <Select
                        value={filters.popularity}
                        onChange={(e) => handleFilterChange('popularity', e)}
                        options={[
                           { value: 'all', label: 'All' },
                           { value: 'popular', label: 'Popular' },
                           { value: 'latest', label: 'The latest' },
                        ]}
                        label="Sort by"
                     />
                     <Select
                        value={filters.houseType}
                        onChange={(e) => handleFilterChange('houseType', e)}
                        options={[
                           { value: 'all', label: 'All' },
                           { value: 'apartment', label: 'Apartment' },
                           { value: 'house', label: 'House' },
                        ]}
                        label="Filter by home type"
                     />
                     <Select
                        value={filters.priceSort}
                        onChange={(e) => handleFilterChange('priceSort', e)}
                        options={[
                           { value: 'all', label: 'All' },
                           { value: 'low', label: 'Low to high' },
                           { value: 'high', label: 'High to low' },
                        ]}
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
                     />
                  ))}
               </CardsContainer>

               {totalPages > 1 && (
                  <StyledPaginationWrapper>
                     <StyledPagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        shape="rounded"
                        siblingCount={1}
                        boundaryCount={1}
                        showFirstButton
                        showLastButton
                        renderItem={(item) => (
                           <StyledPaginationItem {...item} />
                        )}
                     />
                  </StyledPaginationWrapper>
               )}
            </>
         )}
      </StyledContainer>
   )
}

const StyledPaginationWrapper = styled(Stack)(() => ({
   marginTop: '40px',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}))

const StyledPagination = styled(Pagination)(() => ({
   '& .MuiPagination-ul': {
      gap: '8px',
   },
}))

const StyledPaginationItem = styled(PaginationItem)(() => ({
   '&.Mui-selected': {
      color: '#DD8A08',
      background: 'none',
      fontWeight: 600,
      borderRadius: '4px',
   },
   '& .MuiPaginationItem-icon': {
      color: '#DD8A08',
   },
   '&:not(.Mui-selected)': {
      color: '#B0B0B0',
   },
}))
export default RegionPage

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
