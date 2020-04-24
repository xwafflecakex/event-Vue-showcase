export const namespaced = true;

// Notification array
export const state = {
  notifications: []
};

// mutations for the state
let nextId = 1;
export const mutations = {
  PUSH(state, notification) {
    state.notifications.push({
      // adding object destructuring so that when we push a notification object, we can attach an ID to it.
      ...notification,
      id: nextId++
    });
  },
  DELETE(state, notificationToRemove) {
    // removing by filtering out the the notification we are removing into a new array without that one.
    state.notifications = state.notifications.filter(
      notification => notification.id !== notificationToRemove.id // so filter out all notifications that are not with the notification provided.
    );
  }
};
export const actions = {
  add({ commit }, notification) {
    commit("PUSH", notification);
  },
  remove({ commit }, notificationToRemove) {
    commit("DELETE", notificationToRemove);
  }
};
