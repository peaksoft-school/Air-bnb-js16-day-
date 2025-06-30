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
      ALLHOUSING: '/admin/all-housing',
      APPLICATION: '/admin/application',
   },

   USER: {
      INDEX: '/user',
      PROFILE: '/user/profile',
      ORDERS: '/user/orders',
      WISHLIST: '/user/wishlist',
      CART: '/user/cart',
      CHECKOUT: '/user/checkout',
      PAYMENT: '/user/payment',
      REGION_PAGE: '/user/region-page',
      FAVORITE: '/user/favorites',
      ANNOUNCEMENT_DETAIL: '/user/announcement/:id',
   },
}

export const ROLES = {
   GUEST: 'GUEST',
   USER: 'USER',
   ADMIN: 'ADMIN',
}
