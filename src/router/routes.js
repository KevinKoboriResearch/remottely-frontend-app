import Home from '../pages/static/home/Home'
import About from '../pages/static/about/About'
import Services from '../pages/static/services/Services'
// import Doubts from '../pages/static/doubts/Doubts'
import UserProfile from '../pages/user/UserProfile'
import Userdevices from '../pages/user/Userdevices'
import UserDevicesByCategory from '../pages/user/UserDevicesByCategory'
import UserCategories from '../pages/user/UserCategories'
import UserMapMarker from '../pages/user/UserMapMarker'
import AdminPages from '../pages/admin/AdminPages'
import DevicesByCategory from '../pages/device/DevicesByCategory'
import DeviceById from '../pages/device/DeviceById'
import Auth from '../pages/auth/Auth'
import Error404 from '../pages/Error404'
// import Tutorials from '../pages/static/doubts/Tutorials'
import Dashboard from '../pages/user/Dashboard'
import Connections from '../pages/user/Connections'


const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      //free routes
      { name: 'home', path: '', component: Home },
      { name: 'about', path: 'about', component: About },
      { name: 'services', path: 'services', component: Services },
      // { name: 'doubts', path: 'doubts', component: Doubts },
      //user routes
      { name: 'userProfile', path: 'user/profile', component: UserProfile },
      { name: 'userdevices', path: 'user/devices', component: Userdevices },
      { name: 'userDevicesByCategory', path: 'user/category/:id/devices', component: UserDevicesByCategory },
      { name: 'userCategories', path: 'user/categories', component: UserCategories },
      { name: 'userMapMarker', path: 'user/user-map-marker', component: UserMapMarker },
      { name: 'deviceById', path: 'deviceById', component: DeviceById },
      { name: 'dashboard', path: 'dashboard', component: Dashboard },
      { name: 'connections', path: 'connections', component: Connections },
      // { name: 'tutorials', path: 'tutorials', component: Tutorials },
      //admin routes
      { name: 'adminPages', path: 'admin', component: AdminPages, meta: { requiresAdmin: true } },
      //free routes
      { name: 'devicesByCategory', path: 'categories/:id/device', component: DevicesByCategory },
      { name: 'auth', path: 'auth', component: Auth },
      { name: 'error', path: '*', component: Error404 }
    ]
  }
]

export default routes
