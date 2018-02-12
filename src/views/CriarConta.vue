<template lang="html">
	<div class="card-default">
		<form action="#" method="post" @submit.prevent="submitForm()">

			<div class="form-group">
				<label for="fullname">Nome completo</label>
				<input type="text" name="fullname" id="fullname" v-model="user.fullname">
			</div>

			<div class="form-group">
				<label for="username">Usuário</label>
				<input type="text" name="username" id="username" v-model="user.username">
			</div>

			<div class="form-group">
				<label for="email">Email</label>
				<input type="email" name="email" id="email" v-model="user.email">
			</div>

			<div class="form-group">
				<label for="password">Senha</label>
				<input type="password" name="password" id="password" v-model="user.password">
			</div>

			<div class="form-group">
				<label for="repassword">Confirmar senha</label>
				<input type="password" name="repassword" id="repassword" v-model="repassword">
			</div>

			<div class="form-group">
        <button class="btn info" type="submit" name="submit">Criar conta</button>
			</div>
		</form>
	</div>
</template>

<script>
import sha1 from 'sha1'

export default {
  name: 'Login',
  data () {
    return {
      user: {
        fullname: '',
        username: '',
        email: '',
        password: ''
      },
      repassword: ''
    }
  },
  beforeCreate () {
    if (this.$ls.get('user', false) !== false) {
      this.$router.push({name: 'Timeline'})
    }
  },
  methods: {
    submitForm: function () {
      let self = this
      this.$http.get(this.$api(`user/view/${self.user.email}`)).then(response => {
        self.$flash.push({message: `Email já cadastrado`, className: 'error'})
      }, response => {
        if (response.status !== 404) {
          self.$flash.push({message: `Falha ao criar a conta`, className: 'error'})
        } else {
          this.criarConta()
        }
      })
    },
    criarConta: function () {
      let self = this
      let userSubmit = self.user
      userSubmit.password = sha1(self.user.password)
      this.$http.get(this.$api(`user/criar-conta/?${self.makeQueryString(userSubmit)}`)).then(response => {
        self.$flash.push({message: `Usuário cadastrado`, className: 'success'})
      }, response => {
        self.$flash.push({message: `Falha ao criar a conta`, className: 'error'})
      })
    }
  }
}
</script>

<style lang="scss">

.card-default {
	max-width: 400px;
	margin: 20px auto;
}

</style>
