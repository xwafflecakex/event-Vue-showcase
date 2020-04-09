import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Simple Man' },
    // 1 of 2 ways.
    endPage: false,
    // mutation way
    eventsTotal: 0,
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
    events: [],
    event: {}
  },
  // ALWAYS wrap mutations in an Action
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_TOTALEVENTS(state, eventsTotal) {
      state.eventsTotal = eventsTotal
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  actions: {
    // commit is the context object (lets you access mutations) and event the payload
    createEvent({ commit }, event) {
      // Should also post the new event to the DB, then commit to the state
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)  // now it will commit when api call responds
      })
    },
    // Getting the events in the form of an Api call with waiting to recive OKAy from server before fetch and error catch.
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then(response => {
          // printing the JSON server;s responce header total-count
          console.log('Total events are ' + response.headers['x-total-count'])
          commit('SET_TOTALEVENTS', parseInt(response.headers['x-total-count']))
          commit('SET_EVENTS', response.data)
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    },
    // fetching individual event
    fetchEvent({ commit, getters }, id) {
      let event = getters.getEventById(id) // find specific event
      if (event) {
        commit('SET_EVENT', event) // commit mutation if found, else do api call.
      } else {
        EventService.getEvent(id)
          .then((response) => {
            commit('SET_EVENT', response.data)
          })
          .catch((error) => {
            console.log("There was an error:", error.response);
          });
      }
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
    },
    // For the NExt pagation problem without saving ref header from server.
    // findEndPage: state => {
    //   return state.endPage
    // }
  }
})
