<template>
  <div id="app">
    <Navigation />
    <router-view id="main-content"/>
    <Footer />
  </div>
</template>

<script>
import Navigation from '~/components/Navigation.vue';
import Footer from '~/components/Footer.vue';

export default {
  components: {
    Navigation,
    Footer
  }
}
</script>

<style lang="stylus" scoped>
#app
  margin 0
  overflow hidden
  padding 0
</style>
