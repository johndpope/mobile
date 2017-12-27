<template lang="html">
	<div>
    <div class="overlay">

    </div>
		<nav class="items">
      <router-link :to="{ name: '', params: {} }">
        Animes
      </router-link>
      <router-link :to="{ name: '', params: {} }">
        Cartoon
      </router-link>
      <router-link :to="{ name: '', params: {} }">
        Filmes
      </router-link>
      <hr/>
      <router-link :to="{ name: '', params: {} }">
        Contato
      </router-link>
      <router-link :to="{ name: '', params: {} }">
        Login
      </router-link>
      <router-link :to="{ name: '', params: {} }">
        Doações
      </router-link>
    </nav>
	</div>
</template>

<script>
export default {
  name: 'MenuCollapse'
}
</script>

<style lang="scss" scoped>
.overlay {

}

.items {
  position: fixed;
  right: 0;
  top: 40px;
  bottom: 0;
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  background-color: black;
  padding: 20px 20px;
  width: calc(100% - 120px);
}

.items a {
  color: $color-white;
  font-size: 16px;
  line-height: 2;
}
</style>
