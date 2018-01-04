import Vue from 'vue'
import Router from 'vue-router'

import Timeline from '@/views/Timeline'
import Search from '@/views/Search'
import Filter from '@/views/Filter'
import Lista from '@/views/Lista'
import Conta from '@/views/Conta'
import Login from '@/views/Login'

import Watch from '@/views/Watch'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Timeline',
      component: Timeline
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/search/:cmd',
      name: 'SearchFilter',
      component: Search,
      props: true
    },
    {
      path: '/filter/:chave/:valor',
      name: 'Filter',
      component: Filter,
      props: true
    },
    {
      path: '/heart',
      name: 'Lista',
      component: Lista
    },
    {
      path: '/conta',
      name: 'Conta',
      component: Conta
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
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
