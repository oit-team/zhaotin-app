import { Image } from 'vant'
import { convertToUnit } from '@/utils'

// @vue/components
export default {
  name: 'VcImg',

  props: {
    ...Image.props,
    size: [String, Number],
  },

  render(h) {
    const { width, height, size } = this.$props

    return h(Image, {
      props: {
        ...this.$props,
        width: convertToUnit(size ?? width),
        height: convertToUnit(size ?? height),
      },
      on: this.$listeners,
      scopedSlots: this.$scopedSlots,
    })
  },
}
