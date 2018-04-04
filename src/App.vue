<template>
  <div id="app">
    <MenuHeader></MenuHeader>
    <transition name="transition-router-app" mode="in-out">
      <router-view/>
    </transition>
    <flash-message></flash-message>
  </div>
</template>

<script>
import MenuHeader from '@/components/MenuHeader.vue'
import FlashMessage from '@/components/FlashMessage.vue'
export default {
  name: 'app',
  components: {
    'MenuHeader': MenuHeader,
    'FlashMessage': FlashMessage
  }
}
</script>

<style lang="scss">
</style>
