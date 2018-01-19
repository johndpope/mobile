<template lang="html">
	<div class="alert-container">
		<div v-if="messages" v-for="(message, index) in messages" class="alert" :class="message.className">
			<i class="fa fa-exclamation icon" aria-hidden="true"></i>
			<span class="message">{{ message.message }}</span>
      <i class="fa fa-close close" aria-hidden="true" @click.prevent="removeMessage(index)"></i>
		</div>
	</div>
</template>

<script>
export default {
  name: 'FlashMessage',
  data () {
    return {
      messages: this.$flash
    }
  },
  methods: {
    removeMessage: function (index) {
      this.messages.splice(index, 1)
    }
  }
}
</script>

<style scoped lang="scss">

.alert-container {
  position: fixed;
  left: 20px;
  bottom: 30px;
  transition: .3s ease-in-out all;
}

.alert {
  position: relative;
  display: flex;
  align-items: center;
  width: auto;
  min-width: 220px;
  font-size: 12px;
  padding: 10px;
  border-radius: 5px;
  overflow: hidden;
  animation: fadeInUp .7s ease-in-out;
}

.alert + .alert {
  margin-top: 10px;
}

.icon {
  margin-right: 10px;
}

.close {
  position: absolute;
  top: 0; right: 0;
  bottom: 0;
  padding: 0 10px;
  background-color: rgba(255, 255, 255, 0.2);
  line-height: 35px;
  cursor: pointer;
}

.close:hover {
  background-color: rgba(255, 255, 255, 0.8);
  color: black;
}

.alert.info {
  background-color: rgb(92, 83, 217);
  color: white;
}

.alert.success {
  background-color: rgb(61, 173, 105);
  color: white;
}

.alert.error {
  background-color: rgb(217, 86, 82);
  color: white;
}

</style>
