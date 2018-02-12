import Vue from 'vue'
import Router from 'vue-router'

import Timeline from '@/views/Timeline'
import Search from '@/views/Search'
import Filter from '@/views/Filter'
import Conta from '@/views/Conta'
import Doacao from '@/views/Doacao'
import CriarConta from '@/views/CriarConta'

import Watch from '@/views/Watch'
import Fail from '@/views/Fail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    let scrolltop = (savedPosition !== null) ? savedPosition.y : 0
    $('html, body').delay(500).animate({ scrollTop: scrolltop }, { duration: 500 })
  },
  beforeEnter: function (to, from, next) {
    if ((typeof to.meta !== 'undefined') && typeof to.meta.role !== 'undefined') {
      if (!Vue.prototype.checkPermissions(to.meta.role)) {
        window.location.href = '/'
        next(false)
      }
    }
    next()
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Timeline
    },
    {
      path: '/fail',
      name: 'Fail',
      component: Fail
    },
    {
      path: '/search',
      name: 'Busca',
      component: Search
    },
    {
      path: '/search/:cmd',
      name: 'Busca personalizada',
      component: Search,
      props: true
    },
    {
      path: '/filter/:chave/:valor',
      name: 'Filtro',
      component: Filter,
      props: true
    },
    {
      path: '/conta',
      name: 'Minha conta',
      component: Conta,
      meta: {
        role: ['membro', 'colaborador', 'mod', 'autor', 'admin'],
        fail: '/'
      }
    },
    {
      path: '/criar-conta',
      name: 'Criar conta',
      component: CriarConta
    },
    {
      path: '/doacao',
      name: 'Doação',
      component: Doacao
    },
    {
      path: '/watch/:slug',
      name: 'Watch',
      component: Watch,
      props: true
    },
    {
      path: '/watch/:slug/:ep',
      name: 'WatchEp',
      component: Watch,
      props: true
    }
  ]
})
