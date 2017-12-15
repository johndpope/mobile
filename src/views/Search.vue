<template lang="html">
    <div>
        <MenuHeader></MenuHeader>
        <div class="container">
          <input type="search" name="search_text" value="Quer ver o que agora?" @focus="clearInput" @keyup="busca">
          <h2> {{ buscaStatus }}</h2>
          <div class="container__row">
            <ArticlePost
              v-for="(post, index) in posts"
              :item="post"
              :personalize="index == 0 && posts.length%2 ? true : false"
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
      buscaStatus: 'Aguardando dados...',
      limparInput: true,
      posts: []
    }
  },
  components: {
    'MenuHeader': MenuHeader,
    'ArticlePost': ArticlePost
  },
  methods: {
    busca: function (event) {
      if (event.target.value.length < 3) {
        return false
      }

      this.$http.get(`http://api.animeai.online/posts/busca/${event.target.value}`).then(response => {
        this.posts = response.body
        this.buscaStatus = `Mostrando ${this.posts.length}`
      }, response => {
          // code:
      })
    },
    clearInput: function (event) {
      event.target.value = this.limparInput ? '' : event.target.value
      this.limparInput = false
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
