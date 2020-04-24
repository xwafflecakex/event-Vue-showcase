<template>
  <div>
    <!-- so the first user is the module name and the second is the State -->
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <!-- prevent printing previous page if on first page -->
    <!-- To get the event list to update and refresh the component page, we can either watch the page computed prop, and call fetch when it chages.
    OR we can reload the componetns when the URL changes, and also the query param. -->
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
      >
        Previous Page</router-link
      >
      |
    </template>
    <template v-if="endPage2">
      |
    </template>
    <!-- !endPage Computed Value -->
    <template v-if="endPage2">
      <router-link
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
      >
        Next Page</router-link
      >
    </template>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import { mapState } from "vuex";
import store from "@/store/index.js";

function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page || 1);
  store
    .dispatch("event/fetchEvents", {
      page: currentPage
    })
    .then(() => {
      // pass it into the component as a prop, so we can print next pages
      routeTo.params.page = currentPage;
      next();
    });
}

export default {
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    EventCard
  },
  // progress bar at component creation
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next);
  },
  // to do the progress bar during pagation
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next);
  },

  // don't need this now cuz of Vuex
  // data() {
  // 	return {
  // 		events: [],
  // 	};
  // },
  /*
  created() {
    this.perPage = 3; // Setting perPage here and not in data means it won't be reactive.
    // We don't need it to be reactive, and this way our component has access to it. moving it to the state.
    this.$store.dispatch("event/fetchEvents", {
      perPage: this.perPage,
      page: this.page //need to get it from the state itself
    });
  },
  */
  computed: {
    // don't need sinve Route Guard
    //     page() {
    //       console.log(this.$route.query.page);
    //       if (this.event.events.length == 0) console.log("this.events");
    //       return parseInt(this.$route.query.page) || 1;
    //     },
    // Mutation and action way
    endPage2() {
      return this.event.eventsTotal > this.page * this.event.perPage; // event is added cuz its through the state
    },
    // This is a way to remove next page without knowing the servers header reference and without actions and mutations.
    // endPage() {
    // 	if (this.events.length == 0) {
    // 		console.log("this.events");
    // 		return true;
    // 	} else {
    // 		return false;
    // 	}
    // },
    // don't forget to MAP the thing you need from state
    ...mapState(["event", "user"])
  }
};
</script>
