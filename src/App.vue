<template>
  <div id="app">
    <Navigation :routes="navRoutes" />
    <router-view id="main-content"/>
    <Footer :links="footerData.links"
      :social="footerData.social"
      :contact="footerData.contact"
      :address="footerData.address" />
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
  created() {
    this.navRoutes = [
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
    ];
    this.footerData = {
      links: [
        {
          path: '/',
          text: 'Footer link'
        },
        {
          path: '/',
          text: 'Footer link'
        },
        {
          path: '/',
          text: 'Footer link'
        },
        {
          path: '/',
          text: 'Footer link'
        },
        {
          path: '/',
          text: 'Footer link'
        }
      ],
      social: [
        {
          linkTo: '#',
          type: 'facebook'
        },
        {
          linkTo: '#',
          type: 'twitter'
        },
        {
          linkTo: '#',
          type: 'instagram'
        }
      ],
      contact: [
        {
          type: 'phone',
          value: '',
          text: '+0 0000000'
        },
        {
          type: 'phone',
          value: '',
          text: '+0 0000000'
        },
        {
          type: 'mail',
          value: 'hello@test.test'
        }
      ],
      address: 'Company address'
    };
  }
}
</script>

<style lang="stylus" scoped>
#app
  margin 0
  overflow hidden
  padding 0
</style>
