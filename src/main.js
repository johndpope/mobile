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

// CSS
import 'font-awesome/css/font-awesome.css'
import 'animate.css/animate.css'
import '@/assets/css/reset.css'

let sentry = Raven.config('https://6983beb5db044cb39ac2419e6faff729@sentry.io/263729').addPlugin(RavenVue, Vue)
if (process.env.NODE_ENV === 'production') sentry.install()

// Configs (ORGANIZAR MELHOR)
Vue.use(VueResource)
Vue.use(VueTouch)
Vue.use(VueAnalytics, {id: 'UA-106829297-3'})
Vue.use(VueLocalStorage, {namespace: 'ag__'})
Vue.use(VueHead)

Vue.http.options.root = process.env.NODE_ENV === 'production'
  ? '//api.animesgo.net/'
  : '//api.animesgo.net/'

Vue.prototype.$flash = []
Vue.prototype.moment = Moment
Vue.prototype.checkPermissions = function (roles) {
  let userlogado = this.$ls.get('user', false)
  if (userlogado !== false && roles.indexOf(userlogado.role) > -1) {
    return true
  }
  return false
}

// TODO: Transforma um objeto em string (ex.: key=value&key2=value2)
Vue.prototype.makeQueryString = function (s) {
  const FIND = ['"', ':', ',', '{', '}']
  const REPLACE = ['', '=', '&', '', '']
  let stringify = JSON.stringify(s)
  FIND.forEach((value, key) => {
    stringify = stringify.split(value).join(REPLACE[key])
  })
  return stringify
}

// TODO: Monta a url das imagens (pasta + filename)
// NOTE: HACK: O INTERESSANTE SERIA ALTERNAR AS URL DOS STORAGE OU USAR UM CDN, SEI LÁ,
//             UM CACHE SEI LÁ
Vue.prototype.makeImageUrl = function (key, filename) {
  let urlImage = filename
  if (['post.capa', 'post.imagem', 'post.banner'].indexOf(key) > -1) {
    urlImage = `//animesgo.info/upload/image/${filename}`
  } else if (['user.avatar', 'user.imagem'].indexOf(key) > -1) {
    urlImage = `//animesgo.info/upload/image/user/${filename}`
  }
  return urlImage
}
// TODO: Use no template {{ var || filterName }}
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

router.beforeEach((to, from, next) => {
  if (to.params.valor === 'hentais') {
    // se + 18
    // next()
    // se não
    // next(false) ou redirect
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
