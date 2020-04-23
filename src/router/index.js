import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '../views/EventList.vue'
import User from '../views/User.vue'
import Nprogress from 'nprogress'
import store from '@/store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: true,
  },
  {
    path: '/event/:id',
    name: 'event-show',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/EventShow.vue'),
    // runing the global beforeEach
    beforeEnter(routeTo, routeFrom, next) {
      // call the action passing in the ID of the event, we recive the event in the Then
      store.dispatch('event/fetchEvent', routeTo.params.id).then((event) => {
        routeTo.params.event = event
        next()
      }).catch(error => {
        if (error.response && error.response.status == 404) {
          next({
            name: '404',
            params: { resource: 'event' }
          })
        } else {
          next({ name: 'network-issue' })
        }
      })
    },
  },
  {
    path: '/example',
    name: 'Example',
    component: () => import('../views/Example.vue')
  },
  {
    path: '/event/create',
    name: 'EventCreate',
    component: () => import('../views/EventCreate.vue')
  },
  // Dynamic routing
  {
    path: '/user/:username', // So the :user name is a prop and is dynamically looking for the username, and ID.
    name: 'user',
    component: User,
    props: true //This sends route params into component as props.
  },
  {
    path: '/AnimationTest',
    name: 'animation',
    component: () => import('../views/AnimationTest.vue'),
  },
  {
    path: '/404',
    name: '404',
    props: true,
    component: () => import('../views/404NotFound.vue'),
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: () => import('../views/NetworkIssue.vue'),

  },

  // catch-all route
  {
    path: '*',
    redirect: {
      name: '404',
      params: {
        resource: 'page'
      }
    }
  },


]

const router = new VueRouter({
  mode: 'history', // uses the browsers history.pushstate API, change URl without reloads
  routes
})

router.beforeEach((routeTo, routeFrom, next) => {
  Nprogress.start()
  next()
})

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  Nprogress.done()
})

export default router