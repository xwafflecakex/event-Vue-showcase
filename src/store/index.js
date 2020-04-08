import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Simple Man' },
    categories: [
      'sustainability',
      'nature',
      'animeal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    // passing getters Example
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 3, text: '...', done: true },
      { id: 4, text: '...', done: false },
    ],
    events: [
      { id: 12222, text: '...', organizer: '...' },
      { id: 222222, text: '...', organizer: '...' },
      { id: 322222, text: '...', organizer: '...' },
      { id: 42222, text: '...', organizer: '...' },

    ]
  },
  // ALWAYS wrap mutations in an Action
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    }
  },
  actions: {
    // commit is the context object and event the payload
    createEvent({ commit }, event) {
      // Should also post the new event to the DB, then commit to the state
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)  // now it will commit when api call responds
      })
    }
  },
  modules: {},
  getters: {
    catLength: state => {
      return state.categories.length
    },
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    // passing the entire getter object in
    activeTodosCount: (state, getters) => {
      return state.todos.length - getters.doneTodos.length
    },
    // So i am passing in the sate and then i get the ID which then runs the function.
    getEventById: state => id => {
      // find event id with the event id given.
      return state.events.find(event => event.id === id)
    }
  }
})
