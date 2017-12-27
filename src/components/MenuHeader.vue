<template lang="html">
  <div>
    <nav class="menu__header">
      <Brand></Brand>
      <router-link to="/" class="menu__header__button">
        <i class="fa fa-home"></i>
      </router-link>
      <router-link to="/search" class="menu__header__button">
        <i class="fa fa-search"></i>
      </router-link>
      <a href="#" @click.prevent="showMenuCollapse = !showMenuCollapse" class="menu__header__button">
        <i class="fa fa-bars"></i>
      </a>
    </nav>
    <transition name="slide-right" mode="in-out">
      <MenuCollapse v-if="showMenuCollapse"></MenuCollapse>
    </transition>
  </div>
</template>

<script>
import Brand from '@/components/Brand.vue'
import MenuCollapse from '@/components/MenuCollapse.vue'
export default {
  name: 'MenuHeader',
  data () {
    return {
      showMenuCollapse: false
    }
  },
  components: {
    'Brand': Brand,
    'MenuCollapse': MenuCollapse
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
.menu__header__button {
  width: 20%;
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
