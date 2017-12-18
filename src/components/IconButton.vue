<template lang="html">
	<router-link :tag="tagName" :to="toName" :class="className">
		<i class="fa" :class="classIconName"></i>
	</router-link>
</template>

<script>
export default {
	name: 'IconButton',
	props: {
		tagName: {
			required: false,
			default: 'button',
			type: String
		},
		toName: {
			required: false,
			default: '#',
			type: String
		},
		className: {
			required: false,
			type: String
		},
		classIconName: {
			required: true,
			type: String
		}
	},
	mounted () {
		this.classIconName = 'fa-' + this.classIconName
	}
}
</script>

<style lang="scss">
> * {
  width: 20%;
  border: none;
  background-color: transparent;
  color: white;
  line-height: 1;
  padding: 15px 0 ;
  text-align: center;
  text-transform: uppercase;
  transition: .1s ease-in-out all;
}
> *:hover,
> *:focus,
> *:active,
> *.active {
  color: $color-azul-light;
}
</style>
