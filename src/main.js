import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'

import 'font-awesome/css/font-awesome.css'

Vue.use(VueResource)
Vue.config.productionTip = false
var config = {
  local: {
    api: '//localhost:3000/',
    wb_image: '//blog.dev/upload/image/',
    wb_avatar: '//blog.dev/upload/image/user/'
  },
  prod: {
    api: '//api.animesgo.net/',
    wb_image: '//www.animesgo.net/upload/image/',
    wb_avatar: '//www.animesgo.net/upload/image/user/'
  }
}
Vue.prototype.$config = config.local
Vue.prototype.$api = function (req) {
  return this.$config.api + req
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
