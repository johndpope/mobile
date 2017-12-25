<template lang="html">
    <div>
      <MenuHeader></MenuHeader>

      <div class="container">
        <section>
          <h2>Novos episódios</h2>
          <div class="container__row">
            <ArticleEpisodio
              v-for="(episodio, index) in episodios"
              :item="episodio"
              :index="index"
              :key="episodio.id"></ArticleEpisodio>
          </div>
        </section>
        <section>
          <h2>Novos na AnimesGO</h2>
          <div class="container__row">
            <ArticlePost
              v-for="(post, index) in posts"
              :item="post"
              :index="index"
              :key="post.id"></ArticlePost>
          </div>
        </section>
      </div>

    </div>
</template>

<script>
import MenuHeader from '@/components/MenuHeader.vue'
import ArticlePost from '@/components/ArticlePost.vue'
import ArticleEpisodio from '@/components/ArticleEpisodio.vue'

export default {
  data () {
    return {
      posts: [],
      episodios: []
    }
  },
  components: {
    'MenuHeader': MenuHeader,
    'ArticlePost': ArticlePost,
    'ArticleEpisodio': ArticleEpisodio
  },
  methods: {
    fetchNovosEpisodios: function () {
      this.$http.get(this.$api('episodios/novos')).then(response => {
        this.episodios = response.body
      }, response => {
        // code:
      })
    },
    fetchLista: function () {
      this.$http.get(this.$api('posts/lista')).then(response => {
        this.posts = response.body
      }, response => {
        // code:
      })
    }
  },
  created () {
    this.fetchNovosEpisodios()
    this.fetchLista()
  }
}
</script>

<style lang="scss">
  h2 {
    margin: 20px 0 20px 0;
    text-transform: uppercase;
    color: #DADCDD;
  }

  .container__row {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

</style>
