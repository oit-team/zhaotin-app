<template functional>
  <div class="vc-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'VcContainer',
}
</script>

<style scoped>
.vc-container {
  display: flex;
  flex-direction: column;
}
</style>
