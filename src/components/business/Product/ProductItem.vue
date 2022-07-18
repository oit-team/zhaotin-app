<template>
  <div
    class="h-full w-full flex flex-col bg-white rounded-lg text-center overflow-hidden relative"
    @click="$emit('click', $event)"
  >
    <vc-img
      v-if="item[keyMap.isVideo]"
      class="absolute right-2 top-2 z-10"
      src="img/home/aa5a363f6fa67f8060afccd025976970.png"
      size="20"
    ></vc-img>
    <vc-img class="h-150px overflow-hidden" :src="item[keyMap.img]"></vc-img>
    <div class="py-1">
      <div class="text-xs">
        {{ item[keyMap.title] }}
      </div>
      <vc-text class="text-xs" tag="div" mode="price" :text="item[keyMap.price]" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',

  inject: {
    keyMap: {
      default: {},
    },
  },

  props: {
    item: Object,
  },
}
</script>

<style scoped>
</style>
