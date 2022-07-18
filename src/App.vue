<template>
  <div id="app">
    <better-view ref="view" :tabs="['Home', 'Product', 'Order', 'Account']" />
  </div>
</template>

<script>
import { BetterView } from '@oit/vue-components'

export default {
  components: {
    BetterView,
  },

  async created() {
    if (localStorage.getItem('token')) {
      await this.$store.dispatch('updateUserData')
      await this.$store.dispatch('shoppingCart/getShoppingCart')
    }
  },
}
</script>

<style lang="scss">
.vc-router-view {
  background-color: theme('colors.gray');
}
</style>
