<template lang="html">
  <form action="#" method="post" @submit.prevent="submitForm()">
    <MenuHeaderBack>
      <b slot="title">Minha conta</b>
    </MenuHeaderBack>

      <!-- <label for="nome">
        <span class="label">Nome</span>
        <input type="text" name="displayName" v-model="user.name">
      </label> -->
      <label for="username">
        <span class="label">Nome de usuário</span>
        <input type="text" name="username" v-model="user.displayName">
      </label>
      <!-- <label for="role">
        <span class="label">Função</span>
        <input type="text" :value="user.role" disabled>
      </label> -->

      <h3>Informações privadas</h3>
      <label for="email">
        <span class="label">Email</span>
        <input type="email" name="email" :value="user.email" disabled>
      </label>
      <!-- <label for="newpassword">
        <span class="label">Alterar senha</span>
        <input name="newpassword" type="password" v-model="user.newpassword" placeholder="Insira a nova senha">
      </label>
      <label for="repassword">
        <span class="label">Confirmar</span>
        <input type="password" name="repassword" v-model="user.repassword">
      </label> -->

      <modal v-if="showModal" @close="showModal = false">
        <div slot="header">
          Confirme senha atual
        </div>
        <div slot="body">
          <label for="oldpassword">
              <span class="label">Digite</span>
            <input type="password" name="oldpassword" v-model="user.password" value="">
          </label>
        </div>
        <div slot="footer">
          <button type="button" class="modal-cancel-button" @click="showModal = false">
            Cancelar
          </button>
          <button type="submit" class="modal-success-button">
            <i class="fa fa-check"></i>
            Salvar
          </button>
        </div>
      </modal>
  </form>
</template>

<script>
import MenuHeaderBack from '@/components/MenuHeaderBack.vue'
import modal from '@/components/ModalAlterarSenha.vue'
import firebase from '@/firebase.js'
export default {
  components: {
    'MenuHeaderBack': MenuHeaderBack,
    'modal': modal
  },
  data () {
    return {
      showModal: false,
      userSubmit: {},
      user: {}
    }
  },
  methods: {
    submitForm: function () {
      // let formData = new FormData(event.target)
      let user = firebase.auth().currentUser
      let self = this
      user.updateProfile({
        displayName: this.user.displayName
      }).then(function () {
        self.$flash.push({ message: `Dados de ${self.user.displayName} atualizado`, className: 'success' })
      }).catch(function (error) {
        self.$flash.push({ message: error, className: 'error' })
      })
    },
    relogar: function () {
      this.user = firebase.auth().currentUser
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
          window.location.href = '/'
        }
      })
      let currentUser = firebase.auth().currentUser
      if (currentUser) {
        this.user = currentUser
      }
    })
  }
}
</script>

<style lang="scss" scoped>

h3 {
  color: white;
  margin: 30px 0 0 10px;
}

form {
  display: flex;
  flex-flow: column;
}

button[type='submit'] {

}

label {
  display: flex;
  flex-flow: column;
  margin: 20px 0 0 0;
  padding: 0 10px;
}

label .label {
  color: #a2a2a2;
}

label input {
  outline: 0 !important;
  padding: 5px 0;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid #666;
  color: #f1f1f1;
}

label input[disabled] {
  color: $color-disabled;
}

label input:focus {
  border-color: #3441B0;
}

</style>
