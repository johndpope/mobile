<template lang="html">
	<div>
    <MenuHeader>
    </MenuHeader>

    <div class="container">
      <Player :src="episodioAtual.url" :poster="post.imagem"></Player>

      <div class="info-post" :class="{'expanded': exibirInfoPost }" @click="exibirInfoPost = !exibirInfoPost">
        <h1>{{ post.titulo }}</h1>
        <h2 v-if="episodioAtual.url !== ''">
          <i class="fa fa-fw fa-play"></i> {{ episodioAtual.titulo }} - {{ episodioAtual.idioma }}
        </h2>
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
          <div v-if="exibirInfoPost">
            <p>{{ post.descricao }}</p>
            <p class="info-post--generos">
              <span class="info-post--generos--genero" v-for="genero in post.generos.split(',')">
                {{ genero }}
              </span>
            </p>
          </div>
        </transition>
      </div>

      <div class="seletor-temporada">
        <button class="seletor-temporada-atual" @click="exibirListaTemporadas = !exibirListaTemporadas">
          <i class="fa fa-angle-right"></i>
          {{ temporadaSelecionada }}
        </button>
        <transition name="push">
          <ul class="lista-temporadas" v-if="exibirListaTemporadas && temporadas.length > 1">
            <li class="lista-temporadas-temporada" v-for="temporada in temporadas" @click="definirTemporada(temporada)">
              {{ temporada }}
            </li>
          </ul>
        </transition>
      </div>

      <div class="row-buttons">
        <button v-for="idioma in idiomas" @click="idiomaSelecionado = idioma" :class="{ 'active': idioma == idiomaSelecionado }" class="btn default">
          {{ idioma }}
        </button>
      </div>

      <nav class="lista">
          <router-link :class="{ 'active': ep == episodio.id }" class="episodio" v-for="episodio in episodiosFiltrado" v-if="episodio.idioma == idiomaSelecionado" :to="{ path: `/watch/${slug}/${episodio.id}` }" :id="episodio.id" :key="episodio.id">
            <i class="fa fa-play-circle"></i>
            <div class="episodio-info">
              <h4>{{ episodio.titulo }}</h4>
            </div>
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
      exibirInfoPost: false,
      exibirListaTemporadas: false,
      temporadaSelecionada: '',
      temporadas: [],
      episodios: {},
      episodiosFiltrado: {},
      idiomas: [],
      idiomaSelecionado: '',
      episodioAtual: {
        url: ''
      }
    }
  },
  computed: {
    // code
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
      this.$http.get(this.$api(`episodios/lista/${this.post.id}`)).then(response => {
        this.episodios = response.body

        // [for-update] configurações do usuário
        this.setEpisodioAtual()
        this.idiomaSelecionado = (this.idiomaSelecionado === '') ? this.episodios[0].idioma : this.idiomaSelecionado
        this.definirTemporada((this.temporadaSelecionada === '') ? this.episodios[0].tipo : this.temporadaSelecionada)
      }, response => {
        // code:
      })
    },
    fetchPost: function () {
      this.$http.get(this.$api(`posts/view/${this.slug}`)).then(response => {
        this.post = response.body
        this.fetchEpisodios()
      }, response => {
        // code:
      })
    },
    setEpisodioAtual: function () {
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
        if (self.ep === '' || parseInt(episodio.id) === parseInt(self.ep)) {
          self.episodioAtual = episodio
          self.episodioAtual.url = self.randomCDN(self.episodioAtual.url)
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
    this.fetchPost()
  }
}
</script>

<style lang="scss" scoped>

.seletor-temporada {
  position: relative;
  width: 100%;
}

.seletor-temporada-atual {
  @include button;
}

.lista-temporadas {
  position: absolute;
  top: 10px;
  width: 123px;
  list-style: none;
  padding: 0;
  background-color: $color-white;
  @include box-shadow();
}

.lista-temporadas-temporada {
  padding: 10px 5px;
  color: black;
  font-size: 12px;
  cursor: pointer;
}

.lista-temporadas-temporada:hover {
  opacity: .4;
}

.lista-temporadas-temporada + .lista-temporadas-temporada {
  border-top: 1px solid rgba(100,100,255,.1);
}

.row-buttons {
  margin-top: 10px;
}

.row-buttons .btn {
  text-transform: capitalize;
}

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
}

.lista {
  list-style: none;
  display: flex;
  flex-flow: column;
  margin: 20px 0 0 0;
}

.episodio {
  @include display-flex(center);
  background-color: rgba(255,255,255,.1);
  margin: 0 0 5px 0;
  color: $color-white;
  padding: 10px;
}

.episodio:hover {
  color: white;
}

.episodio.active {
  background-color: rgba(0,150,250,.2);
}

.episodio.disabled {
  opacity: .5;
}

.episodio .fa {
  width: 50px;
  font-size: 30px;
  flex-shrink: 0;
}

.episodio-info {
  width: 100%;
}

.episodio-info h4 {
  margin: 0;
  font-size: 13px;
  text-transform: uppercase;
}

</style>
