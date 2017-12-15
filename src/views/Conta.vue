<template lang="html">
  <div>
    <MenuHeaderBack>
      <h2 slot="title">Minha conta</h2>
    </MenuHeaderBack>

    <form action="/users/:id" method="put">
      <label for="nome">
        <span class="label">Nome</span>
        <input type="text" name="nome" :value="user.nome">
      </label>
      <label for="username">
        <span class="label">Nome de usuário</span>
        <input type="text" name="username" :value="user.username">
      </label>
      <label for="role">
        <span class="label">Função</span>
        <input type="text" name="role" :value="user.role" disabled>
      </label>
      <h3>Informações privadas</h3>
      <label for="newpassword">
        <span class="label">Alterar senha</span>
        <input type="text" name="newpassword" value="">
      </label>
    </form>

  </div>
</template>

<script>
import MenuHeaderBack from '@/components/MenuHeaderBack.vue'
export default {
  components: {
    'MenuHeaderBack': MenuHeaderBack
  },
  data () {
    return {
      user: {
        nome: 'Anilson Lopes',
        username: 'quilamcz',
        role: 'admin'
      }
    }
  }
}
</script>

<style lang="scss" scoped>

h3 {
  color: white;
  margin: 30px 0 0 0;
}

form {
  display: flex;
  flex-flow: column;
  padding: 0 10px;
}

label {
  display: flex;
  flex-flow: column;
  margin: 20px 0 0 0;
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

label input:focus {
  border-color: #3441B0;
}

</style>
