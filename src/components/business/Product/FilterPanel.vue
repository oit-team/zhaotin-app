<template>
  <div class="filter-panel">
    <van-popup :value="show" position="top" @input="show = false">
      <div class="bg-white" @click.stop>
        <div class="flex h-[40vh]">
          <div class="flex-1 overflow-auto my-2 mx-3 space-y-2 pb-2">
            <div>
              <span class="text-sm text-secondary">{{ tabList[0] }}</span>
              <vc-item-group
                v-model="form.styleMajor"
                class="grid grid-cols-3 gap-2"
                active-class="!bg-primary text-white"
              >
                <vc-item
                  v-for="item of styleTypeList"
                  :key="item.dictitemCode"
                  class="text-sm text-center py-1 rounded bg-gray"
                  :value="item.dicttimeDisplayName"
                >
                  {{ item.dicttimeDisplayName }}
                </vc-item>
              </vc-item-group>
            </div>

            <div>
              <span class="text-sm text-secondary">{{ tabList[1] }}</span>
              <vc-item-group
                v-model="form.styleLength"
                class="grid grid-cols-3 gap-2"
                active-class="!bg-primary text-white"
              >
                <vc-item
                  v-for="item of styleLengthList"
                  :key="item.dictitemCode"
                  class="text-sm text-center py-1 rounded bg-gray"
                  :value="item.dicttimeDisplayName"
                >
                  {{ item.dicttimeDisplayName }}
                </vc-item>
              </vc-item-group>
            </div>

            <div>
              <span class="text-sm text-secondary">{{ tabList[2] }}</span>
              <div class="flex items-center">
                <van-field
                  v-model="form.startTradePrice"
                  class="border border-line rounded py-1 px-2"
                  placeholder="最低价格"
                  type="number"
                ></van-field>
                <span class="mx-1">-</span>
                <van-field
                  v-model="form.endTradePrice"
                  class="border border-line rounded py-1 px-2"
                  placeholder="最高价格"
                  type="number"
                ></van-field>
              </div>
            </div>

            <div>
              <span class="text-sm text-secondary">{{ tabList[3] }}</span>
              <vc-item-group
                v-model="form.orderType"
                class="grid grid-cols-3 gap-2"
                active-class="!bg-primary text-white"
              >
                <vc-item
                  v-for="(item, index) of ['未下款', '已下款']"
                  :key="index"
                  class="text-sm text-center py-1 rounded bg-gray"
                  :value="String(index+2)"
                >
                  {{ item }}
                </vc-item>
              </vc-item-group>
            </div>
          </div>
        </div>

        <div class="flex p-3 space-x-3">
          <van-button round block @click="reset()">重置</van-button>
          <van-button type="primary" round block @click="submit()">确定</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { dictitemInfoAllMethod } from '@/api/product'

export default {
  name: 'FilterPanel',

  data: () => ({
    show: false,
    tabList: ['款类型', '款式', '价格', '最近一年'],
    tabIndex: 0,
    styleLengthList: [],
    styleTypeList: [],
    form: {
      styleLength: '',
      startTradePrice: '',
      endTradePrice: '',
      styleMajor: '',
      orderType: '',
    },
  }),

  computed: {
    filterCount() {
      return Object.values(this.form).filter(item => !!item).length
    },
  },

  watch: {
    show() {
      this.show && this.loadData()
    },
  },

  methods: {
    open() {
      this.show = true
    },
    close() {
      this.show = false
    },
    toggle() {
      this.show = !this.show
    },
    loadData() {
      this.dictitemInfoAllMethod('STYLE_LENGTH').then(res => {
        this.styleLengthList = res.body.result
      })

      this.dictitemInfoAllMethod('STYLE_BAR_CODE').then(res => {
        this.styleTypeList = res.body.result
      })
    },
    dictitemInfoAllMethod(type) {
      return dictitemInfoAllMethod({
        type,
      }, {
        cmd: 100009,
      })
    },
    reset() {
      this.form = this.$options.data().form
      this.submit()
    },
    submit() {
      this.$emit('confirm', {
        params: this.form,
        count: this.filterCount,
      })
      this.close()
    },
    setFilter(data) {
      if (!data) return

      let changed = false

      Object.keys(this.form).forEach(key => {
        if (data[key]) {
          this.form[key] = data[key]
          changed = true
        }
      })

      if (changed) this.submit()
    },
  },
}
</script>

<style scoped lang="scss">
//.filter-panel__overlay {
//  position: absolute !important;
//}
//
//.filter-panel {
//  ::v-deep .u-input {
//    padding: 3px 6px !important;
//  }
//}

.filter-panel {
  .van-popup, ::v-deep .van-overlay {
    position: absolute;
  }
}
</style>
