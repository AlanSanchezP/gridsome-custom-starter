<template>
  <header ref="rootNavbar"
    class="navigation-bar"
    @keyup.esc="closeMenu"
    v-bind:class="{'navigation-bar--use-hamburger': useHamburger, 'performing-responsive-evaluation': performingResponsiveEvaluation}">
    <g-link to="/" class="navigation-bar__main-logo">
      <g-image src="~/assets/img/logo/logo-full_over-surface.png"
        alt="Logo accessibility description"
        title="Logo"
        width="374px"
        height="121px"/>
    </g-link>
    <button type="button" class="navigation-bar__menu-trigger" @click="showMenu" ref="menuTrigger">
      <span class="screen-reader-only">Display menu</span>
      <font-awesome-icon icon="bars"/>
    </button>
    <div class="navigation-bar__menu-container" v-bind:class="{'navigation-bar__menu-container--visible': showSidebarMenu}"  v-offClick="offClickHandler">
      <button v-if="useHamburger" type="button" class="navigation-bar__close-menu" @click="closeMenu">
        <span class="screen-reader-only">Close menu</span>
        <font-awesome-icon icon="times" />
      </button>
      <g-link v-if="useHamburger" class="navigation-bar__hamburger-logo" to="/">
        <g-image src="~/assets/img/logo/logo-full_over-primary.png"
          alt="Logo accessibility description"
          title="Logo"
          width="374px"
          height="121px" />
      </g-link>
      <nav class="navigation-bar__menu" ref="menu">
        <CustomLink v-for="(route, index) in routes" :key="`route-${index}`"
          :destination="route.destination"
          :exact="route.matchExact != false"
          class="navigation-bar__menu-link"
          active-class="navigation-bar__menu-link--active">
          {{route.text}}
        </CustomLink>
      </nav>
    </div>
  </header>
</template>

<script>
import {OffClickHandlerBuilder} from '~/OffClickDirective';
import CustomLink from './CustomLink';

const CALCULATING = -1;
const NOT_USE_HAMBURGER = 0;
const USE_HAMBURGER = 1;

function getFormattedViewportSize() {
  return `w${window.innerWidth}h${window.innerHeight}`;
}

function checkResponsive() {
  if (!this) {
    console.warn("Call this function using checkResponsive.call(this)");
    return;
  }
  const VIEWPORT_SIZE = getFormattedViewportSize();
  // This prevents unnecessary changing data status if calculations
  //  have already been done.
  if (this.RESOLUTIONS_MAPPING.has(VIEWPORT_SIZE)) {
    const storedValue = this.RESOLUTIONS_MAPPING.get(VIEWPORT_SIZE);
    if (storedValue === CALCULATING) return;
    else if (storedValue === USE_HAMBURGER) {
      this.useHamburger = true;
      this.performingResponsiveEvaluation = false;
    } else {
      this.closeMenu();
      this.useHamburger = false;
      this.performingResponsiveEvaluation = false;
    }
    return;
  }

  // If this resolution has not been handled yet, this will trigger
  //  menu ResizeObserver and hide it while calculations are performed.
  this.RESOLUTIONS_MAPPING.set(VIEWPORT_SIZE, CALCULATING);
  this.useHamburger = false;
  this.performingResponsiveEvaluation = true;

  /*  Removed code: Uncomment if IE support is needed
    if (this.isSticky) return;

    // For this to work, it is needed that the next sibling doesn't add
    //  any custom margin-top
    const nextSibling = this.$refs.rootNavbar.nextSibling;
    const navbarHeight = this.$refs.rootNavbar.offsetHeight;
    nextSibling.style.marginTop = `${navbarHeight}px`;
  */
}

function checkMenuHeight() {
  if (!this) {
    console.warn('Call this function using checkMenuHeight.call(this)');
    return;
  }

  const VIEWPORT_SIZE = getFormattedViewportSize();

  if (!this.RESOLUTIONS_MAPPING.has(VIEWPORT_SIZE)) {
    console.warn(`Resolution ${VIEWPORT_SIZE} has not been initialized in map.`);
    return;
  }
  if (this.RESOLUTIONS_MAPPING.get(VIEWPORT_SIZE) !== CALCULATING) {
    if (this.lastEvaluatedResolution === VIEWPORT_SIZE &&
      this.RESOLUTIONS_MAPPING.get(VIEWPORT_SIZE) === NOT_USE_HAMBURGER) {
      // For some weird reason, sometimes flex container crashes
      //  AFTER initial evaluation is performed, causing it to mark the resolution
      //  as hamburger-friendly, thus displaying a normal (buggy) menu.
      console.warn('Resolution didn\'t change, but menu size did. Re-evaluating');
    } else {
      return;
    }
  }

  this.lastEvaluatedResolution = VIEWPORT_SIZE;
  const childHeight = this.$refs.menu.firstChild.offsetHeight;
  // Check if elements got separated into 2 or more rows.
  //  Using 1.2 factor to allow human-caused margin overflows (?)
  if (this.$refs.menu.offsetHeight > childHeight * 1.2) {
    this.RESOLUTIONS_MAPPING.set(VIEWPORT_SIZE, USE_HAMBURGER);
    this.useHamburger = true;
  } else {
    this.RESOLUTIONS_MAPPING.set(VIEWPORT_SIZE, NOT_USE_HAMBURGER);
    this.closeMenu();
    this.useHamburger = false;
  }

  this.performingResponsiveEvaluation = false;
}

export default {
  props: {
    /* Format: {
        destination: String,
        matchExact: Boolean | default: true,
        text: String
      }
    */
    routes: {type: Array, required: true}
  },
  created() {
    /*  Removed code: Uncomment if IE support is needed
      this.isSticky = true;
    */
    // keys: string using the format w<WIDTH>h<HEIGHT> : w1024h720
    this.RESOLUTIONS_MAPPING = new Map();
    this.lastEvaluatedResolution = undefined;
    this.offClickHandler= new OffClickHandlerBuilder()
      .setAction(this.closeMenu)
      .setEvaluator(() => this.useHamburger == this.showSidebarMenu)
      .ignoreRefName('menuTrigger')
      .build();
  },
  mounted() {
    /*  Removed code: Uncomment if IE support is needed
      const navbarPositionType = getComputedStyle(this.$refs.rootNavbar).position;
      this.isSticky = (navbarPositionType === 'sticky');
    */
    this.resizeObserver = new ResizeObserver(checkResponsive.bind(this));
    this.resizeObserver.observe(this.$el);
    this.menuHeightObserver = new ResizeObserver(checkMenuHeight.bind(this));
    this.menuHeightObserver.observe(this.$refs.menu);
  },
  beforeDestroy() {
    this.menuHeightObserver.unobserve(this.$refs.menu);
    this.resizeObserver.unobserve(this.$el);
  },
  methods: {
    showMenu() {
      if (!this.useHamburger) return;
      if (this.showSidebarMenu) return;
      if (!document.body.classList.contains('noscroll')){
        document.body.classList.add('noscroll');
      }
      this.showSidebarMenu = true;
    },
    closeMenu() {
      if (!this.useHamburger) return;
      if (!this.showSidebarMenu) return;
      this.showSidebarMenu = false;
      if (document.body.classList.contains('noscroll')){
        document.body.classList.remove('noscroll');
      }
    }
  },
  data() {
    return {
      showSidebarMenu: false,
      useHamburger: false,
      performingResponsiveEvaluation: true // default to true to prevent initial blink
    };
  },
  watch: {
    $route (to, from) {
      this.closeMenu();
    }
  },
  components: {
    CustomLink
  }
}
</script>

<style lang="stylus">
body.noscroll
  overflow hidden !important
</style>

<style lang="stylus" scoped>
/* $primaryThemeColor and $defaultTextColor are global variables. 
    This might throw an error if those variables do not exist.
 */
$thinNavbarHeight = remify(56)
$desktopScreenBreakpoint = 968px
$desktopScreenNavbarHeight = remify(78)
$navbarBg = white
$navbarZindex = 12
$hamburgerZindex = 16

// Not-hamburger
$activeLinkBorderHeight = remify(4)
$activeLinkAccent = $primaryThemeColor
$linkColor = $defaultTextColor
// Hamburger
$activeLinkBorderWidth = remify(4)
$hamburgerBg = $activeLinkAccent
$hamburgerLinkColor = white
$hamburgerLinkBg = lightness($hamburgerBg, 30%)
$hamburgerActiveLinkAccent = white
$hamburgerShadowColor = $defaultTextColor

// TODO: Handle different active-link styles, not only bottom-bordered

.navigation-bar
  background $navbarBg
  display flex
  align-items center
  padding 0 remify(18)
  justify-content space-between
  height $thinNavbarHeight
  left 0
  /*  Removed code: Uncomment if IE support is needed
    position fixed
  */
  position sticky
  top 0
  width 100%
  z-index $navbarZindex
  simple-border('bottom', remify(1), $lightShadowColor)

  &.performing-responsive-evaluation &__menu-container
    opacity 0

  &__close-menu
    background none
    border none
    color $inverseTextColor
    margin-bottom remify(5)
    margin-right remify(12)
    margin-top remify(3)
    outline none

    .svg-inline--fa
      height remify(20)
      width @height

  &__menu-trigger
    background transparent
    border none
    display none
    outline none
    padding 0
    position absolute
    right remify(18)
    top 50%
    transform translateY(-50%)

    .svg-inline--fa
      color $activeLinkAccent
      height remify(20)
      width @height

  &__menu-container
    flex-grow 1
    text-align right

  &__main-logo
    height 63%

    img
      height 100%
      width auto

  &__hamburger-logo
    display block
    width 70%
    center-block()

    img
      width 100%

  &__menu-link
    line-height $thinNavbarHeight - $activeLinkBorderHeight

  &:not(^[0]--use-hamburger)
    & ^[0]__menu-link
      color $linkColor
      display inline-block
      font-size 1rem
      simple-border('bottom', $activeLinkBorderHeight, transparent)
      padding 0 0.7em

      &:hover, &--active
        simple-border('bottom', $activeLinkBorderHeight, $activeLinkAccent)

  &&--use-hamburger
    & ^[0]__menu-trigger
      display block

    & ^[0]__menu-container
      background $hamburgerBg
      height 100vh
      margin-right 0
      overflow-y auto
      position fixed
      right "min(-25vw, -280px)" % null
      top 0
      transition right 0.2s
      transition-timing-function cubic-bezier(0.86, 0, 0.07, 1)
      padding-top remify(15)
      padding-bottom remify(50)
      width "max(25vw, 280px)" % null
      z-index $hamburgerZindex

      &--visible
        right 0
        box-shadow 0 0 remify(10) $hamburgerShadowColor

    & ^[0]__menu
      margin-top remify(30)
      text-align left

    & ^[0]__menu-link
      color $hamburgerLinkColor
      display block
      font-size remify(16)
      line-height 1
      padding 1em 2em
      simple-border('left', $activeLinkBorderWidth, transparent)

      &:hover, &:active, &--active
        background-color $hamburgerLinkBg
        simple-border('left', $activeLinkBorderWidth, $hamburgerActiveLinkAccent)

@media screen and (min-width: $desktopScreenBreakpoint)
  .navigation-bar
    justify-content initial
    height $desktopScreenNavbarHeight
    padding 0 remify(34)

    &:not(^[0]--use-hamburger) &__menu-link
      font-size remify(16)
      line-height $desktopScreenNavbarHeight - $activeLinkBorderHeight
      padding 0 0.7em

@media screen and (min-width: $bigScreenAt)
  .navigation-bar
    height remify(50)

    &:not(^[0]--use-hamburger) &__menu-link
      font-size remify(16)
      height 100%
      line-height remify(50) - $activeLinkBorderHeight
  
    &__menu-container
      height 100%
</style>