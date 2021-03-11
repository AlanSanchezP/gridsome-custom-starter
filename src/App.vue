<template>
  <div id="app">
    <Navigation :routes="navRoutes" />
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
  },
  data() {
    return {
      navRoutes: [
        {
          path: '/',
          text: 'Home'
        }, {
          path: '/about',
          text: 'About'
        }, {
          path: '/contact',
          text: 'Contact'
        }, {
          path: '/items',
          matchExact: false,
          text: 'Items'
        }, {
          path: '/more',
          text: 'More',
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
#app
  margin 0
  overflow hidden
  padding 0
</style>
