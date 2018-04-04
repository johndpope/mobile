<template lang="html">
	<div>

    <div class="grid-default">
      <div class="container-player">
        <div class="bar">
          <router-link v-if="episodioAtual.prevEp" prev-episode class="btn success" :to="{ path: `/watch/${slug}/${episodioAtual.prevEp.id}` }">
            <i class="fa fa-step-backward"></i>
          </router-link>
          <router-link v-if="episodioAtual.nextEp" next-episode class="btn success" :to="{ path: `/watch/${slug}/${episodioAtual.nextEp.id}` }">
            <i class="fa fa-step-forward"></i>
          </router-link>
          <div v-if="episodios.length">
            <button @click="exibirListaEpisodios = !exibirListaEpisodios" class="btn success">
              <i class="fa fa-list-ol"></i>
            </button>
            <transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft">
              <nav v-if="exibirListaEpisodios" class="lista">
                <router-link :class="{ 'active': ep == episodio.id }" class="lista--item" v-for="episodio in episodiosFiltrado" :to="{ path: `/watch/${slug}/${episodio.id}` }" :id="episodio.id" :key="episodio.id">
                  <div class="lista--item--info">
                    <h4>{{ episodio.titulo }}</h4>
                  </div>
                </router-link>
              </nav>
            </transition>
          </div>
          <div v-if="temporadas.length">
            <button class="btn success" @click="exibirListaTemporadas = !exibirListaTemporadas">
              <i class="fa fa-angle-right"></i>
              Temporada
            </button>
            <transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft">
              <div class="lista" v-if="exibirListaTemporadas">
                <div class="lista--item" v-for="temporada in temporadas" @click="definirTemporada(temporada)">
                  <div class="lista--item--info">
                    <h4>{{ temporada }}</h4>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <div v-if="idiomas.length">
            <button class="btn success" @click="exibirListaIdiomas = !exibirListaIdiomas">
              <i class="fa fa-language"></i>
              Idioma
            </button>
            <transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft">
              <div class="lista" v-if="exibirListaIdiomas">
                <div v-for="idioma in idiomas" @click="idiomaSelecionado = idioma" class="lista--item">
                  <div class="lista--item--info">
                    <h4>{{ idioma }}</h4>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <Player ref="componentPlayer" :src="episodioAtual.url" :poster="post.imagem"></Player>
        <div class="info-post" :class="{'expanded': exibirInfoPost }" @click="exibirInfoPost = !exibirInfoPost">
          <h1>{{ post.titulo }}</h1>
          <h2 v-if="episodioAtual.url !== ''">
            <i class="fa fa-fw fa-play"></i> {{ episodioAtual.titulo }} - {{ episodioAtual.idioma }}
          </h2>
          <transition name="fade" mode="out-in">
            <div v-if="exibirInfoPost">
              <p>{{ post.descricao }}</p>
              <p class="info-post--generos">
                <router-link :to="{ name: 'Filtro', params: { chave: 'genero', valor: genero } }" :key="genero.id" class="info-post--generos--genero" v-for="genero in post.generos.split(',')">
                  {{ genero }}
                </router-link>
              </p>
            </div>
          </transition>
        </div>
      </div><!-- col-left -->

      <div>
        <ad-banner/>
      </div>

    </div><!-- .grid-default -->

	</div>
</template>

<script>
import Player from '@/components/Player.vue'
import AdBanner300x100 from '@/components/AdBanner300x100.vue'

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
    'Player': Player,
    'ad-banner': AdBanner300x100
  },
  head: {
    title () {
      return {
        inner: this.$route.name
      }
    }
  },
  data () {
    return {
      exibirListaIdiomas: false,
      exibirListaEpisodios: false,
      titlePage: '',
      post: {
        titulo: '',
        generos: '',
        imagem: '//animesgo.info/img/animesgo-image.png'
      },
      exibirInfoPost: false,
      exibirListaTemporadas: false,
      temporadaSelecionada: '',
      temporadas: [],
      episodios: [],
      episodiosFiltrado: [],
      idiomas: [],
      idiomaSelecionado: '',
      episodioAtual: {
        url: '',
        prevEp: false,
        nextEp: false
      }
    }
  },
  methods: {
    definirTemporada: function (temporada) {
      this.exibirListaTemporadas = false
      this.temporadaSelecionada = temporada
      this.episodiosFiltrado = this.episodios.filter(function (episodio) {
        return episodio.tipo.match(temporada)
      })
    },
    fetchEpisodios: function () {
      this.$http.get(`episodios/lista/${this.post.id}`).then(response => {
        this.episodios = response.body

        if (this.episodios.length) {
          this.setEpisodioAtual()
        }
      }, response => {
        // code:
      })
    },
    fetchPost: function () {
      this.$http.get(`posts/view/${this.slug}`).then(response => {
        this.post = response.body
        this.post.imagem = (this.post.imagem === 'https://www.animesgo.net/upload/image/') ? '//animesgo.net/img/animesgo-image.png' : this.post.imagem
        this.fetchEpisodios()
      }, response => {
        // code:
      })
    },
    setEpisodioAtual: function () {
      // [for-update] configurações do usuário
      let self = this
      this.episodios.map(function (episodio, key) {
        // get temporadas
        if (self.temporadas.indexOf(episodio.tipo) === -1) {
          self.temporadas.push(episodio.tipo)
        }
        // get idiomas
        if (self.idiomas.indexOf(episodio.idioma) === -1) {
          self.idiomas.push(episodio.idioma)
        }
        // set currentEpisodio
        if ((typeof self.ep === 'undefined' && key === 0) || (parseInt(episodio.id) === parseInt(self.ep))) {
          self.episodioAtual = episodio
          self.episodioAtual.url = self.randomCDN(self.episodioAtual.url)
          self.idiomaSelecionado = self.episodioAtual.idioma
          self.definirTemporada(self.episodioAtual.tipo)

          // HACK: Armazena o anterior e próximo episódio
          self.episodioAtual.prevEp = (typeof self.episodios[key - 1] !== 'undefined') ? self.episodios[key - 1] : false
          self.episodioAtual.nextEp = (typeof self.episodios[key + 1] !== 'undefined') ? self.episodios[key + 1] : false
        }
      })
    },
    randomCDN: function (url) {
      let rand = Math.floor(Math.random() * 2) + 1
      return url.replace(url.substr(url.indexOf('cdn'), 4), `cdn${rand}`).replace('https:', window.location.protocol)
    }
  },
  watch: {
    '$route': function (value) {
      if (value.name === 'WatchEp') {
        this.setEpisodioAtual()
        $('video')[0].pause()
        $('video').eq(0).attr('src', this.episodioAtual.url)
        $('video')[0].play()
      }
    },
    exibirListaIdiomas (n, o) {
      if (n) {
        this.exibirListaTemporadas = false
        this.exibirListaEpisodios = false
      }
    },
    exibirListaTemporadas (n, o) {
      if (n) {
        this.exibirListaIdiomas = false
        this.exibirListaEpisodios = false
      }
    },
    exibirListaEpisodios (n, o) {
      if (n) {
        this.exibirListaIdiomas = false
        this.exibirListaTemporadas = false
      }
    }
  },
  mounted () {
    this.fetchPost()
  }
}
</script>

<style lang="scss" scoped>

.container {
  margin: 10px auto;
}

.info-post {
  color: $color-white;
  transition: .4s ease-in-out all;
  position: relative;
  padding: 5px 0;
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(255,255,255,.1);
}

.info-post:before {
  content: '\f107';
  font-family: 'FontAwesome';
  color: white;
  position: absolute;
  font-size: 24px;
  right: 10px;
  top: 10px;
  transition: .5s ease-in-out all .1s;
}

.info-post.expanded {
  // code
}

.info-post.expanded:before {
  transform: translateY(8px) rotateZ(180deg);
}

.info-post h1 {
  font-size: 18px;
  width: calc(100% - 30px);
}

.info-post h2 {
  width: calc(100% - 30px);
  color: $color-cinza;
  font-size: 13px;
}

.info-post p {
  width: calc(100% - 20px);
  font-size: 13px;
  line-height: 1.3;
  color: $color-white;
}

.info-post--generos--genero {
  @include button;
  background-color: rgba(255,255,255,.1);
  display: inline-block;
  margin: 0 5px 5px 0;
  text-decoration: none;
  color: white;
  @include transition;
}

.info-post--generos--genero:hover {
  background-color: rgba(255,255,255,.5)
}

.container-player {
  position: relative;
  overflow: hidden;
}

</style>
