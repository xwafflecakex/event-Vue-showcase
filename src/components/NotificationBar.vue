// Displays the notifications
<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`; // so this will give us text-error or text-success
    }
  },
  // creating a timer for notifications
  data() {
    return {
      timeout: null
    };
  },
  // When the component is mounted in the life cycle, we use the JS setTimeout to start the clock and then execute the remove action on the notification when done.
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 5000);
  },
  beforeDestroy() {
    // clearing out the cache timeout data for housekeeping, closes the mem leak, eg. if manual close button added, and closed before timeout, the clock would leak
    clearTimeout(this.timeout);
  },
  methods: mapActions("notification", ["remove"])
};
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
