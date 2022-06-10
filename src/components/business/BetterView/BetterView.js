import './BetterView.scss'
import VueRouter from 'vue-router'

export default {
  name: 'VcBetterView',

  props: {
    tabs: {
      type: Array,
      default: () => ([]),
    },
    include: {
      type: Array,
      default: () => ([]),
    },
    exclude: {
      required: false,
    },
    max: [String, Number],
  },

  data: () => ({
    routeHistory: [],
    transitionName: '',
  }),

  watch: {
    $route(to, from) {
      // 是否是前往主页
      const toHome = this.tabs.includes(to.name)
      // 是否来自主页
      const fromHome = this.tabs.includes(from.name)

      const routeIndex = this.routeHistory.indexOf(to.name)
      // 是否是返回
      let isBack = false

      if (~routeIndex) {
        // 移除之后的记录
        this.routeHistory.splice(routeIndex + 1)
        isBack = true
      } else if (!toHome) {
        // 添加记录
        this.routeHistory.push(to.name)
      } else {
        // 清空记录
        this.routeHistory = []
      }

      // 如果是主页之间跳转、首个路由则无动画
      if ((toHome && fromHome) || from === VueRouter.START_LOCATION) {
        this.transitionName = ''
      } else {
        // 进入路由的动画
        const enterRouteTransition = to.meta.transition && to.meta.transition.enter
        // 退出路由的动画
        const leaveRouteTransition = from.meta.transition && from.meta.transition.leave

        if (toHome) {
          this.switchTransition(leaveRouteTransition, 'pop-route')
        } else {
          this.switchTransition(enterRouteTransition, isBack ? 'pop-route' : 'push-route')
        }
      }
    },
  },

  methods: {
    switchTransition(transition, defaultTransition) {
      if (transition !== undefined) {
        if (typeof transition === 'boolean') {
          this.transitionName = transition ? defaultTransition : ''
        } else {
          this.transitionName = transition
        }
      } else {
        this.transitionName = defaultTransition
      }
    },
  },

  render(h) {
    return (
      <div class="vc-better-view">
        <transition name={this.transitionName}>
          <keep-alive
            include={[...this.tabs, ...this.routeHistory, ...this.include]}
            exclude={this.exclude}
            max={this.max}
          >
            <router-view class="vc-router-view" />
          </keep-alive>
        </transition>
      </div>
    )
  },
}
