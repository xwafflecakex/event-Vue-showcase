import EventService from '@/services/EventService.js'
// use root STATE for global state
// To use an action from a diff module, throw in a dispatch in the param, then call dispatch with the name of mutation

export const namespaced = true // all MUTATIONS, ACTIONS, GETTERS will be under the 'event' namespace

export const state = {
     // 1 of 2 ways.
     //endPage: false,
     // mutation way
     eventsTotal: 0,
     events: [],
     event: {},
     perPage: 3,
}
// ALWAYS wrap mutations in an Action
export const mutations = {
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
}
export const actions = {
     // commit is the context object (lets you access mutations) and event the payload
     createEvent({ commit, dispatch }, event) {
          // Should also post the new event to the DB, then commit to the state
          EventService.postEvent(event).then(() => {
               commit('ADD_EVENT', event)  // now it will commit when api call responds
               const notification = {
                    type: 'success',
                    message: 'Your event was created Successfully.'
               }
               dispatch('notification/add', notification, { root: true })
          }).catch(error => {
               const notification = {
                    type: 'error',
                    message: 'There was a problem creating your event: ' + error.message
               }
               dispatch('notification/add', notification, { root: true })
               throw error // this will propergate it up to the component.
          })
     },
     // Getting the events in the form of an Api call with waiting to recive OKAy from server before fetch and error catch.
     // Adding the perPAge state and returning the call.
     fetchEvents({ commit, dispatch, state }, { page }) {
          return EventService.getEvents(state.perPage, page)
               .then(response => {
                    // printing the JSON server;s responce header total-count
                    console.log('Total events are ' + response.headers['x-total-count'])
                    // if you need a action from other modules then dispatch('moduleName/actionToCall', null, {root: true}) the null root thing is the payload
                    commit('SET_TOTALEVENTS', parseInt(response.headers['x-total-count']))
                    commit('SET_EVENTS', response.data) // as long as mutation is inside the module, don't need to worry about namespace, BESTPRAC to not do that
               })
               .catch(error => {
                    // creating an notification object for the error to show the user.
                    const notification = {
                         type: 'error',
                         message: 'There was a problem fetching events: ' + error.message
                    }
                    dispatch('notification/add', notification, { root: true }) // root true is for the dispatcher to route to the correct module, will error without.
               })
     },
     // fetching individual event
     fetchEvent({ commit, getters, dispatch }, id) {
          let event = getters.getEventById(id) // find specific event
          if (event) {
               commit('SET_EVENT', event) // commit mutation if found, else do api call.
               return event // from action return
          } else {
               // promise isn't getting returned so then() is rendered immediatly in EventShow -- add a return in next line.
               return EventService.getEvent(id)
                    .then((response) => {
                         commit('SET_EVENT', response.data)
                         return response.data // action return
                    })
                    .catch((error) => {
                         const notification = {
                              type: 'error',
                              message: 'There was a problem fetching event: ' + error.message
                         }
                         dispatch('notification/add', notification, { root: true }) // root true is for the dispatcher to route to the correct module, will error without.
                    });
          }
     }
}
export const getters = {
     // So i am passing in the sate and then i get the ID which then runs the function.
     getEventById: state => id => {
          // find event id with the event id given.
          return state.events.find(event => event.id === id)
     }
     // For the NExt pagation problem without saving ref header from server.
     // findEndPage: state => {
     //   return state.endPage
     // }

}