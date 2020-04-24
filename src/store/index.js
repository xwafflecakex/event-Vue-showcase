/*
  Adds the promise polyfill for IE 11
  -- require('es6-promise').polyfill();
  -- npm install es6-promise —save-dev

*/

import Vue from "vue";
import Vuex from "vuex";
// this method of modules allows for better private variables and methods
// The lazy way is to just import name, then export default state, getters...ect.
import * as user from "@/store/modules/user.js"; // import all public items into user namespace so user.state = user: { id: 'abc123', name: 'Simple Man' }
import * as event from "@/store/modules/event.js";
import * as notification from "@/store/modules/notification.js";
// Can also do this eg. import { exampleModule }

// *** ACTIONS, MUTATIONS, GETTERS are always in the global namespace, therfore we can have multiple actions/mutations using the same name.

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    event,
    notification
  },
  state: {
    // 1 of 2 ways.
    //endPage: false,
    // mutation way
    categories: [
      "sustainability",
      "nature",
      "animeal welfare",
      "housing",
      "education",
      "food",
      "community"
    ],
    // passing getters Example
    todos: [
      { id: 1, text: "...", done: true },
      { id: 2, text: "...", done: false },
      { id: 3, text: "...", done: true },
      { id: 4, text: "...", done: false }
    ]
  },
  getters: {
    catLength: state => {
      return state.categories.length;
    },
    doneTodos: state => {
      return state.todos.filter(todo => todo.done);
    },
    // passing the entire getter object in
    activeTodosCount: (state, getters) => {
      return state.todos.length - getters.doneTodos.length;
    }
  }
});
