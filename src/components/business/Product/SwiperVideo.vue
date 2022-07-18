<template>
  <div class="product-video">
    <VuePlyr
      ref="plyr"
      :options="{
        controls: ['play', 'play-large', 'progress', 'mute', 'fullscreen'],
        fullscreen: { enabled: true, fallback: false, iosNative: true },
      }"
    >
      <video
        class="h-full w-full object-cover"
        :poster="data.styleVideoPatch"
        :src="data.styleVideo"
        controls
        playsinline="true"
        webkit-playsinline="true"
        @click="$refs.plyr.player.togglePlay()"
        @ready="stopPropagation()"
      ></video>
    </VuePlyr>
  </div>
</template>

<script>
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

export default {
  name: 'SwiperVideo',

  components: {
    VuePlyr,
  },

  props: {
    data: Object,
  },

  methods: {
    stopPropagation() {
      const controls = document.querySelector('.product-video input')
      controls.addEventListener('touchmove', e => e.stopPropagation())
    },
    stop() {
      this.$refs.plyr?.player?.stop()
    },
  },
}
</script>

<style lang="scss">
.product-video {
  --plyr-color-main: theme("colors.primary");
  height: 100%;

  .plyr__poster {
    //pointer-events: none;
  }

  .plyr__volume {
    width: auto;
    min-width: auto;
  }
}
</style>
