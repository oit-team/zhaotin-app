import { Image } from 'vant'

export const VcImg = {
  name: 'vc-img',

  // mixins: [Image],

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
