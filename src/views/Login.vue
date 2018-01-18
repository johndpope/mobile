<template lang="html">
	<div class="card-default">
		<form action="index.html" method="post" @submit.prevent="login">
			<div class="form-group">
				<label for="email">Email</label>
				<input type="email" name="email" id="email" v-model="user.email">
			</div>
			<div class="form-group">
				<label for="password">Senha</label>
				<input type="password" name="password" id="password" v-model="user.password">
			</div>
			<div class="form-group">
				<!-- <label class="label-check" for="lembrarUser">
					<input class="label-check-input" type="checkbox" name="lembrarUser" id="lembrarUser" v-model="lembrarUser">
					<span class="label-check-title">Lembrar</span>
				</label> -->
			</div>
			<button class="btn info" type="submit" name="login">Login</button>
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
        email: '',
        password: ''
      }
    }
  },
  mounted () {
    alert(this.sha1('teste'))
  },
  methods: {
    login: function () {
      let self = this
      this.$http.get(this.$api(`user/view/${self.user.email}/${sha1(self.user.password)}`)).then(response => {
        self.$userLogado = response
        self.$flash.push({message: `Usuário conectado`, className: 'info'})
      }, response => {
        if (response.status !== 404) {
          self.$flash.push({message: `Falha ao conectar`, className: 'error'})
        } else {
          self.$flash.push({message: `Conta não encontrada`, className: 'info'})
        }
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
