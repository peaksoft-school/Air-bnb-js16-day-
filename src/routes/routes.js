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
      PRODCTS: '/admin/products',
      ORDERS: '/admin/orders',
      CATEGORIES: '/admin/categories',
      BRANDS: '/admin/brands',
      COUPONS: '/admin/coupons',
      SETTINGS: '/admin/settings',
      PROFILE: '/admin/profile',
   },

   USER: {
      INDEX: '/user',
      PROFILE: '/user/profile',
      ORDERS: '/user/orders',
      WISHLIST: '/user/wishlist',
      CART: '/user/cart',
      CHECKOUT: '/user/checkout',
      PAYMENT: '/user/payment',
   },
}

export const ROLES = {
   GUEST: 'GUEST',
   USER: 'USER',
   ADMIN: 'ADMIN',
}
