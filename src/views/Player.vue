<template lang="html">
	<div>
		<video src="videofile.ogg" autoplay poster="posterimage.jpg"></video>
    <div class="video_controls">
      <icon class="playpause"></icon>
      <ListraReproducao></ListraReproducao>
    </div>
	</div>
</template>

<script>
export default {
  props: ['slug'],
  data () {
    return {}
  }
}
</script>

<style lang="scss">
</style>
