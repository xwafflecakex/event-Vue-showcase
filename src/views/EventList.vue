<template>
	<div>
		<h1>Events Listing</h1>
		<EventCard v-for="event in events" :key="event.id" :event="event" />
		<!-- prevent printing previous page if on first page -->
		<!-- To get the event list to update and refresh the component page, we can either watch the page computed prop, and call fetch when it chages.
    OR we can reload the componetns when the URL changes, and also the query param. -->
		<template v-if="page != 1">
			<router-link :to="{ name: 'EventList', query: { page: page - 1 } }" rel="prev">
				Previous Page</router-link
			>
		</template>
		<template v-if="endPage2">
			|
		</template>
		<!-- !endPage Computed Value -->
		<template v-if="endPage2">
			<router-link :to="{ name: 'EventList', query: { page: page + 1 } }" rel="next">
				Next Page</router-link
			>
		</template>
	</div>
</template>

<script>
	import EventCard from "@/components/EventCard.vue";
	import { mapState } from "vuex";
	export default {
		components: {
			EventCard,
		},
		// don't need this now cuz of Vuex
		// data() {
		// 	return {
		// 		events: [],
		// 	};
		// },
		created() {
			this.perPage = 3; // Setting perPage here and not in data means it won't be reactive.
			// We don't need it to be reactive, and this way our component has access to it.
			this.$store.dispatch("fetchEvents", {
				perPage: this.perPage,
				page: this.page, //need to get it from the state itself
			});
		},
		computed: {
			page() {
				console.log(this.$route.query.page);
				if (this.events.length == 0) console.log("this.events");
				return parseInt(this.$route.query.page) || 1;
			},
			// Mutation and action way
			endPage2() {
				return this.eventsTotal > this.page * this.perPage;
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
			...mapState(["events", "eventsTotal"]),
		},
	};
</script>
