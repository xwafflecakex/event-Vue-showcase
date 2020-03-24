// @ts-nocheck
import Vue from 'vue'
import VueRouter from 'vue-router'
// @ts-ignore
import EventList from '../views/EventList.vue'
import User from '../views/User.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList
  },
  {
    path: '/event/:id',
    name: 'event-show',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/EventShow.vue')
  },
  {
    path: '/event/create',
    name: 'EventCreate',
    component: () => import('../views/EventCreate.vue')
  },
  // Dynamic routing
  {
    path: '/user/:username',
    name: 'user',
    component: User,
    props: true //This sends route params into component as props.
  }
]

const router = new VueRouter({
  mode: 'history', // uses the browsers history.pushstate API, change URl without reloads
  routes
})

export default router
