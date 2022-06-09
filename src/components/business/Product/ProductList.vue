<template>
  <div class="grid grid-cols-3 p-3 gap-3">
    <product-item v-for="item of list" :key="item.styleId" :item="item"></product-item>
  </div>
</template>

<script>
import ProductItem from './ProductItem'

export default {
  name: 'ProductList',

  components: {
    ProductItem,
  },

  props: {
    list: Array,
  },
}
</script>

<style scoped>

</style>
