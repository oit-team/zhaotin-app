<template>
  <div
    class="h-full w-full flex flex-col bg-white rounded-lg text-center overflow-hidden relative"
    @click="$router.to('ProductDetail', { styleId: item.styleId })"
  >
    <vc-img
      v-if="item.styleVideo"
      class="absolute right-2 top-2 z-10"
      src="/img/home/aa5a363f6fa67f8060afccd025976970.png"
      size="20"
    ></vc-img>
    <vc-img v-if="item.imgUrlList[0]" class="h-150px overflow-hidden" :src="item.imgUrlList[0].resUrl"></vc-img>
    <div class="py-1">
      <div class="text-xs">{{ item.styleNo }}</div>
      <vc-text class="text-xs" tag="div" mode="price" :text="item.tradePrice" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',

  props: {
    item: Object,
  },
}
</script>

<style scoped>
</style>
