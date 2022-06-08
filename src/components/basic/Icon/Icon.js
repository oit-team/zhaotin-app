import { convertToUnit } from '@/utils'

import './Icon.scss'

// @vue/components
export default {
  name: 'VcIcon',

  props: {
    name: String,
    size: [String, Number],
    color: String,
    code: String,
    iconClass: String,
  },

  data: () => ({
    iconName: '',
    iconSize: '',
  }),

  methods: {
    /**
     * 生成svg图标
     */
    genSvgIcon() {
      const h = this.$createElement

      return h('span', {
        class: 'vc-icon',
        style: {
          height: this.iconSize,
          width: this.iconSize,
          fontSize: this.iconSize,
          color: this.color,
        },
      }, [
        h('svg', {
          class: 'vc-icon__svg',
          attrs: {
            'aria-hidden': true,
          },
          on: this.$listeners,
        }, [
          h('use', {
            attrs: {
              'xlink:href': `#icon-${this.iconName}`,
            },
          }),
        ]),
      ])
    },
    /**
     * 生成unicode图标
     */
    genUnicodeIcon() {
      const h = this.$createElement

      let code = /^&#x.{4};$/.test(this.code) ? this.code.substring(3, 7) : this.code
      code = code ? JSON.parse(`"\\u${code}"`) : ''

      const data = {
        class: this.iconClass,
      }

      return h('span', data, code)
    },
  },

  render() {
    this.iconSize = convertToUnit(this.size)

    // unicode图标
    if (this.code) return this.genUnicodeIcon()

    this.iconName = (this.$slots.default?.[0].text ?? this.name)?.trim() || ''
    // svg图标
    if (this.iconName) return this.genSvgIcon()

    return undefined
  },
}
