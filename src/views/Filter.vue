<template lang="html">
    <div>
        <div class="container">
          <h2>{{ chave }}: {{ valor }}</h2>
          <h3> {{ buscaStatus }} {{ posts.length }}</h3>

          <ad-banner/>

          <div class="columns-5">
            <ArticlePost
              v-for="(post, index) in posts"
              :item="post"
              :index="index"
              :key="post.id">
            </ArticlePost>
          </div>
        </div>
        <div class="container">
          <InfiniteLoading @infinite="infiniteHandler" ref="infiniteLoading" spinner="spiral">
            <h2 slot="no-more">Isso é tudo :)</h2>
            <h2 slot="no-results">¯\_(ツ)_/¯</h2>
          </InfiniteLoading>
        </div>
    </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import ArticlePost from '@/components/ArticlePost.vue'
import AdBanner300x100 from '@/components/AdBanner300x100.vue'

export default {
  props: {
    chave: {
      required: true,
      type: String
    },
    valor: {
      required: true,
      type: String
    }
  },
  head: {
    title () {
      return {
        inner: this.$router.name
      }
    }
  },
  data () {
    return {
      buscaStatus: 'Aguardando dados...',
      posts: [],
      postsFull: []
    }
  },
  components: {
    'ArticlePost': ArticlePost,
    'InfiniteLoading': InfiniteLoading,
    'ad-banner': AdBanner300x100
  },
  methods: {
    busca: function () {
      this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      })
      this.$http.get(this.$api(`posts/filter/${this.chave}/${this.valor}/0`)).then(response => {
        if (response.body.length) {
          this.posts = response.body
          this.buscaStatus = `Mostrando`
        }
      }, response => {
          // code:
      })
    },
    infiniteHandler: function ($state) {
      setTimeout(() => {
        const page = this.posts.length / 10
        this.$http.get(this.$api(`posts/filter/${this.chave}/${this.valor}/${page}`)).then(response => {
          if (response.body.length) {
            this.posts = this.posts.concat(response.body)
            $state.loaded()
          } else {
            $state.complete()
          }
        }, response => {
          $state.complete()
        })
      }, 1000)
    }
  },
  created () {
    this.busca()
  },
  watch: {
    chave: function () {
      this.busca()
      this.buscaTexto = ''
    },
    valor: function () {
      this.busca()
      this.buscaTexto = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  input {
    margin: 20px 0;
    width: 100%;
    background-color: rgba(240, 240, 240, 1);
    border: none;
    color: #3E3E3E;
    padding: 13px 30px;
    border-radius: 4px;
  }

  h3 {
    margin-bottom: 15px;
  }
</style>
