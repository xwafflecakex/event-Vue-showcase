import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {id: 'abc123', name: 'Simple Man'},
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
      {id: 1, text: '...', done: true},
      {id: 2, text: '...', done: false},
      {id: 3, text: '...', done: true},
      {id: 4, text: '...', done: false},
    ],
    events: [
      {id: 1, text: '...', organizer: '...'},
      {id: 2, text: '...', organizer: '...'},
      {id: 3, text: '...', organizer: '...'},
      {id: 4, text: '...', organizer: '...'},

    ]
  },
  mutations: {},
  actions: {},
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
