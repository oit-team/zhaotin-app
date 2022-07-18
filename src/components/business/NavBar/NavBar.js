import { NavBar } from 'vant'

export default {
  name: 'VcNavBar',

  functional: true,

  props: {
    back: Boolean,
    ...NavBar.props,
  },

  render(h, ctx) {
    const data = {
      props: ctx.props,
      on: {
        'click-left': (...e) => {
          ctx.props.back && ctx.parent.$router?.back()
          ctx.listeners['click-left']?.(...e)
        },
      },
    }

    return h(NavBar, data, ctx.children)
  },
}
