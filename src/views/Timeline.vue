<template lang="html">
    <div>
      <MenuHeader></MenuHeader>

      <div class="container">
        <h2>Novos na AnimesGO</h2>
        <div class="container__row">
          <ArticlePost
            v-for="(post, index) in posts"
            :item="post"
            :index="index"
            :key="post.id"></ArticlePost>
        </div>
      </div>

    </div>
</template>

<script>
import MenuHeader from '@/components/MenuHeader.vue'
import ArticlePost from '@/components/ArticlePost.vue'

export default {
  data () {
    return {
      posts: [],
      episodios: []
    }
  },
  components: {
    'MenuHeader': MenuHeader,
    'ArticlePost': ArticlePost
  },
  created () {
    this.$http.get('http://localhost:3000/posts/lista').then(response => {
      this.posts = response.body
    }, response => {
      // code:
    })
  }
}
</script>

<style lang="scss">
  h2 {
    margin: 20px 0 10px 0;
    text-transform: uppercase;
    color: #DADCDD;
  }

  .container {
    width: calc(100% - 20px);
    max-width: 992px;
    margin: 0 auto;
    padding: 0 10px;
  }

  .container__row {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

</style>
