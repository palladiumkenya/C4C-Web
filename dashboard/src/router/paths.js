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
      // ...
      console.log('logged out')
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
    view: 'UserProfile'
  },
  {
    path: '/hbv-summary',
    name: 'HBV Reports',
    view: 'HbvReports'
  },
  {
    path: '/add-user',
    name: 'HCW Upload',
    view: 'HCW_Upload'
  },
  {
    path: '/exposure-list',
    name: 'Exposures List',
    view: 'Exposures_List',
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
    path: '/bulk-signup',
    name: 'BulkSignup',
    view: 'BulkSignup',
    meta: { title: 'Upload Excel' }
  },
  {
    path: '/feed-back',
    name: 'Feedback',
    view: 'Feedback',
  },
  {
    path: '/registration-reports',
    name: 'Registration Reports',
    view: 'RegistrationReports'
  },

  {
    path: '/users-list',
    name: 'Users List',
    view: 'UsersList'
  },

  {
    path: '/exposures',
    name: 'Exposures',
    view: 'Exposures'
  },
  {
    path: '/broadcast',
    name: 'Broadcast',
    view: 'Broadcasts'
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
    view: 'AllResources'
  },
  {
    path: '/add-resource',
    view: 'Resources'
  },

  {
    path: '/maps',
    view: 'Maps'
  },
  {
    path: '/notifications',
    view: 'Notifications'
  },
  {
    path: '/new-broadcast',
    name: 'BroadcastForm',
    view: 'BroadcastForm'
  },
  {
    path: '/add_device',
    name: 'Add Devices',
    view: 'AddDevices',
    meta: { title: 'Add Devices' }
  }
]
