<template lang="html">
	<div class="container-player">
    <video :poster="poster" controls preload="metadata" :src="src" id="video">
  	</video>
    <!-- <video :poster="poster" controls preload="metadata" :class="classVideo" id="video" data-setup="{}">
      <source :src="src" type="video/mp4">
  	</video> -->
  </div>
</template>

<script>
export default {
  name: 'Player',
  props: {
    src: {
      required: true,
      type: String
    },
    poster: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      classVideo: 'video-js vjs-default-skin vjs-big-play-centered vjs-16-3 video-dimensions vjs-fluid'
    }
  }
}
</script>

<style lang="scss" scoped>
video {
  width: 100%;
  height: auto;
}
</style>
