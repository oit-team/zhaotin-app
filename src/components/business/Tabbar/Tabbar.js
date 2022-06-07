import { Tabbar, TabbarItem } from 'vant'

let active = 0

// @vue/component
export default {
  data: () => ({
    active,
  }),

  watch: {
    active() {
      active = this.active
    },
  },

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
        to: '',
      },
      {
        name: '订单',
        icon: '',
        to: '',
      },
      {
        name: '我的',
        icon: '',
        to: 'Account',
      },
    ]

    return (
      <Tabbar vModel={this.active} route>
        {
          navs.map(item => <TabbarItem icon="home-o" to={{ name: item.to }}>{item.name}</TabbarItem>)
        }
      </Tabbar>
    )
  },
}
