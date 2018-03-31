<template lang="html">
    <div>
      <div class="container">
        <section>
          <h2>Novos episódios</h2>
          <div class="columns-4">
            <ArticleEpisodio
              v-for="(episodio, index) in episodios"
              :item="episodio"
              :index="index"
              :key="episodio.id"></ArticleEpisodio>
          </div>
          <ad-banner/>
        </section>
        <section>
          <h2>Novos na AnimesGO</h2>
          <div class="columns-4">
            <ArticlePost
              v-for="(post, index) in posts"
              :item="post"
              :index="index"
              :key="post.id"></ArticlePost>
          </div>
          <ad-banner/>
        </section>
      </div>

    </div>
</template>

<script>
import ArticlePost from '@/components/ArticlePost.vue'
import ArticleEpisodio from '@/components/ArticleEpisodio.vue'
import AdBanner300x100 from '@/components/AdBanner300x100.vue'

export default {
  data () {
    return {
      posts: [],
      episodios: []
    }
  },
  components: {
    'ArticlePost': ArticlePost,
    'ArticleEpisodio': ArticleEpisodio,
    'ad-banner': AdBanner300x100
  },
  methods: {
    fetchNovosEpisodios: function () {
      this.$http.get('episodios/novos').then(response => {
        this.episodios = response.body
      }, response => {
        // code:
      })
    },
    fetchLista: function () {
      this.$http.get('posts/novos').then(response => {
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

<style lang="scss" scoped>
  h2 {
    position: sticky;
    top: 30px;
    background-color: $color-bg-body;
    z-index: 1;
    margin: 0 auto 20px auto;
    padding: 20px 0 5px 10px;
    border-bottom: 1px solid white;
    text-transform: uppercase;
    color: #DADCDD;
  }

  body > iframe {
    position: fixed;
    top: 0; right: 0;
  }

</style>
