import Vue from 'vue'
import Router from 'vue-router'

import Timeline from '@/views/Timeline'
import Search from '@/views/Search'
import Filter from '@/views/Filter'
import Conta from '@/views/Conta'
import CriarConta from '@/views/CriarConta'

import Watch from '@/views/Watch'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    // return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Timeline,
      meta: {
        permission: 'public'
      }
    },
    {
      path: '/search',
      name: 'Busca',
      component: Search,
      meta: {
        permission: 'public'
      }
    },
    {
      path: '/search/:cmd',
      name: 'Busca personalizada',
      component: Search,
      props: true,
      meta: {
        permission: 'public'
      }
    },
    {
      path: '/filter/:chave/:valor',
      name: 'Filtro',
      component: Filter,
      props: true,
      meta: {
        permission: 'public'
      }
    },
    {
      path: '/conta',
      name: 'Minha conta',
      component: Conta,
      meta: {
        permission: 'client'
      }
    },
    {
      path: '/criar-conta',
      name: 'Criar conta',
      component: CriarConta,
      meta: {
        permission: 'public'
      }
    },
    {
      path: '/watch/:slug',
      name: 'Watch',
      component: Watch,
      props: true,
      meta: {
        permission: 'public'
      }
    },
    {
      path: '/watch/:slug/:ep',
      name: 'WatchEp',
      component: Watch,
      props: true,
      meta: {
        permission: 'public'
      }
    }
  ]
})
