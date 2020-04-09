<template>
	<div>
		<h1>Create an Event, {{ user.user.name }}</h1>
		<!-- THis is used to demonstrate Actions and mutations in Vuex, .prevet to prevent default behaivor eg. reloads -->
		<form @submit.prevent="createEvent">
			<label>Select a category</label>
			<select v-model="event.category">
				<option v-for="cat in categories" :key="cat">{{ cat }}</option>
			</select>
			<h3>Name & describe your event</h3>
			<div class="field">
				<label>Title</label>
				<input v-model="event.title" type="text" placeholder="Add an event title" />
			</div>
			<div class="field">
				<label>Description</label>
				<input v-model="event.description" type="text" placeholder="Add a description" />
			</div>
			<h3>Where is your event?</h3>
			<div class="field">
				<label>Location</label>
				<input v-model="event.location" type="text" placeholder="Add a location" />
			</div>
			<h3>When is your event?</h3>
			<div class="field">
				<label>Date</label>
				<datepicker v-model="event.date" placeholder="Select a date" />
			</div>
			<div class="field">
				<label>Select a time</label>
				<select v-model="event.time">
					<option v-for="time in times" :key="time">{{ time }}</option>
				</select>
			</div>
			<input type="submit" class="button -fill-gradient" value="Submit" />
		</form>
		<!-- This was demonstarting the store, and getters, Mapping -->
		<p>This was created by {{ user.name }}</p>
		<p>Number of active TODO's: {{ activeTodosCount }}</p>
		<p>The list of TODOS:</p>
		<ul>
			<!-- - So to fix the key index issue, you can either do this and have a key, or if it's simple leave of ":key" - -->
			<li v-for="(todo, idx) in todos" :key="idx">
				{{ todo }}
			</li>
		</ul>
		<p>There are {{ catLength }} categories</p>
		<p>The event: {{ getEventById(1) }}</p>

		<ul>
			<li v-for="(cat, catidx) in categories" :key="catidx">{{ cat }}</li>
		</ul>
	</div>
</template>

<script>
	import { mapState, mapGetters } from "vuex";
	import Datepicker from "vuejs-datepicker";
	export default {
		components: {
			Datepicker,
		},
		data() {
			const times = [];
			for (let i = 1; i <= 24; i++) {
				times.push(i + ":00");
			}
			return {
				// THis event method will input all the fields which will allow to clear the event object.
				event: this.createFreshEventObject(),
				times,
				categories: this.$store.state.categories,
			};
		},
		methods: {
			createEvent() {
				// now the event only clears when api call responds from the action is returned
				this
					.dispatch("event/createEvent", this.event)
					.then(() => {
						this.$router.push({
							// This will route the user to the newly created event.
							name: "event-show",
							params: { id: this.event.id },
						});
						this.event = this.createFreshEventObject(); // resets the event form but only when a new one is posted, however fixed in store js
					})
					.catch(() => {
						console.log("There was a problem uploading your event");
					});
			},
			createFreshEventObject() {
				const user = this.$store.state.user.user;
				const id = Math.floor(Math.random() * 100000); // rand id for each event created
				return {
					category: "",
					organizer: user,
					title: "",
					description: "",
					location: "",
					date: "",
					time: "",
					attendees: [],
				};
			},
		},
		computed: {
			...mapGetters("event", ["getEventById", "catLength", "activeTodosCount"]),
			// the unmapped getters.
			// catLength() {
			//   return this.$store.getters.catLength
			// },
			// getEvent() {
			//   return this.$store.getters.getEventById
			// }
			// the object spread operator
			...mapState(
				["user", "todos"]
				// user: 'user'
				// --The above is a simplified version of state declaration for the below.--
				// userName: state => state.user.name,
				// userID: state => state.user.id,
				// categories: state => state.categories
			),
		},
	};
</script>

<style scoped>
	.field {
		margin-bottom: 24px;
	}
</style>
