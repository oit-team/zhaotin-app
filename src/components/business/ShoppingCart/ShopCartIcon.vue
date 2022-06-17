<template>
  <van-badge
    class="flex"
    max="99"
    :content="$store.getters['shoppingCart/total'] || ''"
    @click.native="$router.to('ShoppingCartList')"
  >
    <vc-icon class="text-xl text-primary align-baseline" name="shopping-cart"></vc-icon>
  </van-badge>
</template>

<script>
export default {
  name: 'ShopCartIcon',
}
</script>

<style lang="scss" scoped>
</style>
