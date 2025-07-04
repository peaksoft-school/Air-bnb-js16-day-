export const routes = {
   ADMIN: {
      index: '/admin',
      application: '/admin/application',
      users: '/admin/users',
      user: '/admin/users/:userId',
      userAnnouncement: '/admin/users/:userId/:announcementId',
      allHousing: '/admin/all-housing',
      applicationById: '/admin/application/:applicationId',
   },

   USER: {
      index: '/user',
      profile: '/user/profile',
      announcement: '/user/profile/:houseId',
      addHouse: '/user/add-house',
      favorite: '/user/favorite',
      innerRegion: '/user/inner-region/',
      innerRegionsCard: '/user/inner-region/:id',
      innerRegionNotFound: '/user/not-found-house',
   },
}

export const ROLES = {
   GUEST: 'GUEST',
   USER: 'USER',
   ADMIN: 'ADMIN',
}
