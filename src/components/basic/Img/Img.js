import { Image } from 'vant'

export const VcImg = {
  name: 'vc-img',

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
