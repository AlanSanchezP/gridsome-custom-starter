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
        destination: '/',
        text: 'Home'
      }, {
        destination: '/about',
        text: 'About'
      }, {
        destination: '/contact',
        text: 'Contact'
      }, {
        destination: '/items',
        matchExact: false,
        text: 'Items'
      }, {
        destination: '/more',
        text: 'More',
      }
    ];
    this.footerData = {
      links: [
        {
          destination: '/',
          text: 'Footer link'
        },
        {
          destination: '/',
          text: 'Footer link'
        },
        {
          destination: '/',
          text: 'Footer link'
        },
        {
          destination: '/',
          text: 'Footer link'
        },
        {
          destination: '/',
          text: 'Footer link'
        }
      ],
      social: [
        {
          destination: '#',
          type: 'facebook'
        },
        {
          destination: '#',
          type: 'twitter'
        },
        {
          destination: '#',
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
  padding 0
  position relative

#main-content
  overflow-x hidden
  width 100%
</style>
