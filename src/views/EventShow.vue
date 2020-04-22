<template>
  <div>
    <div class="event-header">
      <span class="eyebrow">@{{ event.time }} on {{ event.date }}</span>
      <h1 class="title">{{ event.title }}</h1>
      <h5>Organized by {{ event.organizer ? event.organizer.name : "" }}</h5>
      <h5>Category: {{ event.category }}</h5>
    </div>

    <BaseIcon name="map">
      <h2>Location</h2>
    </BaseIcon>

    <address>{{ event.location }}</address>

    <h2>Event details</h2>
    <p>{{ event.description }}</p>

    <h2>
      Attendees
      <span class="badge -fill-gradient">{{ event.attendees ? event.attendees.length : 0 }}</span>
      <!-- fix init null into a error fix-->
    </h2>
    <ul class="list-group">
      <li
        v-for="(attendee, index) in event.attendees"
        :key="index"
        class="list-item"
      >
        <b>{{ attendee.name }}</b>
      </li>
    </ul>
  </div>
</template>
<script>
//-- Can remove all Vuex form the Component since we are handling it as a prop through the router instead.
// import { mapState, mapActions } from "vuex";
// import store from "@/store/index.js";
// import Nprogress from "nprogress";
export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  }
  //--------- not global router hooks.
  //   beforeRouteEnter(routeTo, routeFrom, next) {
  //     Nprogress.start();
  //     // no acess to "this" yet. Use Store
  //     store.dispatch("event/fetchEvent", routeTo.params.id).then(() => {
  //       // when API returnes from the Promise.
  //       Nprogress.done();
  //       next(); // to continue navigation
  //     });
  //   },
  // irrelevent thanks to Route Guards
  //   created() {
  //     this.fetchEvent(this.id);
  //   },
  //   methods: mapActions("event", ["fetchEvent"]), or  cuz namespace event/fetchEvent
  // map to an object event so that i don't have to change the event.event.time...ect
  //   computed: mapState({
  //     event: state => state.event.event
  //   })
};
</script>
<style scoped>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>
