<template>
  <div>
        <h1>Create an Event, {{ user.name }}</h1>
        <p>This was created by {{ user.name }}</p>
        <p>There are {{ catLength }} categories</p>
        <p>The event: {{ getEventById(2) }} </p>

        <ul>
          <li v-for="cat in categories" :key='cat'>{{ cat }}</li>
        </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['getEventById', 'catLength']),
      // the unmapped getters.
      // catLength() {
      //   return this.$store.getters.catLength
      // },
      // getEvent() {
      //   return this.$store.getters.getEventById
      // }
      // the object spread operator
      ...mapState(['user','categories']
      // user: 'user'
      // --The above is a simplified version of state declaration for the below.--
      // userName: state => state.user.name,
      // userID: state => state.user.id,
      // categories: state => state.categories
    )
  }
}
</script>

<style lang="scss" scoped>

</style>