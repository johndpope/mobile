<template lang="html">
    <div>
        <div class="container">
          <input type="search" name="search_text" v-model="buscaTexto" @focus="clearInput" @keyup="busca">
          <h2> {{ buscaStatus }}</h2>
          <div class="columns-5">
            <ArticlePost
              v-for="(post, index) in posts"
              :item="post"
              :personalize="index == 0 && posts.length%2 ? true : false"
              :index="index"
              :key="post.id">
            </ArticlePost>
          </div>
        </div>
        <div class="container" v-if="posts.length > 1">
          <InfiniteLoading @infinite="infiniteHandler" ref="infiniteLoading" spinner="spiral">
            <h2 slot="no-more">Isso é tudo :)</h2>
            <h2 slot="no-results">¯\_(ツ)_/¯</h2>
          </InfiniteLoading>
          <ad-banner/>
        </div>
    </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import ArticlePost from '@/components/ArticlePost.vue'
import AdBanner300x100 from '@/components/AdBanner300x100.vue'

export default {
  props: {
    cmd: {
      required: false,
      type: String
    }
  },
  head: {
    title () {
      return {
        inner: this.$route.name,
        separator: '-'
      }
    }
  },
  data () {
    return {
      buscaStatus: 'Aguardando dados...',
      limparInput: true,
      buscaTexto: 'Quer ver o que agora?',
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
      if (this.buscaTexto.length < 3) {
        return false
      }
      this.$http.get(this.$api(`posts/busca/${this.buscaTexto}`)).then(response => {
        this.posts = response.body
        this.buscaStatus = `Mostrando ${this.posts.length}`
      }, response => {
          // code:
      })
    },
    clearInput: function (event) {
      event.target.value = this.limparInput ? '' : event.target.value
      this.limparInput = false
    },
    infiniteHandler: function ($state) {
      setTimeout(() => {
        const temp = []
        const diffLength = (this.postsFull.length - this.posts.length)
        for (let i = this.posts.length + 1; i < this.posts.length + ((diffLength > 20) ? 20 : diffLength); i++) {
          temp.push(this.postsFull[i])
        }
        this.posts = this.posts.concat(temp)
        $state.loaded()
        if (this.posts.length >= this.postsFull.length) {
          $state.complete()
        }
      }, 1000)
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
