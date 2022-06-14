import './Text.scss'

const MODE = {
  PRICE: 'price',
}

// @vue/components
export default {
  name: 'VcText',

  props: {
    tag: {
      type: String,
      default: 'span',
    },
    mode: String,
    text: [String, Number],
  },

  computed: {
    price() {
      const price = Number(parseFloat(this.text).toFixed(2))
      const arr = price.toString().split('.')
      arr[0] = arr[0].replace(/(\d)(?=(\d{3})+$)/ig, '$1,')
      return arr.join('.')
    },
  },

  methods: {
    genPrice(h) {
      const tag = this.tag

      return (
        <tag class="vc-text-price">
          <span class="vc-text-price__symbol">￥</span>
          <span class="vc-text-price__content">{this.price}</span>
        </tag>
      )
    },
  },

  render(h) {
    if (this.text !== undefined) {
      switch (this.mode) {
        case MODE.PRICE:
          return this.genPrice(h)
      }
    }

    return undefined
  },
}
