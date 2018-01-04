<template lang="html">
	<form class="card container" action="index.html" method="post">
		<div class="form-group">
			<label for="email">Email</label>
			<input type="email" name="email" id="email" v-model="email">
		</div>
		<div class="form-group">
			<label for="password">Senha</label>
			<input type="password" name="password" id="password" v-model="password">
		</div>
		<div class="form-group">
			<label class="label-check" for="lembrarUser">
				<input class="label-check-input" type="checkbox" name="lembrarUser" id="lembrarUser" v-model="lembrarUser">
				<span class="label-check-title">Lembrar</span>
			</label>
			<button class="btn success" type="submit" name="login">Login</button>
		</div>
	</form>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      lembrarUser: false
    }
  }
}
</script>

<style lang="scss">
</style>
