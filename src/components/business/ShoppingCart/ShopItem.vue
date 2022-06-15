<template>
  <div class="bg-white rounded-lg">
    <div class="flex justify-between p-2 px-4 items-center">
      <div class="flex text-sm">
        <slot name="checkbox"></slot>
        <p class=" goodsName">{{ item.styleName }}</p>
      </div>
      <div class="text-xs text-secondary">{{ item.styleNo }}</div>
    </div>
    <div class="px-2 pb-2 px-4 space-y-2">
      <slot />
    </div>
    <div class="flex px-2 pb-2 justify-end">
      <div class="flex text-sm mr-2">
        <span>单价：</span>
        <vc-text :text="price" mode="price"></vc-text>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopItem',

  props: {
    item: Object,
    price: Number,
  },
}
</script>

<style scoped>
.goodsName{
  width: 80%;
}
</style>
