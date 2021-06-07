<template>
  <div id="app">
    <Navigation :routes="navRoutes" menuSide="left"
      @navbar-height="updateNavbarHeight" ref="navbar">
      <!-- Fixed elements (not inside collapsable menu) -->
      <!-- IMPORTANT: These elements might break on small screens
            and are not styled in any way -->
      <a href="#">
        <font-awesome-icon :icon="['fab', 'whatsapp']" />
        Call us
      </a>
      <a href="#">
        <font-awesome-icon icon="hand-holding-heart" />
        Support us
      </a>
    </Navigation>
    <div class="navbar-sentinel" ref="sentinel"/>
    <router-view id="main-content" ref="router"
      :style="{top: navbarHeightCompensation}"/>
    <Footer :links="footerData.links"
      :social="footerData.social"
      :contact="footerData.contact"
      :address="footerData.address" />
  </div>
</template>

<script>
import Navigation from '~/components/Navigation.vue';
import Footer from '~/components/Footer.vue';
import CustomLink from '~/components/CustomLink.vue';

export default {
  components: {
    Navigation,
    Footer,
    CustomLink
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
  },
  mounted() {
    let options = {
      rootMargin: '0px',
      threshold: 0
    };
    this.observer = new IntersectionObserver(e => this.$refs.navbar.auxIntersectionNotifier(e), options);
    this.observer.observe(this.$refs.sentinel);
  },
  beforeDestroy() {
    this.observer.unobserve(this.$refs.sentinel);
  },
  data() {
    return {
      navbarHeightCompensation: 0
    }
  },
  methods: {
    updateNavbarHeight(height) {
      this.navbarHeightCompensation = `-${height}`;
    }
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

.navbar-sentinel
  position absolute
  z-index -100
</style>
