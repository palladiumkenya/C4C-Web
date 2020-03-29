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
      alert("You must log in first")
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
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
      console.log('logged out')
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/hbv-summary',
    name: 'HBV Reports',
    view: 'HbvReports',
    beforeEnter: (to, from, next) => {
      alert("You must log in first")
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/add-user',
    name: 'HCW Upload',
    view: 'HCW_Upload',
    beforeEnter: (to, from, next) => {
      alert("You must log in first")
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/exposure-list',
    name: 'Exposures List',
    view: 'Exposures_List',
    beforeEnter: (to, from, next) => {
      alert("You must log in first")
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/bulk-signup',
    name: 'BulkSignup',
    view: 'BulkSignup',
    meta: { title: 'Upload Excel' },
    beforeEnter: (to, from, next) => {
      alert("You must log in first")
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/feed-back',
    name: 'Feedback',
    view: 'Feedback',
    beforeEnter: (to, from, next) => {
      alert("You must log in first")
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/registration-reports',
    name: 'Registration Reports',
    view: 'RegistrationReports',
    beforeEnter: (to, from, next) => {
      alert("You must log in first")
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
    }
  },

  {
    path: '/users-list',
    name: 'Users List',
    view: 'UsersList',
    beforeEnter: (to, from, next) => {
      alert("You must log in first")
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
    }
  },

  {
    path: '/exposures',
    name: 'Exposures',
    view: 'Exposures',
    beforeEnter: (to, from, next) => {
      alert("You must log in first")
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/broadcast',
    name: 'Broadcast',
    view: 'Broadcasts',
    beforeEnter: (to, from, next) => {
      alert("You must log in first")
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/table-list',
    name: 'Table List',
    view: 'TableList'
  },
  {
    path: '/icons',
    view: 'Icons'
  },
  {
    path: '/resources',
    view: 'AllResources',
    beforeEnter: (to, from, next) => {
      alert("You must log in first")
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/add-resource',
    view: 'Resources',
    beforeEnter: (to, from, next) => {
      alert("You must log in first")
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
    }
  },

  {
    path: '/maps',
    view: 'Maps',
    beforeEnter: (to, from, next) => {
      alert("You must log in first")
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/notifications',
    view: 'Notifications'
  },
  {
    path: '/new-broadcast',
    name: 'BroadcastForm',
    view: 'BroadcastForm',
    beforeEnter: (to, from, next) => {
      alert("You must log in first")
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
    }
  },
  {
    path: '/add_device',
    name: 'Add Devices',
    view: 'AddDevices',
    meta: { title: 'Add Devices' },
    beforeEnter: (to, from, next) => {
      alert("You must log in first")
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
    }
  }
]
