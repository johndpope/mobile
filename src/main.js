import Vue from 'vue'
import VueResource from 'vue-resource'
import VueAnalytics from 'vue-analytics'
import VueHead from 'vue-head'
import VueLocalStorage from 'vue-ls'
import VueTouch from 'vue-touch'
import Moment from 'moment'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'
import App from './App'
import router from './router'
import Acl from 'vue-acl'

// CSS
import 'font-awesome/css/font-awesome.css'
import 'animate.css/animate.css'
import 'swiper/dist/css/swiper.css'

Raven.config('https://6983beb5db044cb39ac2419e6faff729@sentry.io/263729').addPlugin(RavenVue, Vue).install()

// Configs (ORGANIZAR MELHOR)
Vue.use(VueResource)
Vue.use(VueTouch)
Vue.use(VueAnalytics, {id: 'UA-106829297-3'})
Vue.use(VueLocalStorage, {namespace: 'ag__'})
Vue.use(VueHead)
Vue.use(Acl, {router: router, init: 'public', fail: '/'})

// API
var config = {
  local: {
    project_name: 'AnimesGO',
    api: '//192.168.0.11:3000/',
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

Vue.filter('dataEvento', function (value) {
  if (value) {
    return Moment(String(value)).format('DD/MM/YYYY')
  }
})

Vue.filter('slugify', function (value) {
  var slug = ''
  var strLower = value.toLowerCase()
  slug = strLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e')
  slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a')
  slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o')
  slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u')
  slug = slug.replace(/đ/gi, 'd')
  slug = slug.replace(/\s*$/g, '')
  slug = slug.replace(/\s+/g, '-')
  return slug
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
