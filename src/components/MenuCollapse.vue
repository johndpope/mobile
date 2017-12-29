<template lang="html">
	<div>
    <div class="overlay"></div>
		<nav class="items">
      <router-link :to="{ name: 'Timeline' }">
        <i class="fa fa-home"></i> Início
      </router-link>
      <router-link :to="{ name: 'Filter', params: {chave: 'categoria', valor: 'animes'} }">
        <i class="fa fa-list"></i> Animes
      </router-link>
      <router-link :to="{ name: 'Filter', params: {chave: 'categoria', valor: 'desenhos'} }">
        <i class="fa fa-film"></i> Cartoon
      </router-link>
      <router-link :to="{ name: 'Filter', params: {chave: 'categoria', valor: 'filmes'} }">
        <i class="fa fa-ticket"></i> Filmes
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
  position: fixed;
  top: 40px; right: 0; bottom: 0; left: 0;
  background-color: rgba(0,0,13,.7);
  z-index: 999;
}
.items {
  position: fixed;
  left: 0;
  top: 40px;
  bottom: 0;
  display: flex;
  flex-flow: column;
  background-color: black;
  padding: 20px 30px;
  width: calc(100% - 120px);
	z-index: 1000;
  @include box-shadow(0 0 20px rgba(0,0,0,.6));
}

.items a {
  color: $color-white;
  font-size: 3vh;
  display: block;
  line-height: 3;
  padding: 0 20px 0 0;
  @include transition;
}

.items a + a {
  border-top: 1px solid rgba(255,255,255,.1);
}

.items a .fa {
  margin-right: 10px;
}

.items a:hover {
  color: $color-azul;
}
</style>
