<template>
  <div class="bg-white rounded-lg">
    <div class="flex justify-between p-2 items-center">
      <div class="flex">
        <slot name="checkbox"></slot>
        <span class="ml-2">{{ item.styleName }}</span>
      </div>
      <div class="text-xs text-secondary">{{ item.styleNo }}</div>
    </div>
    <div class="px-2 pb-2 space-y-2">
      <slot />
    </div>
    <div class="flex px-2 pb-2 justify-end">
      <div class="flex text-sm">
        <span>单价：</span>
        <!-- <u-text class="text-price" mode="price" :text="price"></u-text> -->
        <span class="text-price">￥{{ price }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'shop-item',

  props: {
    item: Object,
    price: Number,
  },
}
</script>

<style scoped>

</style>
