<template>
  <div class="grid grid-cols-3 p-3 gap-3">
    <ProductItem
      v-for="item of list"
      :key="item.styleId"
      :item="item"
      @click="$emit('click', item)"
    ></ProductItem>
  </div>
</template>

<script>
import ProductItem from './ProductItem'

export default {
  name: 'ProductList',

  components: {
    ProductItem,
  },

  provide() {
    return {
      keyMap: this.keyMap,
    }
  },

  props: {
    list: Array,
    keyMap: {
      type: Object,
      default: () => ({
        isVideo: 'styleIsVideo',
        img: 'resUrl',
        title: 'styleNo',
        price: 'tagPrice',
      }),
    },
  },
}
</script>

<style scoped>

</style>
