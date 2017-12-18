import Vue from 'vue'
import Router from 'vue-router'

import Timeline from '@/views/Timeline'
import Search from '@/views/Search'
import Lista from '@/views/Lista'
import Conta from '@/views/Conta'

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
