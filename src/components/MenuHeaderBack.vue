<template lang="html">
  <nav class="menu__header">
    <h1 @click="goback">
      <i class="fa fa-angle-left"></i>
      <slot name="title"></slot>
    </h1>
    <button type="submit" name="submit" class="menu__header__button">
      <i class="fa fa-check"></i>
    </button>
  </nav>
</template>

<script>
export default {
  name: 'MenuHeaderBack',
  methods: {
    goback: function () {
      window.history.back(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.menu__header {
  background-color: black;
  display: flex;
  padding: 0 10px;
  justify-content: space-between;
  align-items: center;
}

h1 {
  font-size: 13px;
  color: white;
  text-transform: uppercase;
  cursor: default;
}

.menu__header__button {
  font-size: 2vh;
  border: none;
  padding: 15px 0;
  background-color: transparent;
  color: white;
  line-height: 1;
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
