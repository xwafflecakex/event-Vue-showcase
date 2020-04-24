// Creates a notification container for ever new notification
<template>
  <div class="notification-container">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
    <!-- the prop is the :notification -->
  </div>
</template>

<script>
import NotificationBar from "./NotificationBar";
import { mapState } from "vuex";

export default {
  components: {
    NotificationBar
  },
  computed: mapState("notification", ["notifications"]) // get the notification module state
};
</script>

<style scoped>
.notification-container {
  position: fixed;
  bottom: 0;
}
</style>
