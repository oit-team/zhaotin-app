import { Tabbar, TabbarItem } from 'vant'
import Img from '@/components/basic/Img'

import './Tabbar.scss'

// @vue/component
export default {
  render(h) {
    const navs = [
      {
        name: '首页',
        icon: '750b59a146c959406da83bd55ab44fa0',
        activeIcon: '31a239df9fc617245def7a7618e78fc0',
        to: 'Home',
      },
      {
        name: '产品',
        icon: 'e4ea361325a3a3fe6308d0d56158c0a1',
        activeIcon: '5fb8d536d86ef5812b9d567b0abf3543',
        to: 'Product',
      },
      {
        name: '订单',
        icon: '83a18827ba95015fa9d0a49e83d62d7a',
        activeIcon: '134c221f8c08c1fa8eacf3ec4bd43c94',
        to: 'Order',
      },
      {
        name: '我的',
        icon: '933d5419072d63ab10b27214953d11bb',
        activeIcon: '1cbf0189bbe94848d1e9a82e02e942d5',
        to: 'Account',
      },
    ]

    // eslint-disable-next-line no-unused-vars
    const genIcon = icon => <Img showLoading={false} src={`img/tabs/${icon}.png`} size={24} />

    return (
      <div class="vc-tabbar">
        <Tabbar route>
          {
            navs.map(item => (
              <TabbarItem
                icon="home-o"
                to={{ name: item.to }}
                scopedSlots={{
                  icon: ({ active }) => genIcon(active ? item.activeIcon : item.icon),
                }}
              >{item.name}
              </TabbarItem>
            ))
          }
        </Tabbar>
      </div>
    )
  },
}
