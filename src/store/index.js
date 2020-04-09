import Vue from 'vue'
import Vuex from 'vuex'
// this method of modules allows for better private variables and methods
// The lazy way is to just import name, then export default state, getters...ect.
import * as user from '@/store/modules/user.js' // import all public items into user namespace so user.state = user: { id: 'abc123', name: 'Simple Man' }
import * as event from '@/store/modules/event.js'

// *** ACTIONS, MUTATIONS, GETTERS are always in the global namespace, therfore we can have multiple actions/mutations using the same name.

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    event
  },
  state: {
    // 1 of 2 ways.
    //endPage: false,
    // mutation way
    categories: [
      'sustainability',
      'nature',
      'animeal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],

  },
  getters: {
    catLength: state => {
      return state.categories.length
    }
  }
})
