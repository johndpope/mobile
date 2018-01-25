<template lang="html">
  <div id="MenuHeader">
    <nav class="menu__header">
      <a href="#" @click.prevent="showMenuCollapse = !showMenuCollapse" class="menu__header__button">
        <i class="fa" :class="{ 'fa-times': showMenuCollapse, 'fa-bars': !showMenuCollapse }"></i>
      </a>
      <Brand></Brand>
      <router-link :to="{name: 'Busca'}" class="menu__header__button">
        <i class="fa fa-search"></i>
      </router-link>
    </nav>
    <transition name="menu-sidebar" mode="in-out">
      <MenuCollapse @closeMenuCollapse="closeMenuCollapse()" v-if="showMenuCollapse"></MenuCollapse>
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
    closeMenuCollapse: function () {
      this.showMenuCollapse = false
    }
  },
  components: {
    'Brand': Brand,
    'MenuCollapse': MenuCollapse
  },
  watch: {
    '$route': function (from, to) {
      this.closeMenuCollapse()
    },
    showMenuCollapse: function () {
      if (this.showMenuCollapse === true) {
        this.$root.$el.style.overflow = 'hidden'
      } else {
        this.$root.$el.style.overflow = 'auto'
      }
    }
  },
  beforeDestroy: function () {
    this.closeMenuCollapse()
  }
}
</script>

<style lang="scss" scoped>
#MenuHeader {
  z-index: 3000;
  position: fixed;
  top: 0; right: 0; left: 0;
}
.menu__header {
  padding: 0 10px;
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 12px rgba(0, 0, 0, 1);
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
