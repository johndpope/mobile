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

  body > iframe {
    position: fixed;
    top: 0; right: 0;
  }

</style>
