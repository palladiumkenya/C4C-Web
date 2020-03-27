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
    name: 'Bulk Signup',
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
    path: '/exposures',
    name: 'Exposures',
    view: 'Exposures'
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
    path: '/resources',
    name: 'Resource Center',
    view: 'All_Resources'
  },
  {
    path: '/add_resource',
    name: 'All Resources',
    view: 'New_Resource'
  },

  {
    path: '/notifications',
    view: 'Notifications'
  },
  {
    path: '/add_device',
    name: 'Add Devices',
    view: 'AddDevices',
    meta: { title: 'Add Devices' }
  }
]
