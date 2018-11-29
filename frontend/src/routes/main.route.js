import Main from '../components/views/main/Main.vue'

import Profile from '../components/views/profile/Profile.vue'

import spectrumRoutes from './spectrum.route'
import userRoutes from './users.route'
import roleRoutes from './roles.route'
import groupRoutes from './groups.route'
import permissionRoutes from './permissions.route'

import memberRoutes from './members.route'
import connectionRoutes from './connections.route'
import documentRoutes from './documents.route'
import imageRoutes from './images.route'

import auditLogRoutes from './audit-logs.route'

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      {
        path: 'profile',
        component: Profile,
        name: 'Profile',
        meta: {
          description: 'Profile details',
          title: 'Profile',
          requiresAuth: true
        }
      },
      ...spectrumRoutes,
      ...userRoutes,
      ...roleRoutes,
      ...groupRoutes,
      ...permissionRoutes,
      ...memberRoutes,
      ...connectionRoutes,
      ...documentRoutes,
      ...imageRoutes,
      ...auditLogRoutes
    ]
  }
]

export default routes
