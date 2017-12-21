<template lang="html">
	<router-link :to="`/watch/${item.parent.slug}/${item.id}`" class="article_post">
		<span class="article_post__capa">
			<img :src="item.parent.capa" :alt="item.titulo">
		</span>
		<h4>{{ item.titulo }}</h4>
		<h5>{{ item.parent.titulo }}</h5>
	</router-link>
</template>

<script>
export default {
  name: 'ArticlePost',
  props: ['item']
}
</script>

<style lang="scss" scoped>
	.article_post {
		width: calc(50% - 10px);
		margin: 0 10px 40px 0;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
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
		height: 170px;
		margin: 0 0 10px 0;
		overflow: hidden;
		display: block;
	}

	.article_post__capa img {
		width: 100%;
	}

	@media (min-width: 768px) {
		.article_post {
			width: calc(25% - 10px);
			margin: 0 10px 40px 0;
		}
	}
</style>
