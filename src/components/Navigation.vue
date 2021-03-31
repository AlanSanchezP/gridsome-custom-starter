<template>
  <header ref="rootNavbar"
    class="navigation-bar"
    @keyup.esc="closeMenu"
    v-bind:class="{'navigation-bar--use-mobile': useMobile,
      'navigation-bar--mobile-at-left': menuSide == 'left',
      'navigation-bar--mobile-at-right': menuSide == 'right',
      'performing-responsive-evaluation': performingResponsiveEvaluation,
      'still-on-top': stillOnTop,
      'use-transparent': useTransparent}">
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
    <div class="navigation-bar__menu-container"
      v-bind:class="{'navigation-bar__menu-container--visible': showSidebarMenu,
      'navigation-bar__menu-container--sidebar-style': menuType == 'sidebar',
      'navigation-bar__menu-container--fullscreen-style': menuType == 'fullscreen',}"
      v-offClick="offClickHandler">
      <button v-if="useMobile" type="button" class="navigation-bar__close-menu" @click="closeMenu">
        <span class="screen-reader-only">Close menu</span>
        <font-awesome-icon icon="times" />
      </button>
      <g-link v-if="useMobile" class="navigation-bar__hamburger-logo" to="/">
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

  this.$emit('navbar-height', `${this.$el.offsetHeight}px`);
  const VIEWPORT_SIZE = getFormattedViewportSize();
  // This prevents unnecessary changing data status if calculations
  //  have already been done.
  if (this.RESOLUTIONS_MAPPING.has(VIEWPORT_SIZE)) {
    const storedValue = this.RESOLUTIONS_MAPPING.get(VIEWPORT_SIZE);
    if (storedValue === CALCULATING) return;
    else if (storedValue === USE_HAMBURGER) {
      this.useMobile = true;
      this.performingResponsiveEvaluation = false;
    } else {
      this.closeMenu();
      this.useMobile = false;
      this.performingResponsiveEvaluation = false;
    }
    return;
  }

  // If this resolution has not been handled yet, this will trigger
  //  menu ResizeObserver and hide it while calculations are performed.
  this.RESOLUTIONS_MAPPING.set(VIEWPORT_SIZE, CALCULATING);
  this.useMobile = false;
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
    this.useMobile = true;
  } else {
    this.RESOLUTIONS_MAPPING.set(VIEWPORT_SIZE, NOT_USE_HAMBURGER);
    this.closeMenu();
    this.useMobile = false;
  }

  this.performingResponsiveEvaluation = false;
}

function evaluateTransparencyUsage(route) {
  if (!this) {
    console.warn('Call this function using evaluateTransparencyUsage.call(this)');
    return;
  }

  var useTransparentNavbar = false;
  if (route.matched[0].components.default.routerMeta) {
    useTransparentNavbar = route.matched[0].components.default.routerMeta.transparentNavbar;
  }
  this.useTransparent = useTransparentNavbar;

  const routeElem = route.matched[0].instances.default.$el;
  if (useTransparentNavbar) {
    if (!routeElem.classList.contains('force-relative')){
      routeElem.classList.add('force-relative');
    }
  } else {
    if (routeElem.classList.contains('force-relative')){
      routeElem.classList.remove('force-relative');
    }
  }
}

export default {
  props: {
    /* Format: {
        destination: String,
        matchExact: Boolean | default: true,
        text: String
      }
    */
    routes: {type: Array, required: true},
    menuSide: {type: String, default: 'right', validate: v => ['left', 'right'].includes(v)},
    menuType: {type: String, default: 'sidebar', validate: v => ['sidebar', 'fullscreen'].includes(v)}
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
      .setEvaluator(() => this.useMobile == this.showSidebarMenu)
      .ignoreRefName('menuTrigger')
      .build();
    this.auxIntersectionNotifier = (e) => this.stillOnTop = e[0].isIntersecting;
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
    evaluateTransparencyUsage.call(this, this.$route);
  },
  beforeDestroy() {
    this.menuHeightObserver.unobserve(this.$refs.menu);
    this.resizeObserver.unobserve(this.$el);
  },
  methods: {
    showMenu() {
      if (!this.useMobile) return;
      if (this.showSidebarMenu) return;
      if (!document.body.classList.contains('noscroll')){
        document.body.classList.add('noscroll');
      }
      this.showSidebarMenu = true;
    },
    closeMenu() {
      if (!this.useMobile) return;
      if (!this.showSidebarMenu) return;
      this.showSidebarMenu = false;
      if (document.body.classList.contains('noscroll')){
        document.body.classList.remove('noscroll');
      }
    }
  },
  data() {
    return {
      stillOnTop: true,
      useTransparent: false,
      showSidebarMenu: false,
      useMobile: false,
      performingResponsiveEvaluation: true // default to true to prevent initial blink
    };
  },
  watch: {
    $route (to, from) {
      this.closeMenu();
      evaluateTransparencyUsage.call(this, to);
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

.force-relative
  position relative !important
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
  background-color $navbarBg
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
  transition background-color 0.2s, border-color 0.2s
  width 100%
  z-index $navbarZindex
  simple-border('bottom', remify(1), $lightShadowColor)

  &.still-on-top.use-transparent
    background-color transparent
    border-color transparent

  &.performing-responsive-evaluation &__menu-container
    opacity 0

  &__sentinel
    position absolute

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

    .svg-inline--fa
      color $activeLinkAccent
      height remify(20)
      width @height

    ../--mobile-at-left &
      order -2

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

  &:not(^[0]--use-mobile)
    &.still-on-top.use-transparent ^[0]__menu-link
      color white

      &:hover, &--active
        border-color white

    & ^[0]__menu-link
      color $linkColor
      display inline-block
      font-size 1rem
      simple-border('bottom', $activeLinkBorderHeight, transparent)
      padding 0 0.7em

      &:hover, &--active
        simple-border('bottom', $activeLinkBorderHeight, $activeLinkAccent)

  &&--use-mobile
    &.still-on-top.use-transparent ^[0]__menu-trigger .svg-inline--fa
      color white

    & ^[0]__menu-trigger
      display block

    & ^[0]__menu-container
      background $hamburgerBg
      height 100vh
      margin-right 0
      overflow-y auto
      position fixed
      top 0
      transition-timing-function cubic-bezier(0.86, 0, 0.07, 1)
      padding-top remify(15)
      padding-bottom remify(50)
      z-index $hamburgerZindex

      &--sidebar-style
        width "max(25vw, 280px)" % null
        transition right 0.2s, left 0.2s

        ^[0]--mobile-at-left&
          left "min(-25vw, -280px)" % null

          &^[0]__menu-container--visible
            left 0

        ^[0]--mobile-at-right&
          right "min(-25vw, -280px)" % null

          &^[0]__menu-container--visible
            right 0

      &--fullscreen-style
        width 100vw
        left 0
        transition top 0.2s
        top -100vh

        &^[0]__menu-container--visible
          top 0

      &--visible
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
    height $desktopScreenNavbarHeight
    padding 0 remify(34)

    &:not(^[0]--use-mobile) &__menu-link
      font-size remify(16)
      line-height $desktopScreenNavbarHeight - $activeLinkBorderHeight
      padding 0 0.7em

@media screen and (min-width: $bigScreenAt)
  .navigation-bar
    height remify(50)

    &:not(^[0]--use-mobile) &__menu-link
      font-size remify(16)
      height 100%
      line-height remify(50) - $activeLinkBorderHeight
  
    &__menu-container
      height 100%
</style>