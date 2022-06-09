export default [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Account/Login'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home/index'),
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account/index'),
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('../views/Account/Setting'),
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: () => import('../views/Account/ChangePassword'),
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: () => import('../views/Account/Feedback'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/Account/About'),
  },
  {
    name: 'Collection',
    path: '/collection',
    component: () => import('../views/Product/Collection'),
  },
]
