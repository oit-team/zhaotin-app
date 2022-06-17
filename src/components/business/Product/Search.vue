<template>
  <div class="sticky-top z-50 bg-white flex items-center px-3 py-2 flex-shrink-0">
    <div>
      <vc-icon
        v-if="back"
        class="p-1 mr-2 text-primary text-lg"
        name="chevron-left"
        @click.native="$router.back()"
      />
    </div>
    <van-search
      v-model="searchText"
      ref="search"
      class="flex-1 p-0"
      shape="round"
      :disabled="isLink"
      clearable
      placeholder="搜索商品名称/款号/面料"
      v-on="$listeners"
      @click="onClick()"
    />
    <div class="search-after">
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
    autofocus: Boolean,
  },

  data: () => ({
    searchText: '',
  }),

  mounted() {
    if (this.autofocus) {
      const search = this.$refs.search?.querySelector('input')
      setTimeout(() => search.focus(), 400)
    }
  },

  methods: {
    onClick() {
      this.isLink && this.$router.to('ProductSearch')
    },
  },
}
</script>

<style lang="scss" scoped>
.van-search__content {
  @apply border border-primary;

  ::v-deep .van-icon-search {
    @apply text-primary;
  }
}

.search-after {
  flex-shrink: 0;
}
</style>
