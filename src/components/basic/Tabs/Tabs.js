import { Tabs } from 'vant'

import './Tabs.scss'

export default {
  name: 'VcTabs',

  props: {
    ...Tabs.props,
    hideSlider: [Boolean],
  },

  mounted() {
    !this.hideSlider && this.syncWidth()
  },

  methods: {
    syncWidth() {
      this.$nextTick(() => {
        const el = this.$refs.Tabs.$el
        const active = el.querySelector('.van-tab--active .van-tab__text')
        const line = el.querySelector('.van-tabs__line')
        active && line.style.setProperty('--vc-tab-line-width', `${active.offsetWidth}px`)
      })
    },
  },

  render(h) {
    return h(Tabs, {
      ref: 'Tabs',
      class: {
        'vc-tabs-slider--hidden': this.hideSlider,
      },
      props: this.$props,
      on: {
        ...this.$listeners,
        click: (e) => {
          this.$emit('click', e)
          this.$emit('input', e)
          !this.hideSlider && this.syncWidth()
        },
      },
    }, this.$slots.default)
  },
}
