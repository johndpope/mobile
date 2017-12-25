<template lang="html">
	<div class="container-player">
    <video :poster="poster" :src="src" controls preload="metadata">
  	</video>
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
  }
}
</script>

<style lang="scss" scoped>
video {
  width: 100%;
  height: auto;
}
</style>
