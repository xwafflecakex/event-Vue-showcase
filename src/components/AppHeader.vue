<template>
  <div>
    <button v-show="loggedIn">Logout</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // this is the input for testing, the button is the output of the component
      loggedIn: false
    };
  }
};
</script>
