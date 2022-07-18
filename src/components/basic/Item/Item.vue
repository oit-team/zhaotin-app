<template>
  <component :is="tag" :class="classes" @click="onToggle">
    <slot :active="active"></slot>
  </component>
</template>

<script>
export default {
  name: 'VcItem',

  inject: {
    ItemGroup: {
      default: undefined,
    },
  },

  props: {
    tag: {
      type: String,
      default: 'div',
    },
    value: {
      required: false,
    },
  },

  data: () => ({
    itemValue: undefined,
  }),

  computed: {
    active() {
      if (this.ItemGroup?.multiple)
        return this.ItemGroup.innerValue.includes(this.itemValue)

      return this.ItemGroup?.innerValue === this.itemValue
    },
    classes() {
      const activeClass = (this.ItemGroup?.activeClass ?? '').split(' ')
      const inactiveClass = (this.ItemGroup?.inactiveClass ?? '').split(' ')
      return this.active ? activeClass : inactiveClass
    },
  },

  created() {
    if (!this.ItemGroup) throw new TypeError('Item组件必须在ItemGroup组件下使用')
    this.register()
  },

  destroyed() {
    this.ItemGroup.unregister(this)
  },

  methods: {
    register() {
      const index = this.ItemGroup.register(this)
      this.itemValue = this.value ?? index
    },
    onToggle(e) {
      this.ItemGroup.toggle(this)
      this.$emit('click', e)
    },
  },
}
</script>

<style scoped>
</style>
