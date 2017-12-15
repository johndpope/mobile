<template lang="html">
  <nav class="menu__header">
    <router-link to="/" class="menu__header__button">
      <h1>
        <i class="fa fa-play-circle"></i>
        <span class="animes">Animes</span>
        <span class="go">GO</span>
      </h1>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'MenuHeaderBack',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.menu__header {
  background-color: black;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.menu__header slot[name='title'] {
  margin: 0;
  display: inline-block;
  font-size: 1vh;
  color: white;
  text-transform: uppercase;
  cursor: default;
}
.menu__header__button {
  // width: 20%;
  border: none;
  background-color: transparent;
  color: white;
  line-height: 1;
  padding: 15px 0 ;
  text-align: center;
  text-transform: uppercase;
  transition: .1s ease-in-out all;
}
.menu__header__button:hover,
.menu__header__button:focus,
.menu__header__button:active,
.menu__header__button.active {
  color: $color-azul-light;
}
</style>
