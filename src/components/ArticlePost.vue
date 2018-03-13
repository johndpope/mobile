<template lang="html">
	<router-link :to="`/watch/${item.slug}`" class="article_post" :class="{ 'full': personalize }">
		<span class="article_post__capa">
			<img @load="onLoadCapa()" class="animated" :src="makeImageUrl('post.capa', item.capa)" :alt="item.titulo">
		</span>
		<h4 class="article_post__titulo">{{ item.titulo }}</h4>
		<h5 class="article_post__ano">{{ item.ano }}</h5>
	</router-link>
</template>

<script>
export default {
  name: 'ArticlePost',
  props: ['item', 'personalize'],
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
		height: 200px;
		overflow: hidden;
	}

	.article_post:hover * {
		color: white;
	}

	.article_post__titulo,
	.article_post__ano {
		transition: .2s ease-in-out all;
		margin: 0;
		color: #8C989F;
	}

	.article_post__titulo {}
	.article_post__ano { }

	.article_post__capa {
		width: 100%;
		min-width: 120px;
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
		margin-top: -25%;
	}

</style>
