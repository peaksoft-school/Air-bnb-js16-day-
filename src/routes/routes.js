export const ROUTES = {
   AUTH: {
      FORGOT_PASSWORD: '/forgot-password',
      RESET_PASSWORD: '/reset-password',
   },

   GUEST: {
      INDEX: '/',
   },

   ADMIN: {
      INDEX: '/admin',
      USERS: '/admin/users',
      USER_DETAIL: '/admin/users/:id',
      USEER_ANNOUNCMENT_BY_ID: '/admin/users/:id/announcement/:announcementId',
      ALLHOUSING: '/admin/all-housing',
      APPLICATION: '/admin/application',
      APPLICATION_BY_ID: '/admin/application/:id',
      APPLICATION_DETAILED: '/admin/application/:id',
   },

   USER: {
      INDEX: '/user',
      PROFILE: '/user/profile',
      ORDERS: '/user/orders',
      WISHLIST: '/user/wishlist',
      CART: '/user/cart',
      CHECKOUT: '/user/checkout',
      PAYMENT: '/user/payment',
      REGION_PAGE: '/user/region',
   },
}

export const ROLES = {
   GUEST: 'GUEST',
   USER: 'USER',
   ADMIN: 'ADMIN',
}
