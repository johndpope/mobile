<template lang="html">
	<div>

    <div class="container">
      <Player :src="episodioAtual.url" :poster="post.imagem"></Player>

      <div class="info-post" :class="{'expanded': exibirInfoPost }" @click="exibirInfoPost = !exibirInfoPost">
        <h1>{{ post.titulo }}</h1>
        <h2 v-if="episodioAtual.url !== ''">
          <i class="fa fa-fw fa-play"></i> {{ episodioAtual.titulo }} - {{ episodioAtual.idioma }}
        </h2>
        <transition name="fade" mode="out-in">
          <div v-if="exibirInfoPost">
            <p>{{ post.descricao }}</p>
            <ad-banner/>
            <p class="info-post--generos">
              <router-link :to="{ name: 'Filtro', params: { chave: 'genero', valor: genero } }" :key="genero.id" class="info-post--generos--genero" v-for="genero in post.generos.split(',')">
                {{ genero }}
              </router-link>
            </p>
          </div>
        </transition>
      </div>

      <div v-if="temporadas.length" class="seletor-temporada">
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

      <div v-if="idiomas.length" class="row-buttons">
        <button v-for="idioma in idiomas" @click="idiomaSelecionado = idioma" :class="{ 'active': idioma == idiomaSelecionado }" class="btn default">
          {{ idioma }}
        </button>
      </div>

      <nav v-if="episodios.length" class="lista">
        <router-link :class="{ 'active': ep == episodio.id }" class="episodio" v-for="episodio in episodiosFiltrado" :to="{ path: `/watch/${slug}/${episodio.id}` }" :id="episodio.id" :key="episodio.id">
          <i class="fa fa-play-circle"></i>
          <div class="episodio-info">
            <h4>{{ episodio.titulo }}</h4>
          </div>
        </router-link>
      </nav>

      <ad-banner/>

      <h2 v-if="episodios.length == 0">Nada ainda :(</h2>

    </div>

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
  data () {
    return {
      post: {
        titulo: '',
        generos: '',
        imagem: '//animesgo.net/img/animesgo-image.png'
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

        if (this.episodios.length) {
          this.setEpisodioAtual()
        }
      }, response => {
        // code:
      })
    },
    fetchPost: function () {
      this.$http.get(this.$api(`posts/view/${this.slug}`)).then(response => {
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
      }
    }
  },
  mounted () {
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
  text-decoration: none;
  color: white;
}

.info-post--generos--genero:hover {
  background-color: rgba(0,0,85,1);
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
