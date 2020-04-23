<template>
  <div>
    <label v-if='label'>{{ label }}</label>
    <select
      v-bind="$attrs"
      :value="value"
      @input="updateValue"
    >
      <option
        v-for="option in options"
        :key="option"
        :selected="option === value"
      >{{ option }}
      </option>

    </select>
  </div>
</template>

<script>
export default {
  // removes Vue default inheritance so that we can tell where exatly we want to
  // inherite the parents properties.
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      default: ""
    },
    // for the Sugar Syntax to recive/send a value
    value: [String, Number]
  },
  methods: {
    updateValue(event) {
      //emits the event being created and the input value
      this.$emit("input", event.target.value);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>