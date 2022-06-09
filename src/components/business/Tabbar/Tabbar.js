import { Tabbar, TabbarItem } from 'vant'

// @vue/component
export default {
  render(h) {
    const navs = [
      {
        name: '首页',
        icon: '',
        to: 'Home',
      },
      {
        name: '产品',
        icon: '',
        to: 'Product',
      },
      {
        name: '订单',
        icon: '',
        to: 'Order',
      },
      {
        name: '我的',
        icon: '',
        to: 'Account',
      },
    ]

    return (
      <Tabbar route>
        {
          navs.map(item => <TabbarItem icon="home-o" to={{ name: item.to }}>{item.name}</TabbarItem>)
        }
      </Tabbar>
    )
  },
}
