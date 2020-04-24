import axios from "axios";
import NProgress from "nprogress";

// Single instance of Axios.
const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  //throw error if API call is longer then 10 seconds
  timeout: 10000
});

/***
 This solution is not so good for multiple API calls. Need a LOADING Vuex module to hold the state when LOADING.
 Templates are also rednered before the API calls are returned.
 On some webpages, it’s not a great user experience to see the page before the data is populated in it reactively. 
You’ll notice when we load up /event/5 (an event that we have to pull from the API) 
that the page loads empty before the data flashes onto the screen 1.5 seconds later.
his is NOT an optimal user experience since the user sees the page broken before they see it working.
Using interceptors for the API Calls we will send the config with the start progress bar command.

apiClient.interceptors.request.use(config => { // Called on request
  NProgress.start()
  return config
})
// No we till say when to finish the progress bar with the responce of the server API Call back
apiClient.interceptors.response.use(response => { // Called on response
  NProgress.done()
  return response
})
// Interceptors are also good for request OAUTH tokens,
// format/filter data
// Catch 401 errors and not Auth responces
 */

export default {
  getEvents(perPage, page) {
    return apiClient.get("/events?_limit=" + perPage + "&_page=" + page);
  },
  // adding another event call
  getEvent(id) {
    return apiClient.get("/events/" + id);
  },
  postEvent(event) {
    return apiClient.post("/events", event);
  }
};
