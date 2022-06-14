<template>
  <van-popup v-model="showShopping" position="bottom">
    <div class="h-[70vh] flex flex-col bg-white rounded-t-lg overflow-hidden">
      <div class="flex overflow-hidden flex-1">
        <div class="w-[115px] bg-line h-full overflow-auto">
          <vc-item-group v-model="selected" active-class="bg-white" mandatory>
            <vc-item v-for="item of data.styleColorList" :key="item.id" class="flex p-2" :value="item">
              <vc-img class="overflow-hidden rounded" :src="item.styleImg[0].resUrl" width="35" height="60"></vc-img>
              <div class="ml-2">
                <div class="text-xs text-secondary">{{ item.styleColor }}</div>
                <u-badge
                  class="bg-price !inline-flex choose-num"
                  max="99"
                  :value="selectedItemTotal(item.id)"
                ></u-badge>
              </div>
            </vc-item>
          </vc-item-group>
        </div>
        <div v-if="selected" class="overflow-y-auto overflow-x-hidden flex-1 p-3 h-full space-y-2">
          <div class="flex mb-7">
            <vc-img
              class="overflow-hidden rounded"
              :src="selected.styleImg[0].resUrl"
              width="115"
              height="160"
            ></vc-img>
            <div class="flex-1 -mr-5 text-center">
              <div>
                <vc-text
                  class="text-price text-lg font-bold pr-2 !justify-center"
                  mode="price"
                  :text="data.tradePrice"
                ></vc-text>
              </div>
            </div>
          </div>
          <div
            v-for="size of selected.styleSize"
            :key="size.styleSize"
            class="flex justify-between items-center"
          >
            <div class="text-sm">{{ size.sizeName }}</div>
            <div class="flex-1">
              <u-number-box
                class="justify-end"
                :value="numberMap[selected.id] ? numberMap[selected.id][size.sizeName] : 0"
                :min="0"
                integer
                @change="changeNumber($event, size.sizeName)"
              ></u-number-box>
            </div>
          </div>
        </div>
      </div>
      <div class="flex p-2 space-x-2">
        <van-button
          class="!text-primary"
          color="#F3F1EF"
          text="取消"
          round
          block
          @click="showShopping = false"
        ></van-button>
        <van-button
          class="!bg-price !text-white"
          block
          text="确定"
          shape="circle"
          @click="onConfirm"
        ></van-button>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: 'ProductChoose',

  props: {
    data: Object,
  },

  data: () => ({
    showShopping: false,
    selected: null,
    numberMap: {},
  }),

  methods: {
    open() {
      // this.showShopping = true
    },
    changeNumber({ value }, size) {
      if (!this.numberMap[this.selected.id]) this.$set(this.numberMap, this.selected.id, {})
      this.$set(this.numberMap[this.selected.id], size, value)
    },
    selectedItemTotal(id) {
      return Object.entries(this.numberMap[id] ?? {}).reduce((prev, [, value]) => {
        return prev + value
      }, 0)
    },
    onConfirm() {
      this.showShopping = false
      this.$emit('confirm', this.numberMap)
    },
    reset() {
      this.numberMap = {}
    },
  },
}
</script>

<style scoped lang="scss">
.u-popup::v-deep {
  .u-transition {
    z-index: 60 !important;
  }

  .u-popup__content {
    overflow: hidden;
  }
}

.choose-num ::before {
  margin-right: 2px;
  content: "\00D7";
}

.u-number-box::v-deep {
  & > {
    * {
      height: 25px !important;
    }

    .u-number-box__input {
      margin: 0;
      border: 1px solid #f5ede2;
      background-color: white !important;
    }

    .u-number-box__minus, .u-number-box__plus {
      width: 25px !important;
      background-color: #f5ede2 !important;
    }
  }
}
</style>
