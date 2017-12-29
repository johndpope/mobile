<template lang="html">
  <div>
    <nav class="menu__header">
      <a href="#" @click.prevent="toggleMenuCollapse()" class="menu__header__button">
        <i class="fa fa-bars"></i>
      </a>
      <Brand></Brand>
      <router-link to="/search" class="menu__header__button">
        <i class="fa fa-search"></i>
      </router-link>
    </nav>
    <transition name="slide-left" mode="in-out">
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
  methods: {
    toggleMenuCollapse: function () {
      this.showMenuCollapse = !this.showMenuCollapse
      document.body.style.overflow = this.showMenuCollapse ? 'hidden' : 'auto'
    }
  },
  components: {
    'Brand': Brand,
    'MenuCollapse': MenuCollapse
  },
  watch: {
    '$route': function (from, to) {
      this.toggleMenuCollapse()
    }
  },
  beforeDestroy: function () {
    this.showMenuCollapse = false
    document.body.style.overflow = 'auto'
  }
}
</script>

<style lang="scss" scoped>
.menu__header {
  padding: 0 10px;
  background-color: black;
  display: flex;
  justify-content: space-between;
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
