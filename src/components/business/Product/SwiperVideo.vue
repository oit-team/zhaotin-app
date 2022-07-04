<template>
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
      const controls = document.querySelector('.swipe-video input')
      controls.addEventListener('touchmove', e => e.stopPropagation())
    },
    stop() {
      this.$refs.plyr?.player?.stop()
    },
  },
}
</script>

<style scoped>

</style>
