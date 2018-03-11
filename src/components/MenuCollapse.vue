<template lang="html">
	<div id="MenuCollapse">
    <div class="overlay"></div>
		<nav class="items">
      <router-link :to="{ name: 'Home' }">
        <i class="fa fa-home"></i> Início
      </router-link>
      <a href="#" @click="dropDown('generos')">
        <i class="fa fa-random"></i> Gêneros
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
          <nav class="items-sub" v-if="showDropdown.generos">
            <router-link v-for="genero in site.generos" :key="genero.id" :to="{ name: 'Filtro', params: {chave: 'genero', valor: (genero.slug != '') ? genero.slug : 'all'} }">
              <i class="fa fa-play"></i> {{ genero.nome }}
            </router-link>
          </nav>
        </transition>
      </a>
      <router-link :to="{ name: 'Filtro', params: {chave: 'categoria', valor: 'animes'} }">
        <i class="fa fa-list"></i> Animes
      </router-link>
      <router-link :to="{ name: 'Filtro', params: {chave: 'categoria', valor: 'desenhos'} }">
        <i class="fa fa-film"></i> Desenhos
      </router-link>
      <router-link :to="{ name: 'Filtro', params: {chave: 'categoria', valor: 'filmes'} }">
        <i class="fa fa-ticket"></i> Filmes
      </router-link>
      <router-link :to="{ name: 'Listas' }">
        <i class="fa fa-heart"></i> Listas
      </router-link>
      <a v-if="!userLogado" href="#" @click.prevent="showModalLogin = !showModalLogin">
        <i class="fa fa-user-o"></i> Login
      </a>
      <router-link v-if="!userLogado" :to="{ name: 'Criar conta' }">
        <i class="fa fa-user-plus"></i> Criar conta
      </router-link>
      <router-link v-if="userLogado" :to="{ name: 'Minha conta' }">
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
      <div slot="header">
        <h3>Conecte-se ao AnimesGO</h3>
        <button class="modal-close-button" @click="showModalLogin = false">
          <i class="fa fa-close"></i>
        </button>
      </div>
      <div slot="body">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" name="email" id="email" @keyup.enter="conectar()" v-model="user.email">
        </div>
        <div class="form-group">
          <label for="password">Senha</label>
          <input type="password" name="password" id="password" @keyup.enter="conectar()" v-model="user.password">
        </div>
      </div>
      <div slot="footer">
        <router-link tag="button" :to="{ name: 'Criar conta' }"  class="modal-default-button">
          Criar conta
        </router-link>
        <button type="submit" class="modal-success-button" @click.prevent="conectar()">
          Entrar
        </button>
      </div>
    </ModalLogin>
	</div>
</template>

<script>
import sha1 from 'sha1'
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
      user: {
        email: '',
        password: ''
      },
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
  computed: {
    userLogado: function () {
      return this.$ls.get('user', false) || false
    }
  },
  mounted () {
    this.fetchGeneros()
  },
  methods: {
    conectar: function () {
      let self = this
      this.$http.get(this.$api(`user/login/${self.user.email}/${sha1(self.user.password)}`)).then(response => {
        self.$ls.set('user', response.body)
        self.showModalLogin = false
        self.$emit('closeMenuCollapse')
        self.$flash.push({message: `${response.body.username} conectou`, className: 'info'})
        return true
      }, response => {
        if (response.status !== 404) self.$flash.push({message: `Falha ao conectar`, className: 'error'})
        else self.$flash.push({message: `Conta não encontrada`, className: 'info'})
      })
    },
    desconectar: function () {
      this.$ls.remove('user')
      this.$flash.push({message: `Usuário desconectado`, className: 'info'})
      this.showModalLogout = false
      this.$emit('closeMenuCollapse')
      window.location.reload(true)
    },
    criarConta: function () {
      let self = this
      this.$http.get(this.$api(`user/view/${self.user.email}`)).then(response => {
        self.$flash.push({message: `Email já em uso`, className: 'error'})
      }, response => {
        self.$ls.set('usertemp', self.user)
        self.showModalLogin = false
        self.$emit('closeMenuCollapse')
        self.$router.push({name: 'Criar conta'})
      })
    },
    dropDown: function (name) {
      this.showDropdown[name] = !this.showDropdown[name]
    },
    fetchGeneros: function () {
      this.site.generos = this.$ls.get('generos', false)
      if (this.site.generos === false) {
        let self = this
        this.$http.get(this.$api(`posts/metas/generos`)).then(response => {
          self.site.generos = response.body
          self.$ls.set('generos', self.site.generos, (60 * 60 * 1000) * 3)
        }, response => {
          self.site.generos = [
            {
              id: 'acaocarai',
              slug: 'acao',
              nome: 'Ação'
            },
            {
              id: 'lutacarai',
              slug: 'luta',
              nome: 'Luta'
            },
            {
              id: 'comediacarai',
              slug: 'comedia',
              nome: 'Comédia'
            }
          ]
          self.$ls.set('generos', self.site.generos, (60 * 60 * 1000))
        })
      }
    },
    setPermissions: function (role) {
      let permission = (role === 'public') ? 'public' : 'client'
      this.access.push(permission)
      this.access = this.access.filter((element) => {
        return element === permission
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#MenuCollapse {
  position: relative;
}

.overlay {
  position: fixed;
  top: 40px; right: 0; bottom: 0; left: 0;
  background-color: rgba(0,0,0,.9);
  z-index: 999;
}

.items {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  display: flex;
  flex-flow: column;
  background-color: black;
  padding: 20px 30px;
  width: calc(100% - 120px);
  height: 100vh;
	z-index: 1000;
  @include box-shadow(0 0 20px rgba(0,0,0,.6));
  opacity: 0;
  animation: items .5s ease-in-out forwards;
}

@keyframes items {
  from {
    transform: translateX(-300px);
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.items a {
  color: $color-white;
  font-size: 3vh;
  display: block;
  line-height: 3;
  padding: 0 20px 0 0;
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
