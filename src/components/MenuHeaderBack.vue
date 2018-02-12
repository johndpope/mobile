<template lang="html">
  <nav class="menu__header">
    <h1 @click="goback">
      <i class="fa fa-angle-left"></i>
      <slot name="title"></slot>
    </h1>
    <button type="submit" name="submit" class="btn success">
      <slot name="acao"></slot>
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
  background-color: #242424;
  display: flex;
  padding:  10px;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0; left: 0; right: 0;
}

h1 {
  font-size: 13px;
  color: white;
  text-transform: uppercase;
  cursor: pointer;
}

.menu__header__button {
  font-size: 13px;
  border: none;
  padding: 10px;
  background-color: $color-blue;
  color: white;
  line-height: 1;
  text-align: center;
  text-transform: uppercase;
}
.menu__header__button:hover,
.menu__header__button:focus,
.menu__header__button:active,
.menu__header__button.active {
  background-color: black;
}
</style>
