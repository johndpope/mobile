<template lang="html">
  <div>
    <form action="#" method="post" @submit.prevent="submitForm()">
      <MenuHeaderBack>
        <b slot="title" clas="animated">Minha conta</b>
        <b slot="acao" clas="animated">Salvar</b>
      </MenuHeaderBack>

        <label for="nome">
          <span class="label">Nome</span>
          <input type="text" name="displayName" v-model="user.fullname">
        </label>

        <label for="username">
          <span class="label">Nome de usuário</span>
          <input type="text" name="username" v-model="user.username">
        </label>

        <label for="role">
          <span class="label">Função</span>
          <input type="text" :value="user.role" disabled>
        </label>

        <h3>Informações privadas</h3>
        <label for="email">
          <span class="label">Email</span>
          <input type="email" name="email" :value="user.email" disabled>
        </label>

        <div class="actions">
          <button @click="showModal = true" type="button" class="btn info">Alterar senha</button>
        </div>
    </form>
    <modal v-if="showModal" @close="showModal = false">
      <div slot="header">
        <h3>Alterar senha</h3>
      </div>
      <div slot="body">
        <label for="oldpassword">
          <span class="label">Senha atual</span>
          <input type="password" name="oldpassword" v-model="newPassword.old">
        </label>
        <label for="oldpassword">
            <span class="label">Nova senha</span>
          <input type="password" name="oldpassword" v-model="newPassword.new">
        </label>
      </div>
      <div slot="footer">
        <button type="button" class="modal-cancel-button" @click="showModal = false">
          Cancelar
        </button>
        <button @click.prevent="alterarSenha()" type="button" class="modal-success-button">
          <i class="fa fa-check"></i>
          Salvar
        </button>
      </div>
    </modal>
  </div>
</template>

<script>
import MenuHeaderBack from '@/components/MenuHeaderBack.vue'
import modal from '@/components/ModalAlterarSenha.vue'
import sha1 from 'sha1'

export default {
  components: {
    'MenuHeaderBack': MenuHeaderBack,
    'modal': modal
  },
  data () {
    return {
      newPassword: {
        new: '',
        old: ''
      },
      showModal: false
    }
  },
  beforeMount: function () {
    // TEMP: Block users não logado
    // OPTIMIZE: Verificar permissões no proprio objeto de rotas (beforeRouter, beforeRounterEnter...)
    if (!this.checkPermissions(this.$route.meta.role)) {
      window.location.href = '/'
    }
  },
  computed: {
    user: function () {
      return this.$ls.get('user', false)
    }
  },
  methods: {
    submitForm: function () {
      let self = this
      let userSubmit = self.user
      if (typeof userSubmit.avatar !== 'undefined' && userSubmit.avatar !== '') {
        userSubmit.avatar = userSubmit.avatar.split('/image/')[1]
      }
      this.$http.post(`user/edit/${self.user.id}/?${this.makeQueryString(userSubmit)}`).then(response => {
        self.$ls.set('user', self.user)
        self.$flash.push({message: 'Dados atualizados', className: 'info'})
      }, response => {
        this.$flash.push({message: 'Falha ao atualizar', className: 'error'})
      })
    },
    alterarSenha: function () {
      if (this.user.password === sha1(this.newPassword.old)) {
        let self = this
        let user = {
          password: sha1(self.newPassword.new),
          modified: this.moment().format('YYYY-MM-DD h:mm:ss'),
          ultimo_login: this.moment().unix()
        }
        this.$http.post(`user/edit/${self.user.id}/?${self.makeQueryString(user)}`).then(response => {
          self.$ls.set('user', self.user)
          self.$flash.push({message: 'Senha alterada com sucesso', className: 'info'})
          this.showModal = false
        }, response => {
          this.$flash.push({message: 'Falha ao atualizar', className: 'error'})
          this.showModal = false
        })
      } else {
        this.$flash.push({message: 'Senha atual não confere', className: 'error'})
        this.showModal = false
      }
    }
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
}

form label {
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
}

form label input {
  color: #f1f1f1;
}

label input[disabled] {
  color: $color-disabled;
}

label input:focus {
  border-color: #3441B0;
}

.actions {
  margin: 20px 0 0 10px;
}

</style>
