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
    path: '/address',
    name: 'Address',
    component: () => import('../views/Account/Address'),
  },
  {
    path: '/address-update',
    name: 'AddressUpdate',
    component: () => import('../views/Account/AddressUpdate'),
  },
  {
    path: '/collection',
    name: 'Collection',
    component: () => import('../views/Product/Collection'),
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/Order/index'),
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('../views/Product/index'),
  },
  {
    path: '/order/info/:orderNo',
    name: 'OrderInfo',
    component: () => import('../views/Order/OrderInfo'),
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('../views/Product/index'),
  },
  {
    path: '/order/submit',
    name: 'OrderSubmit',
    component: () => import('../views/Order/OrderSubmit'),
  },
  {
    path: '/shopping-cart-list',
    name: 'ShoppingCartList',
    component: () => import('../views/Product/ShoppingCartList'),
  },
  {
    path: '/product/detail/:styleId',
    name: 'ProductDetail',
    component: () => import('../views/Product/Detail'),
  },
  {
    path: '/product/search',
    name: 'ProductSearch',
    component: () => import('../views/Product/Search'),
  },
  {
    path: '/points-mall',
    name: 'PointsMall',
    component: () => import('../views/PointsMall/index'),
  },
  {
    path: '/points-mall/detail/:styleId',
    name: 'PointsMallDetail',
    component: () => import('../views/PointsMall/Detail'),
  },
  {
    path: '/points-mall/product-detail/:styleId',
    name: 'PointsMallProductDetail',
    meta: {
      pointsMall: true,
      keepAliveName: 'ProductDetail',
    },
    component: () => import('../views/Product/Detail'),
  },
  {
    path: '/points-mall/order',
    name: 'PointsMallOrder',
    component: () => import('../views/PointsMall/Order'),
  },
  {
    path: '/points-mall/order-info/:orderNo',
    name: 'PointsMallOrderInfo',
    component: () => import('../views/PointsMall/OrderInfo'),
  },
]
