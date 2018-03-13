<template lang="html">
  <span>
    <router-link :to="`/watch/${item.parent.slug}/${item.id}`" class="article_post">
      <span class="article_post__capa">
        <img @load="onLoadCapa()" class="animated" :src="makeImageUrl('post.capa', item.parent.capa)" :alt="item.titulo">
      </span>
      <h4>{{ item.titulo }}</h4>
      <h5>{{ item.parent.titulo }}</h5>
    </router-link>
  </span>
</template>

<script>
export default {
  name: 'ArticlePost',
  props: ['item'],
  methods: {
    onLoadCapa: function () {
      event.path[0].classList.add('fadeIn')
    }
  }
}
</script>

<style lang="scss" scoped>
	.article_post {
		color: black;
    min-width: 100px;
		height: 200px;
		overflow: hidden;
	}
	.article_post:hover * {
		color: white;
	}

	h4,
	h5 {
		transition: .2s ease-in-out all;
		margin: 0;
		color: #8C989F;
	}

	.article_post__capa {
		width: 100%;
		height: 120px;
		margin: 0 0 10px 0;
		overflow: hidden;
		display: block;
		background-image: url('~/static/img/animesgo-image.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
	}

	.article_post__capa img {
		opacity: 0;
		width: 100%;
	}
</style>
