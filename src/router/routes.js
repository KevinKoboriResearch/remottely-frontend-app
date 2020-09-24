import Auth from 'pages/free/Auth'
import Error404 from 'pages/free/Error404'
import Marketing from 'pages/free/Marketing'
import UserDeviceHistory from 'pages/user/UserDeviceHistory'
import UserDevices from 'pages/user/UserDevices'
import UserDevicesHistory from 'pages/user/UserDevicesHistory'
import UserEvent from 'pages/user/UserEvent'
import UserEvents from 'pages/user/UserEvents'
import UserMaps from 'pages/user/UserMaps'
import UserNewEvent from 'pages/user/UserNewEvent'
import UserNotifications from 'pages/user/UserNotifications'
import UserProfile from 'pages/user/UserProfile'
// import Auth from '../pages/user/UserProfile'
// import Userdevices from '../pages/user/Userdevices'
// import UserDevicesByCategory from '../pages/user/UserDevicesByCategory'
// import UserCategories from '../pages/user/UserCategories'
// import UserMapMarker from '../pages/user/UserMapMarker'
// import AdminPages from '../pages/admin/AdminPages'
// import DevicesByCategory from '../pages/device/DevicesByCategory'
// import DeviceById from '../pages/device/DeviceById'
// import Dashboard from '../pages/user/Dashboard'
// import Connections from '../pages/user/Connections'


const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      //user routes
      { name: 'userDeviceHistory', path: 'user/device-history', component: UserDeviceHistory },
      { name: 'userDevices', path: 'user/devices', component: UserDevices },
      { name: 'userDevicesHistory', path: 'user/devices-history', component: UserDevicesHistory },
      { name: 'userEvent', path: 'user/event', component: UserEvent },
      { name: 'userEvents', path: 'user/events', component: UserEvents },
      { name: 'userMaps', path: 'user/maps', component: UserMaps },
      { name: 'userNewEvent', path: 'user/new-event', component: UserNewEvent },
      { name: 'userNotifications', path: 'user/notifications', component: UserNotifications },
      { name: 'userProfile', path: 'user/profile', component: UserProfile },
      { name: 'marketing', path: '', component: Marketing },
      { name: 'error', path: '*', component: Error404 }
      //admin routes
      //free routes
    ]
  },
  { name: 'auth', path: 'auth', component: Auth }
]

export default routes
