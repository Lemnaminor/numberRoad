import Vue from 'vue'
import Router from 'vue-router'
import checkPoint from '@/components/page/checkPoint'
import gameIndex from '@/components/page/gameIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'checkPoint',
      component: checkPoint
    }
    ,{
      path: '/gameindex/:level(\\d+)',
      name: 'gameIndex',
      component: gameIndex
    }
  ]
})
