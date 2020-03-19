<template>
  <div class="user">
    <h1>This is a page for {{ username }}</h1>
  </div>
</template>
// allows for modulazation.
<script>
export default {
  props: ['username']
}
</script>
