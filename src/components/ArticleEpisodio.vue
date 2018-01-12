<template lang="html">
	<router-link :to="`/watch/${item.parent.slug}/${item.id}`" class="article_post">
		<span class="article_post__capa">
			<img :src="capa" :alt="item.titulo">
		</span>
		<h4>{{ item.titulo }}</h4>
		<h5>{{ item.parent.titulo }}</h5>
	</router-link>
</template>

<script>
export default {
  name: 'ArticlePost',
  props: ['item'],
  computed: {
    capa: function () {
      const arr = this.item.parent.capa.split('/')
      const filename = arr[5].split('.')[0]
      return `${arr[0]}//${arr[2]}/${arr[3]}/${arr[4]}/compress/${filename}.jpg`
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
	}

	.article_post__capa img {
		width: 100%;
	}
</style>
