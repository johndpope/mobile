<template lang="html">
	<video :poster="poster" :src="src" controls>
	</video>
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
