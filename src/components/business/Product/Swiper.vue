<template>
  <div>
    <div class="relative m-3">
      <div class="aspect-1/1">
        <van-swipe
          ref="swipe"
          class="rounded-lg"
          indicator-color="white"
          lazy-render
          :show-indicators="false"
          @change="swiperIndex = $event"
        >
          <van-swipe-item v-if="tabIndex === TAB_TYPE.PRODUCT && data.styleVideo" class="swipe-video">
            <SwiperVideo :data="data" />
          </van-swipe-item>
          <van-swipe-item v-for="(item, index) of swiperImageList" :key="index" @click="openPreview(index)">
            <vc-img :src="item.resUrl" size="100%" />
          </van-swipe-item>
        </van-swipe>
      </div>

      <div v-if="tabIndex === TAB_TYPE.STYLE" class="absolute left-2 bottom-2 right-2 flex">
        <div class="bg-white z-10 p-2 rounded-lg bg-opacity-60 backdrop-filter backdrop-blur-lg">
          <div class="text-sm">
            颜色分类({{ data.styleColorList.length }})
          </div>
          <vc-item-group
            v-model="colorCategoryIndex"
            class="space-x-1 overflow-x-auto flex"
            active-class="!border-primary"
            mandatory
          >
            <vc-item
              v-for="item of data.styleColorList"
              :key="item.id"
              class="rounded-lg overflow-hidden w-[50px] h-[50px] border border-line flex-shrink-0 relative"
            >
              <vc-img :src="item.styleImg[0].resUrl" size="100%"></vc-img>
              <div class="absolute bottom-0 text-center w-full text-white leading-0 bg-black bg-opacity-60">
                <span class="text-xs transform scale-80 inline-block">{{ item.styleColor }}</span>
              </div>
            </vc-item>
          </vc-item-group>
        </div>
      </div>
    </div>

    <div class="flex justify-center relative py-1">
      <vc-item-group
        v-model="tabIndex"
        class="inline-flex flex-row justify-center rounded-full bg-white"
        mandatory
        active-class="!bg-primary text-white"
      >
        <vc-item
          v-for="(tab, index) of ['产品', '款式']"
          :key="index"
          class="rounded-full px-2"
        >
          <span class="text-sm leading-0">{{ tab }}</span>
        </vc-item>
      </vc-item-group>
      <div
        v-if="tabIndex === TAB_TYPE.PRODUCT"
        class="absolute right-3 justify-center bg-black bg-opacity-50 rounded-full"
      >
        <span class="text-sm text-white py-1 px-2">
          {{ swiperIndex + 1 }}/{{ swiperImageList.length + Number(data.styleIsVideo) }}
        </span>
      </div>
    </div>

    <van-image-preview
      v-model="showPreview"
      :images="previewImageList"
      :start-position="position"
      get-container="body"
    >
      <template v-if="tabIndex === TAB_TYPE.STYLE" #cover>
        <div v-if="showStyleTab" class="fixed bottom-10 left-1/2 transform -translate-x-1/2">
          <van-button
            class="px-2"
            size="mini"
            square
            color="#cda46c"
            :plain="styleDetailIndex !== STYLE_TYPE.STYLE"
            @click="togglePreview(), styleDetailIndex = STYLE_TYPE.STYLE"
          >
            款式
          </van-button>
          <van-button
            class="!ml-0 px-2"
            size="mini"
            square
            color="#cda46c"
            :plain="styleDetailIndex !== STYLE_TYPE.DETAIL"
            @click="togglePreview(), styleDetailIndex = STYLE_TYPE.DETAIL"
          >
            细节
          </van-button>
        </div>
      </template>
    </van-image-preview>
  </div>
</template>

<script>
import { size } from 'lodash'
import SwiperVideo from './SwiperVideo'

const TAB_TYPE = {
  PRODUCT: 0,
  STYLE: 1,
}

const STYLE_TYPE = {
  STYLE: 0,
  DETAIL: 1,
}

export default {
  name: 'Swiper',

  components: {
    SwiperVideo,
  },

  props: {
    data: Object,
  },

  data: () => ({
    TAB_TYPE,
    STYLE_TYPE,
    swiperIndex: 0,
    position: 0,
    showPreview: false,
    tabIndex: TAB_TYPE.PRODUCT,
    colorCategoryIndex: 0,
    styleDetailIndex: 0,
  }),

  computed: {
    swiperImageList() {
      if (size(this.data)) {
        return [
          this.data.imgUrlList,
          this.data.styleColorList[this.colorCategoryIndex]?.styleImg,
        ][this.tabIndex] || []
      }
      return []
    },
    styleColorList() {
      return this.data.styleColorList.map(item => item.styleImg[0])
    },
    previewImageList() {
      if (size(this.data)) {
        const styleImgs = this.data.styleColorList[this.colorCategoryIndex]

        return ([
          this.data.imgUrlList,
          [styleImgs?.styleImg, styleImgs?.styleImgDetail][this.styleDetailIndex],
        ][this.tabIndex] || []).map(item => item.resUrl)
      }
      return []
    },
    showStyleTab() {
      return !!this.data.styleColorList[this.colorCategoryIndex]?.styleImgDetail?.length
    },
  },

  watch: {
    tabIndex() {
      this.swiperIndex = 0
    },
    swiperIndex() {
      if (this.tabIndex === TAB_TYPE.PRODUCT && this.swiperIndex > 0)
        this.$refs.plyr?.player?.stop()
    },
  },

  methods: {
    openPreview(index) {
      this.position = index
      this.showPreview = true
    },
    togglePreview() {
      this.position = null
      setTimeout(() => this.position = 0)
    },
  },
}
</script>

<style lang="scss">
</style>
