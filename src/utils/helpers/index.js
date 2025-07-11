const ADMIN_OPTIONS = [{ label: 'Log out', action: 'log-out' }]

const USER_OPTIONS = [
   { label: 'My profile', action: 'my-profile' },
   { label: 'Log out', action: 'log-out' },
]

const ADMIN_CARD_OPTIONS = [
   { label: 'Edit', action: 'edit' },
   { label: 'Delete', action: 'delete' },
]

const PROFILE_TABS = [
   { label: 'Bookings', value: 'booking' },
   { label: 'My announcement', value: 'announcement' },
   { label: 'On moderation', value: 'on_moderation' }, // исправить на snake_case
]
const PROFILE_SORT_OPTIONS = [
   { label: 'All', value: '' },
   { label: 'High to low', value: 'high' },
   { label: 'Low to high', value: 'low' },
]
const PROFILE_RATING_OPTIONS = [
   { label: 'All', value: '' },
   { label: '★★★★★', value: 5 },
   { label: '★★★★', value: 4 },
   { label: '★★★', value: 3 },
   { label: '★★', value: 2 },
   { label: '★', value: 1 },
]

const PROFILE_TYPE_OPTIONS = [
   { label: 'All', value: '' },
   { label: 'Apartment', value: 'apartment' },
   { label: 'House', value: 'house' },
]

export {
   ADMIN_OPTIONS,
   USER_OPTIONS,
   ADMIN_CARD_OPTIONS,
   PROFILE_RATING_OPTIONS,
   PROFILE_TABS,
   PROFILE_SORT_OPTIONS,
   PROFILE_TYPE_OPTIONS,
}
