<template>
  <div class="hello">
    <h1>VueJS <span>Animations</span> and <span>Transitions</span> Tutorial</h1>

    <button
      class="btn btn-primary"
      v-if="!show"
      v-on:click="show = !show"
    >
      Show Mission
    </button>
    <button
      class="btn btn-primary"
      v-if="show && !accepted && !declined"
      v-on:click="accepted = true"
    >
      Accept Mission
    </button>
    <button
      class="btn btn-warning"
      v-if="show && !declined && !accepted"
      v-on:click="declined = true"
    >
      Decline Mission
    </button>

    <div class="cont center-align">
      <transition name="fade">
        <p v-if="show">Your Mission, should you choose to accept it...</p>
      </transition>

      <transition name="fade">
        <p v-if="accepted">
          You have accepted the mission, this message will self-destruct in 5...
        </p>
      </transition>

      <transition name="fade">
        <p v-if="declined">
          You have declined the mission, this message will self-destruct in 5...
        </p>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "Testing Animation",
  data() {
    return {
      show: false,
      accepted: false,
      declined: false
    };
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.btn-primary {
  background-color: #256bfc;
}
.btn-warning {
  background-color: #c81117;
}
.cont {
  background-color: #000;
  width: 100%;
  height: 400px;
  margin-top: 40px;
  padding: 40px;
}

div {
  color: white;
}
h1 {
  font-weight: normal;
  color: white;
  font-weight: 100;
  font-size: 58px;
}
h1 span {
  font-weight: 900;
}
</style>