import { Image } from 'vant'

// @vue/components
export default {
  name: 'VcImg',

  props: {
    ...Image.props,
  },

  render(h) {
    return h(Image, {
      props: this.$props,
      scopedSlots: this.$scopedSlots,
    })
  },
}
