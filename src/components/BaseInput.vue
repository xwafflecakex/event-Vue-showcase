<template>
	<div>
		<label v-if="label">{{ label }}</label>
		<input v-bind="$attrs" :value="value" v-on="listeners" @input="updateValue" />
	</div>
</template>

<script>
	export default {
		// removes Vue default inheritance so that we can tell where exatly we want to
		// inherite the parents properties.
		inheritAttrs: false,
		props: {
			label: {
				type: String,
				default: "",
			},
			// for the Sugar Syntax to recive/send a value
			value: [String, Number],
		},
		methods: {
			updateValue(event) {
				//emits the event being created and the input value
				this.$emit("input", event.target.value);
			},
		},
		computed: {
			listeners() {
				return {
					// use both listeners but only return the title text as value
					...this.$listeners,
					input: this.updateValue,
				};
			},
		},
	};
</script>

<style lang="scss" scoped></style>
