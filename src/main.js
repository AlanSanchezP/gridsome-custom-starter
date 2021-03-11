// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import 'normalize.css' // TODO: Remove if using a css framework, those already normalize styles
import 'swiper/css/swiper.min.css'; // TODO: Replace with minimal styles when upgrading to Swiper 6
import {library} from '@fortawesome/fontawesome-svg-core';
import { faBars, faPhoneAlt, faEnvelope, faCircleNotch, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VModal from 'vue-js-modal';

import '~/assets/styl/global.styl'
import DefaultLayout from '~/layouts/Default.vue'
import OffClickDirective from '~/OffClickDirective'

library.add(faBars, faPhoneAlt, faEnvelope, faTimes,
  faFacebookF, faInstagram, faTwitter, faCircleNotch, faCheck);

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);
  Vue.component('font-awesome-icon', FontAwesomeIcon);
  Vue.use(VModal);
  Vue.directive('offClick', OffClickDirective);
}
