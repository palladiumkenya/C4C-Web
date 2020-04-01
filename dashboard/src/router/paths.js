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
      alert('You must log in first')
      if (!store.getters['auth/authenticated']) {
        console.log(store.getters['auth/authenticated'])
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
      alert('You must log in first')
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
      alert('You must log in first')
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
      alert('You must log in first')
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
    meta: { title: 'Upload Excel' },
    beforeEnter: (to, from, next) => {
      alert('You must log in first')
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
      alert('You must log in first')
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
      alert('You must log in first')
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
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
    path: '/exposures',
    name: 'Exposures',
    view: 'Exposures',
    beforeEnter: (to, from, next) => {
      alert('You must log in first')
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
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
    path: '/view_resource',
    name: 'Resource',
    view: 'View_Resource'
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
      alert('You must log in first')
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'login'
        })
      }
    }
  }
]
