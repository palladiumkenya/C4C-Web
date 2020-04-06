/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
import store from '@/store'

export default [
  {
    path: '',
    name: 'Dashboard',
    // Relative to /src/views
    view: 'Dashboard',
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/login',
    name: 'login',
    view: 'login'
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    view: 'UserProfile',
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/hbv-summary',
    name: 'HBV Reports',
    view: 'HbvReports',
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/add-user',
    name: 'HCW Upload',
    view: 'HCW_Upload',
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/exposure-list',
    name: 'Exposures List',
    view: 'Exposures_List',
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/bulk-signup',
    name: 'Bulk Signup',
    view: 'BulkSignup',
    meta: { title: 'Upload Excel' },
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/feed-back',
    name: 'Feedback',
    view: 'Feedback',
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/registration-reports',
    name: 'Registration Reports',
    view: 'RegistrationReports',
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },

  {
    path: '/users_list',
    name: 'Users List',
    view: 'All_Users'
  },
  {
    path: '/hcw_list',
    name: 'HCW List',
    view: 'All_HCW'
  },
  {
    path: '/forgot_password',
    name: 'Forgot Password',
    view: 'ForgotPassword'
  },
  {
    path: '/exposures',
    name: 'Exposures',
    view: 'Exposures',
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/all_broadcast',
    name: 'Broadcast',
    view: 'All_Broadcasts'
  },
  {
    path: '/broadcast',
    name: 'Broadcast Facility',
    view: 'Broadcast_Facility'
  },
  {
    path: '/new_broadcast',
    name: 'New Broadcast',
    view: 'New_Broadcast'
  },

  {
    path: '/cmes',
    name: 'CMES',
    view: 'All_Cmes'
  },
  {
    path: '/add_CME',
    name: 'Add CME',
    view: 'New_CME'
  },
  {
    path: '/view_CME/:id',
    name: 'View CME',
    view: 'View_CME'
  },
  {
    path: '/protocals',
    name: 'Protocals',
    view: 'All_Protocals'
  },
  {
    path: '/add_protocal',
    name: 'Add Protocal',
    view: 'New_Protocal'
  },
  {
    path: '/departments',
    name: 'Departments',
    view: 'AddDepartments'
  },

  {
    path: '/covid19_resources',
    name: 'COVID19 Resources',
    view: 'Covid'
  },

  {
    path: '/notifications',
    view: 'Notifications'
  },
  {
    path: '/icons',
    view: 'Icons'
  },
  {
    path: '/add_device',
    name: 'Add Devices',
    view: 'AddDevices',
    meta: { title: 'Add Devices' },
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  }
]
