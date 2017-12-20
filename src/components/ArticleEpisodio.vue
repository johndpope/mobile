<template lang="html">
	<router-link :to="`/watch/${item.parent.slug}/${item.id}`" class="article_post">
		<h4>{{ item.parent.titulo }}</h4>
		<h5>{{ item.titulo }}</h5>
		<span class="article_post__capa">
			<img :src="item.parent.capa" :alt="item.parent.titulo">
		</span>
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
		margin: 0 10px 10px 0;
		color: black;
		height: 190px;
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
		height: 130px;
		margin: 10px 0 0 0;
		overflow: hidden;
		display: block;
	}

	.article_post__capa img {
		width: 100%;
		margin-top: -25%;
	}

	@media (min-width: 768px) {
		.article_post {
			width: calc(25% - 10px);
		}
	}
</style>
