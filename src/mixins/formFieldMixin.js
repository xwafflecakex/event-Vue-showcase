export const formFieldMixin = {
     // removes Vue default inheritance so that we can tell where exatly we want to
     // inherite the parents properties.
     inheritAttrs: false,
     props: {
          label: {
               type: String,
               default: ''
          },
          value: [String, Number]
     },
     methods: {
          updateValue(event) {
               // emits the event
               this.$emit('input', event.target.value)
          }
     }
}