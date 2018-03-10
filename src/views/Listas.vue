<template lang="html">
    <div>
      <div class="container">

        <ul>
          <li v-for="(lista, index) in listas">
            <button @click="setLista(index)">
              {{ lista.nome }}
            </button>
          </li>
        </ul>

        <h2>{{ listaAtual.nome }}: {{ posts.length }}</h2>

        <div class="columns-5">
          <FakeList v-if="posts.length <= 0"></FakeList>
          <ArticlePost
            v-for="(post, index) in posts"
            :item="post"
            :index="index"
            :key="post.id">
          </ArticlePost>
        </div>
      </div>
    </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import ArticlePost from '@/components/ArticlePost.vue'
import FakeList from '@/components/FakeList.vue'
import AdBanner300x100 from '@/components/AdBanner300x100.vue'

export default {
  head: {
    title () {
      return {
        inner: this.$route.name
      }
    }
  },
  data () {
    return {
      posts: [],
      listaAtual: '',
      listas: { nome: 'Seguindo', posts: '1;2;3;4' }
    }
  },
  computed: {
    user: function () {
      return this.$ls.get('user', false)
    }
  },
  components: {
    'ArticlePost': ArticlePost,
    'InfiniteLoading': InfiniteLoading,
    'ad-banner': AdBanner300x100,
    'FakeList': FakeList
  },
  methods: {
    busca: function () {
      this.$http.get(this.$api(`posts/lista/${this.listaAtual.posts}`)).then(response => {
        if (response.body.length) {
          this.posts = response.body
          this.buscaStatus = `Mostrando`
        }
      }, response => {
          // code:
      })
    },
    setLista: function (index) {
      this.listaAtual = this.listas[index]
      this.busca()
    }
  },
  created () {
    this.listas = [
      {
        nome: 'Favoritos',
        posts: this.user.favoritos
      },
      {
        nome: 'Seguindo',
        posts: this.user.seguindo
      }
    ]
    this.listaAtual = this.listas[0]
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
