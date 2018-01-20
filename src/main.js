import Vue from 'vue'
import VueResource from 'vue-resource'
import VueVideoPlayer from 'vue-video-player'
import VueAnalytics from 'vue-analytics'
import VueFire from 'vuefire'
import VueHead from 'vue-head'
import VueLocalStorage from 'vue-ls'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'
import App from './App'
import router from './router'

// CSS
import 'font-awesome/css/font-awesome.css'
import 'animate.css/animate.css'
import 'video.js/dist/video-js.min.css'

Raven.config('https://6983beb5db044cb39ac2419e6faff729@sentry.io/263729').addPlugin(RavenVue, Vue).install()

// Configs (ORGANIZAR MELHOR)
Vue.use(VueResource)
Vue.use(VueVideoPlayer)
Vue.use(VueFire)
Vue.use(VueAnalytics, {id: 'UA-106829297-3'})
Vue.use(VueLocalStorage, {namespace: 'ag__'})
Vue.use(VueHead)

// API
var config = {
  local: {
    project_name: 'AnimesGO',
    api: '//localhost:3000/',
    wb_image: '//blog.dev/upload/image/',
    wb_avatar: '//blog.dev/upload/image/user/'
  },
  prod: {
    project_name: 'AnimesGO',
    api: '//api.animesgo.net/',
    wb_image: '//www.animesgo.net/upload/image/',
    wb_avatar: '//www.animesgo.net/upload/image/user/'
  }
}
Vue.prototype.$config = config.local
Vue.prototype.$api = function (req) {
  return this.$config.api + req
}

Vue.prototype.$flash = []

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
