<template lang="html">
    <div>
        <MenuHeader></MenuHeader>
        <div class="container">
          <h2> {{ buscaStatus }} {{ posts.length }}</h2>
          <div class="container__row">
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
import MenuHeader from '@/components/MenuHeader.vue'
import ArticlePost from '@/components/ArticlePost.vue'
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
  data () {
    return {
      buscaStatus: 'Aguardando dados...',
      posts: [],
      postsFull: []
    }
  },
  components: {
    'MenuHeader': MenuHeader,
    'ArticlePost': ArticlePost,
    'InfiniteLoading': InfiniteLoading
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

  h2 {
    margin: 20px 0 10px 0;
    text-transform: uppercase;
    color: #DADCDD;
  }

  .container {
    width: calc(100% - 10px);
    max-width: 992px;
    margin: 0 auto;
    padding: 0 10px;
  }

  .container__row {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

</style>
