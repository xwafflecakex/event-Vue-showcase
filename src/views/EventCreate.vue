<template>
	<div>
		<h1>Create an Event, {{ user.user.name }}</h1>
		<!-- THis is used to demonstrate Actions and mutations in Vuex, .prevet to prevent default behaivor eg. reloads -->
		<form class="theForm" @submit.prevent="createEvent">
			<BaseSelect
				label="Select a Category"
				:options="categories"
				v-model="event.category"
				:class="{ error: $v.event.category.$error }"
				@blur="$v.event.category.$touch()"
			/>
			<template v-if="$v.event.category.$error">
				<p v-if="!$v.event.category.required" class="errorMessage">Category is Required.</p>
			</template>

			<h3>Name & describe your event</h3>
			<BaseInput
				class="field"
				label="Title"
				v-model.trim="event.title"
				type="text"
				placeholder="Title"
				:class="{ error: $v.event.title.$error }"
				@blur="$v.event.title.$touch()"
			/>
			<template v-if="$v.event.title.$error">
				<p v-if="!$v.event.title.required" class="errorMessage">Title is required.</p>
			</template>

			<BaseInput
				class="field"
				label="Describtion"
				v-model.trim="event.description"
				type="text"
				placeholder="Describtion"
				:class="{ error: $v.event.description.$error }"
				@blur="$v.event.description.$touch()"
			/>
			<template v-if="$v.event.description.$error">
				<p v-if="!$v.event.description.required" class="errorMessage">Description is required.</p>
			</template>

			<h3>Where is your event?</h3>
			<BaseInput
				class="field"
				label="Location"
				v-model.trim="event.location"
				type="text"
				placeholder="Add an Event Location"
				:class="{ error: $v.event.location.$error }"
				@blur="$v.event.location.$touch()"
			/>
			<template v-if="$v.event.location.$error">
				<p v-if="!$v.event.location.required" class="errorMessage">Location is required.</p>
			</template>

			<h3>When is your event?</h3>
			<div class="field">
				<label>Date</label>
				<datepicker
					v-model="event.date"
					placeholder="Select a date"
					@opened="$v.event.date.$touch()"
					:input-class="{ error: $v.event.date.$error }"
				/>
			</div>
			<template v-if="$v.event.date.$error">
				<p v-if="!$v.event.date.required" class="errorMessage">Date is required.</p>
			</template>

			<BaseSelect
				label="Select a time"
				:options="times"
				v-model.trim="event.time"
				class="field"
				:class="{ error: $v.event.time.$error }"
				@blur="$v.event.time.$touch()"
			/>
			<template v-if="$v.event.time.$error">
				<p v-if="!$v.event.time.required" class="errorMessage">Time is required.</p>
			</template>
			<!-- <input
        type="submit"
        class="button -fill-gradient"
        value="Submit"
      /> -->
			<BaseButton type="submit" buttonClass="-fill-gradient" :disabled="$v.$anyError"
				>Submit</BaseButton
			>
			<p v-if="$v.$anyError" class="errorMessage">Please fill out the required field(s).</p>
		</form>
		<!-- This was demonstarting the store, and getters, Mapping -->
		<br>--------------------------------------------------------------------------------------------------------------------------------------------</br>
		<p class="starter">This was created by {{ user.name }}</p>
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
	import Nprogress from "nprogress";
	import { required } from "vuelidate/lib/validators";

	// If you need to select and pase not so primitive data types like an object, import
	// Libary -- Vue-multiselect and searching

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
				times,
				categories: this.$store.state.categories,
				event: this.createFreshEventObject(),
			};
		},
		validations: {
			event: {
				category: { required },
				title: { required },
				description: { required },
				location: { required },
				date: { required },
				time: { required },
			},
		},
		methods: {
			createEvent() {
        			// validates that all fields inthe form are dirty
        			this.$v.$touch()
        			if (!this.$v.$invalid) {
          			Nprogress.start();
					// now the event only clears when api call responds from the action is returned
					this.$store
						.dispatch("event/createEvent", this.event)
						.then(() => {
							this.$router.push({
								// This will route the user to the newly created event.
								name: "event-show",
								params: { id: this.event.id },
							});
							// resets the event form but only when a new one is posted, however fixed in store js
							this.event = this.createFreshEventObject();
						})
						.catch(() => {
							// catches the error from Vuex
							// and doesn't clear or route the user.
							Nprogress.done();
						});
				}
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
			// catLength() {
			// 	return this.$store.getters.catLength;
			// },
			...mapGetters("event", ["getEventById"]), // one namespace per mapping
			...mapGetters(["activeTodosCount", "catLength"]),
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
	.theForm {
		margin-bottom: 1rem;
	}
	.starter {
		margin-top: 1rem;
	}
</style>
