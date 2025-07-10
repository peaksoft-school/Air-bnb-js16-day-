const BOOKING_FILTER_OPTIONS = [
   { id: 1, value: 'All', label: 'All' },
   { id: 2, value: 'booked', label: 'Booked' },
   { id: 3, value: 'not_booked', label: 'Not booked' },
]

const POPULAR_SORT_OPTIONS = [
   { id: 1, value: 'All', label: 'All' },
   { id: 2, value: 'popular', label: 'Popular' },
   { id: 3, value: 'the_lastest', label: 'The lastest' },
]

const HOUSE_TYPE_OPTIONS = [
   { id: 1, value: 'All', label: 'All' },
   { id: 2, value: 'APARTMENT', label: 'Apartment' },
   { id: 3, value: 'HOUSE', label: 'House' },
]

const PRICE_FILTER_OPTIONS = [
   { id: 1, value: 'All', label: 'All' },
   { id: 2, value: 'low_to_high', label: 'Low to high' },
   { id: 3, value: 'high_to_low', label: 'High to low' },
]

export {
   BOOKING_FILTER_OPTIONS,
   POPULAR_SORT_OPTIONS,
   HOUSE_TYPE_OPTIONS,
   PRICE_FILTER_OPTIONS,
}
