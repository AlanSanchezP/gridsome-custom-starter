<template>
  <div id="app">
    <Navigation />
    <router-view id="main-content"/>
    <footer>
    </footer>
  </div>
</template>

<script>
import Navigation from '~/components/Navigation.vue';

export default {
  components: {
    Navigation
  }
}
</script>

<style lang="stylus" scoped>
#app
  margin 0
  overflow hidden
  padding 0
</style>
