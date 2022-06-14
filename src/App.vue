<template>
  <div id="app">
    <better-view ref="view" :tabs="['Home', 'Product', 'Order', 'Account']" />
  </div>
</template>

<script>
import BetterView from '@/components/business/BetterView'

export default {
  components: {
    BetterView,
  },

  created() {
    localStorage.getItem('token') && this.$store.dispatch('updateUserData')
  },
}
</script>

<style lang="scss">
@layer {
  .vc-router-view {
    background-color: theme('colors.gray');
  }
}
</style>
