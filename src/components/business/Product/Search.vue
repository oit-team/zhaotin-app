<template>
  <div class="sticky-top z-50 bg-white flex items-center p-2">
    <div>
      <vc-icon
        v-if="back"
        class="p-1 mr-2 text-primary text-lg"
        name="chevron-left"
        @click="$router.back()"
      />
    </div>
    <van-search
      v-model="searchText"
      class="flex-1 p-0"
      shape="round"
      :disabled="isLink"
      clearable
      placeholder="搜索商品名称/款号/面料"
      v-on="$listeners"
    />
    <div>
      <slot name="after"></slot>
    </div>
  </div>
</template>

<script>
import { Search } from 'vant'

export default {
  name: 'Search',

  components: {
    [Search.name]: Search,
  },

  props: {
    back: Boolean,
    isLink: Boolean,
  },

  data: () => ({
    searchText: '',
  }),
}
</script>

<style lang="scss" scoped>
.van-search__content {
  @apply border border-primary;

  ::v-deep .van-icon-search {
    @apply text-primary;
  }
}
</style>
