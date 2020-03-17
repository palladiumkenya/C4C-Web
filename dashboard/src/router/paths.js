/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */

export default [
  {
    path: '',
    // Relative to /src/views
    view: 'Dashboard'
  },

  {
    path: '/user-profile',
    name: 'User Profile',
    view: 'UserProfile'
  },
  {
    path: '/immunizations',
    name: 'Immunizations',
    view: 'Immunizations'
  },
    {
    path: '/hbv-summary',
    name: 'HBV Reports',
    view: 'HbvReports'
  },
    {
    path: '/other-diseases',
    name: 'Other Diseases',
    view: 'OtherDiseases'
  },
  {
    path: '/add-user',
    name: 'HCW Upload',
    view: 'HCW_Upload'
  },
  {
    path: '/exposure-list',
    name: 'Exposures List',
    view: 'Exposures_List'
  },
  {
    path: '/bulk-signup',
    name: 'BulkSignup',
    view: 'BulkSignup',
    meta: { title: 'Upload Excel' }
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
