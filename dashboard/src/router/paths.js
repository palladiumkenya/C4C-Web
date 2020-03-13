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
    path: '/add-user',
    name: 'HCW_Upload',
    view: 'HCW_Upload'
  },
  {
    path: '/bulk-signup',
    name: 'BulkSignup',
    view: 'BulkSignup',
    meta: { title: 'Upload Excel' }
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
  }
]
