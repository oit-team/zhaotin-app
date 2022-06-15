<template>
  <div v-if="item" class="relative">
    <div
      class="flex items-center pl-2 py-1"
      :class="{'is-active': collapse}"
    >
      <div class="flex items-center space-x-2">
        <slot name="checkbox"></slot>
        <vc-img
          class="overflow-hidden rounded-lg"
          :src="item.imgUrl"
          fit="contain"
          size="40"
          @click.native.stop="$router.to('ProductDetail', { styleId: item.styleId })"
        ></vc-img>
      </div>
      <div class="flex items-center rounded-lg bg-line flex-1 px-2 self-stretch" @click="collapse = !collapse">
        <div class="flex-1 text-xs">
          <span>{{ item.styleColorName || item.styleColor }}</span>
        </div>
        <div class="flex flex-col items-end">
          <van-badge class="times-symbol !bg-primary text-white">
            <template #content>
              ×{{ calcTotal(item) }}
            </template>
          </van-badge>
        </div>
        <div class="ml-2">
          <!-- <vc-icon :class="{'transform rotate-[180deg]': collapse}" name="icon-angle-down"></vc-icon> -->
        </div>
      </div>
    </div>
    <div v-show="collapse" class="mx-6 rounded-b-lg space-y-2 pt-2 pb-2">
      <div v-for="size of item.styleSize" :key="size.sizeName" class="flex items-center justify-between px-2">
        <div class="text-xs ml-20">{{ size.sizeName }}</div>
        <div>
          <van-stepper
            v-if="!readonly"
            v-model="size.sizeNumber"
            :min="0"
            integer
            :long-press="false"
            @change="changeNumber($event, size)"
          />
          <span v-else class="times-symbol text-xs">×{{ size.sizeNumber }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ShopStyleItem',

  props: {
    item: Object,
    readonly: Boolean,
  },

  data: () => ({
    collapse: false,
  }),

  methods: {
    changeNumber(value, size) {
      this.$emit('change-number', {
        value,
        size,
      })
    },
    calcTotal(item) {
      return item.styleSize.reduce((prev, curr) => prev + curr.sizeNumber, 0)
    },
  },
}
</script>

<style scoped lang="scss">
.u-number-box::v-deep {
  & > {
    * {
      height: 25px !important;
    }

    .u-number-box__input {
      margin: 0;
      border: 1px solid #f5ede2;
    }

    .u-number-box__minus, .u-number-box__plus {
      width: 25px !important;
      background-color: #f5ede2 !important;
    }
  }
}
</style>
