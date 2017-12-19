<template lang="html">
	<div>
    <MenuHeader>
    </MenuHeader>

    <div class="container">
      <Player :src="randomCDN(episodioAtual.url)" :poster="post.imagem"></Player>

      <div class="info-post collapse" @click="toggleInfo" ref="info-post">
        <h1>{{ post.titulo }}</h1>
        <h2>{{ post.generos.split(',').join(', ') }}</h2>
        <p>{{ post.descricao }}</p>
      </div>

      <nav class="lista">
          <router-link class="episodio" v-for="episodio in episodios" :to="{ path: '/watch/' + slug + '/' + episodio.id }" :id="episodio.id" :key="episodio.id">
            <i class="fa fa-play-circle"></i>
            <div class="episodio-info">
              <h4>{{ episodio.titulo }}</h4>
              <h5>{{ episodio.tipo }}</h5>
            </div>
            <i v-if="ep == episodio.id" class="fa fa-flag-o"></i>
          </router-link>
      </nav>
    </div>

	</div>
</template>

<script>
import MenuHeader from '@/components/MenuHeader.vue'
import Player from '@/components/Player.vue'
export default {
  props: {
    slug: {
      required: true,
      type: String
    },
    ep: {
      required: false,
      type: String
    }
  },
  components: {
    'MenuHeader': MenuHeader,
    'Player': Player
  },
  data () {
    return {
      post: {
        generos: '',
        imagem: '//animesgo.net/img/animesgo-image.png'
      },
      episodios: {},
      episodioAtual: {
        url: ''
      }
    }
  },
  methods: {
    fetchEpisodios: function () {
      this.$http.get(this.$api(`episodios/lista/${this.post.id}`)).then(response => {
        this.episodios = response.body
      }, response => {
        // code:
      })
    },
    toggleInfo: function (event) {
      this.$refs['info-post'].classList.toggle('collapse')
    },
    setEpisodioAtual: function () {
      let self = this
      this.episodios.map(function (value, key) {
        if (parseInt(value.id) === parseInt(self.ep)) {
          self.episodioAtual = value
          return false
        }
      })
    },
    randomCDN: function (url) {
      let rand = Math.floor(Math.random() * 2) + 1
      return url.replace(url.substr(url.indexOf('cdn'), 4), `cdn${rand}`).replace('https', 'http')
    }
  },
  watch: {
    '$route': function (value) {
      if (value.name === 'WatchEp') {
        this.setEpisodioAtual()
        document.body.scrollTop = 0 // For Safari
        document.documentElement.scrollTop = 0 // All
      }
    }
  },
  created () {
    // fetchPost
    this.$http.get(this.$api(`posts/view/${this.slug}`)).then(response => {
      this.post = response.body
      this.fetchEpisodios()
      // this.setEpisodioAtual()
    }, response => {
      // code:
    })
  }
}
</script>

<style lang="scss" scoped>

.container {
  margin: 20px auto;
}

.info-post {
  color: $color-white;
  transition: .4s ease-in-out all;
  position: relative;
}

.info-post.collapse {
  height: 70px;
  overflow: hidden;
}

.info-post:before {
  content: '\f106';
  font-family: 'FontAwesome';
  color: white;
  position: absolute;
  font-size: 24px;
  right: 10px;
  top: 10px;
}

.info-post.collapse:before {
  content: '\f107';
}

.info-post h1 {
  font-size: 18px;
}

.info-post h2 {
  color: $color-cinza;
  font-size: 13px;
}

.info-post p {
  font-size: 13px;
  line-height: 1.3;
}

.lista {
  list-style: none;
  display: flex;
  flex-flow: column;
  margin: 20px 0 0 0;
}

.episodio {
  background-color: $color-blue;
  margin: 0 0 5px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  padding: 10px;
}

.episodio.disabled {
  background-color: $color-cinza;
}

.episodio .fa {
  width: 50px;
  font-size: 30px;
  flex-shrink: 0;
}

.episodio-info {
  width: 100%;
}

.episodio-info h4,
.episodio-info h5 {
  margin: 0;
  font-size: 13px;
}

.episodio-info h4 {
  text-transform: uppercase;
  margin-bottom: 5px;
}

</style>
