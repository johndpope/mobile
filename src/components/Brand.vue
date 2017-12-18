<template lang="html">
  <h1>
    <i class="fa fa-play-circle"></i>
    <span class="animes">Animes</span>
    <span class="go">GO</span>
  </h1>
</template>

<script>
export default {
  name: 'Brand'
}
</script>

<style lang="scss" scoped>
  h1 {
    font-size: 13px;
    color: white;
    text-transform: uppercase;
    cursor: default;
  }
  h1 span.animes {
    z-index: 0;
  }
  h1 span.go {
    z-index: 1;
    margin-left: -6px;
    letter-spacing: -2px;
    text-shadow: -3px 0 3px $color-azul;
  }
</style>
