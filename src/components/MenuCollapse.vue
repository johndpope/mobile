<template lang="html">
	<div>
    <div class="overlay"></div>
		<nav class="items">
      <router-link :to="{ name: 'Timeline' }">
        <i class="fa fa-home"></i> Início
      </router-link>
      <a href="#" @click="dropDown('generos')">
        <i class="fa fa-random"></i> Gêneros
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
          <nav class="items-sub" v-if="showDropdown.generos">
            <router-link v-for="genero in site.generos" :key="genero.id" :to="{ name: 'Filter', params: {chave: 'genero', valor: (genero.slug != '') ? genero.slug : 'all'} }">
              <i class="fa fa-play"></i> {{ genero.nome }}
            </router-link>
          </nav>
        </transition>
      </a>
      <router-link :to="{ name: 'Filter', params: {chave: 'categoria', valor: 'animes'} }">
        <i class="fa fa-list"></i> Animes
      </router-link>
      <router-link :to="{ name: 'Filter', params: {chave: 'categoria', valor: 'desenhos'} }">
        <i class="fa fa-film"></i> Desenhos
      </router-link>
      <router-link :to="{ name: 'Filter', params: {chave: 'categoria', valor: 'filmes'} }">
        <i class="fa fa-ticket"></i> Filmes
      </router-link>
      <a v-if="!userLogado" href="#" @click.prevent="showModalLogin = !showModalLogin">
        <i class="fa fa-user-o"></i> Login
      </a>
      <router-link v-if="userLogado" :to="{ name: 'Conta' }">
        <i class="fa fa-user-o"></i> Minha conta
      </router-link>
      <a v-if="userLogado" href="#" @click.prevent="showModalLogout = !showModalLogout">
        <i class="fa fa-sign-out"></i> Sair
      </a>
    </nav>
    <ModalLogin v-if="showModalLogout">
      <div slot="body">
        <h3>Continue para desconectar do aplicativo</h3>
      </div>
      <div slot="footer">
        <button type="button" class="modal-default-button" @click="showModalLogout = false">
          Cancelar
        </button>
        <button type="button" class="modal-cancel-button" @click.prevent="desconectar()">
          Continuar
        </button>
      </div>
    </ModalLogin>
    <ModalLogin v-if="showModalLogin">
      <div slot="body">
    		<div class="form-group">
    			<label for="email">Email</label>
    			<input type="email" name="email" id="email" v-model="user_.email">
    		</div>
    		<div class="form-group">
    			<label for="password">Senha</label>
    			<input type="password" name="password" id="password" v-model="user_.password">
    		</div>
    		<div class="form-group">
    			<label class="label-check" for="lembrarUser">
    				<input class="label-check-input" type="checkbox" name="lembrarUser" id="lembrarUser" v-model="lembrarUser">
    				<span class="label-check-title">Salvar sessão</span>
    			</label>
    		</div>
    	</div>
      <div slot="footer">
        <button type="button" class="modal-cancel-button" @click="showModalLogin = false">
          Cancelar
        </button>
        <button type="button" class="modal-default-button" @click.prevent="criarConta()">
          Criar conta
        </button>
        <button type="button" class="modal-success-button" @click.prevent="conectar()">
          Entrar
        </button>
      </div>
    </ModalLogin>
	</div>
</template>

<script>
import firebase from '@/firebase.js'
import Modal from '@/components/Modal.vue'
export default {
  name: 'MenuCollapse',
  props: ['showMenu'],
  components: {
    'ModalLogin': Modal
  },
  data () {
    return {
      lembrarUser: false,
      userLogado: false,
      user_: {
        email: '',
        password: ''
      },
      users: {},
      showModalLogin: false,
      showModalLogout: false,
      showDropdown: {
        generos: false
      },
      site: {
        generos: []
      }
    }
  },
  mounted () {
    this.fetchGeneros()
    let self = this
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        self.userLogado = user
        self.showModalLogin = false
        self.$emit('closeMenuCollapse', false)
      } else {
        self.userLogado = false
      }
    })
  },
  methods: {
    conectar: function () {
      firebase.auth().signInWithEmailAndPassword(this.user_.email, this.user_.password).catch(function (error) {
        // Handle Errors here.
        console.error(error.code)
        console.warn(error.message)
      })
    },
    desconectar: function () {
      let self = this
      firebase.auth().signOut().then(function () {
        self.showModalLogout = false
      }).catch(function (error) {
        console.error(error)
      })
    },
    criarConta: function () {
      firebase.auth().createUserWithEmailAndPassword(this.user_.email, this.user_.password).catch(function (error) {
        // Handle Errors here.
        console.error(error.code)
        console.warn(error.message)
      })
    },
    dropDown: function (name) {
      this.showDropdown[name] = !this.showDropdown[name]
    },
    fetchGeneros: function () {
      this.$http.get(this.$api(`posts/metas/generos`)).then(response => {
        this.site.generos = response.body
      }, response => {
        // code
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 40px; right: 0; bottom: 0; left: 0;
  background-color: rgba(0,0,13,.7);
  z-index: 999;
}

.items {
  position: fixed;
  left: 0;
  top: 40px;
  bottom: 0;
  overflow-y: auto;
  display: flex;
  flex-flow: column;
  background-color: black;
  padding: 20px 30px;
  width: calc(100% - 120px);
	z-index: 1000;
  @include box-shadow(0 0 20px rgba(0,0,0,.6));
}

.items a {
  color: $color-white;
  font-size: 3vh;
  display: block;
  line-height: 3;
  padding: 0 20px 0 0;
  @include transition;
}

.items a + a {
  border-top: 1px solid rgba(255,255,255,.1);
}

.items a .fa {
  margin-right: 10px;
}

.items a:hover {
  color: $color-azul;
}

.items-sub a {
  font-size: 2.5vh;
  margin-left: 10px;
}

</style>
