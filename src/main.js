// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import 'normalize.css' // TODO: Remove if using a css framework, those already normalize styles
import 'swiper/css/swiper.min.css'; // TODO: Replace with minimal styles when upgrading to Swiper 6
import {library} from '@fortawesome/fontawesome-svg-core';
import { faBars, faPhoneAlt, faEnvelope, faCircleNotch, 
  faCheck, faTimes, faStar, faRocket, faHandHoldingHeart,
  faUserShield, faComments, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VModal from 'vue-js-modal/dist/ssr.index'; // copied from modal plugin code

import '~/assets/styl/global.styl'
import DefaultLayout from '~/layouts/Default.vue'
import OffClickDirective from '~/OffClickDirective'

library.add(faBars, faPhoneAlt, faEnvelope, faTimes, faWhatsapp,
  faFacebookF, faInstagram, faTwitter, faCircleNotch, faCheck,
  faStar, faRocket, faUserShield, faComments, faAngleDoubleRight,
  faHandHoldingHeart);

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);
  Vue.component('font-awesome-icon', FontAwesomeIcon);
  Vue.directive('offClick', OffClickDirective);

  // copied from modal plugin code
  if (isClient) {
    const { default: VModal } = require('vue-js-modal');
    Vue.use(VModal, {dynamic: true, injectModalsContainer: true});
  }
}
