const BOOKING_FILTER_OPTIONS = [
   { id: 1, value: 'All', label: 'All' },
   { id: 2, value: 'true', label: 'Booked' },
   { id: 3, value: 'false', label: 'Not booked' },
]

const POPULAR_SORT_OPTIONS = [
   { id: 1, value: 'All', label: 'All' },
   { id: 2, value: 'POPULAR', label: 'Popular' },
   { id: 3, value: 'THE LASTEST', label: 'The lastest' },
]

const HOUSE_TYPE_OPTIONS = [
   { id: 1, value: 'All', label: 'All' },
   { id: 2, value: 'APARTMENT', label: 'Apartment' },
   { id: 3, value: 'HOUSE', label: 'House' },
]

const PRICE_FILTER_OPTIONS = [
   { id: 1, value: 'All', label: 'All' },
   { id: 2, value: 'LOW TO HIGH', label: 'Low to high' },
   { id: 3, value: 'HIGH TO   LOW', label: 'High to low' },
]

export {
   BOOKING_FILTER_OPTIONS,
   POPULAR_SORT_OPTIONS,
   HOUSE_TYPE_OPTIONS,
   PRICE_FILTER_OPTIONS,
}
