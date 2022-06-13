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
}
</script>

<style lang="scss">
@layer {
  .vc-router-view {
    background-color: #ffffff;
  }
}
</style>
