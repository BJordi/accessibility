<template lang="pug">
  .new-container
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'new',
  components: {
    Navbar
  }
}
</script>

<style lang="scss" scoped>
@import 'src/scss/commons/miscellaneous';

.new-container {
  @extend .main-container;
  background: url('../assets/green-plain.jpg') no-repeat center center;
}
</style>
