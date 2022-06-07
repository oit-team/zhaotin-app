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
]
