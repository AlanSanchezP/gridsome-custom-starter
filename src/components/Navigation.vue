<template>
    <header ref="rootNavbar" class="navigation-bar" v-bind:class="{'navigation-bar--use-hamburger': useHamburger, 'performing-responsive-evaluation': performingResponsiveEvaluation}">
      <g-link to="/" class="navigation-bar__main-logo">
        <g-image src="~/assets/img/logo/logo-full_over-surface.png" 
          alt="Logo accessibility description" 
          title="Logo"/>
      </g-link>
      <button type="button" class="navigation-bar__menu-trigger" @click="showMenu" ref="menuTrigger">
        <font-awesome-icon icon="bars"/>
        <span>Display menu</span>
      </button>
      <div class="navigation-bar__menu-container" v-bind:class="{'navigation-bar__menu-container--visible': showSidebarMenu}"  v-offClick="offClickHandler">
        <button v-if="useHamburger" type="button" class="navigation-bar__close-menu" @click="closeMenu">
          <font-awesome-icon icon="times" />
        </button>
        <g-link v-if="useHamburger" class="navigation-bar__hamburger-logo" to="/">
          <g-image src="~/assets/img/logo/logo-full_over-primary.png" 
            alt="Logo accessibility description"
            title="Logo" />
        </g-link>
        <nav class="navigation-bar__menu" ref="menu">
          <g-link v-for="(route, index) in routes" :key="`route-${index}`"
            :to="route.path"
            :exact="route.matchExact != false"
            class="navigation-bar__menu-link"
            active-class="navigation-bar__menu-link--active">
            {{route.text}}
          </g-link>
        </nav>
      </div>
    </header>
</template>

<script>
import {OffClickHandlerBuilder} from '~/OffClickDirective';

// keys: string using the format w<WIDTH>h<HEIGHT> : w1024h720
const RESOLUTIONS_MAPPING = new Map();
const CALCULATING = -1;
const NOT_USE_HAMBURGER = 0;
const USE_HAMBURGER = 1;

var isSticky = true;

function checkResponsive() {
  if (!this) {
    console.warn("Call this function using checkResponsive.call(this)");
    return;
  }
  const WINDOW_SIZE = `w${window.screen.availWidth}h${window.screen.availHeight}`;
  // This prevents the need to shedule more things than needed
  //  and prevents double checks (onresize triggers more than once for some reason,
  //  at least on developer tools)  
  if (RESOLUTIONS_MAPPING.has(WINDOW_SIZE)) {
    const storedValue = RESOLUTIONS_MAPPING.get(WINDOW_SIZE);
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

  RESOLUTIONS_MAPPING.set(WINDOW_SIZE, CALCULATING);
  this.useHamburger = false;
  this.performingResponsiveEvaluation = true;

  // It's necessary to schedule this so that Vue can update the DOM.
  //  Otherwise, this.$refs.menu.offsetTop value won't update and the check won't work
  this.$nextTick(function scheduledCheck() {
    const childHeight = this.$refs.menu.firstChild.offsetHeight;
    // Check if elements got separated into 2 or more rows.
    //  Using 1.2 factor to allow human-caused margin overflows (?)
    if (this.$refs.menu.offsetHeight > childHeight * 1.2) {
      RESOLUTIONS_MAPPING.set(WINDOW_SIZE, USE_HAMBURGER);
      this.useHamburger = true;
    } else {
      RESOLUTIONS_MAPPING.set(WINDOW_SIZE, NOT_USE_HAMBURGER);
      this.closeMenu();
      this.useHamburger = false;
    }

    this.performingResponsiveEvaluation = false;

    if (isSticky) return;

    // For this to work, it is needed that the next sibling doesn't add
    //  any custom margin-top
    const nextSibling = this.$refs.rootNavbar.nextSibling;
    const navbarHeight = this.$refs.rootNavbar.offsetHeight;
    nextSibling.style.marginTop = `${navbarHeight}px`;
  });
}

export default {
  props: {
    /* Format: {
        path: String,
        matchExact: Boolean | default: true,
        text: String
      }
      DOESN'T SUPPORT EXTERNAL LINKS FOR NOW
    */
    routes: {type: Array, required: true}
  },
  mounted() {
    window.addEventListener('resize', checkResponsive.bind(this), true);
    const navbarPositionType = getComputedStyle(this.$refs.rootNavbar).position;
    isSticky = navbarPositionType === 'sticky';
    // If dispatching right away, something weird happens with menu height
    // FIX: In limit resolutions (~414px it seems), first validation fails and menu crashes
    this.$nextTick(() => window.dispatchEvent(new Event('resize')));
  },
  beforeDestroy() {
    window.removeEventListener('resize', checkResponsive.bind(this), true);
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
      // TODO: Close on ESC key press
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
      performingResponsiveEvaluation: true, // default to true to prevent initial blink
      offClickHandler: new OffClickHandlerBuilder()
                        .setAction(this.closeMenu)
                        .setEvaluator(() => this.useHamburger == this.showSidebarMenu)
                        .ignoreRefName('menuTrigger')
                        .build()
    };
  },
  watch: {
    $route (to, from) {
      this.closeMenu();
    }
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
$thinNavbarHeight = 56px
$desktopScreenBreakpoint = 968px
$desktopScreenNavbarHeight = 78px
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

// TODO: Better management of text sizes
// TODO: Handle different active-link styles, not only bottom-bordered

.navigation-bar
  background $navbarBg
  display flex
  align-items center
  padding 0 18px
  justify-content space-between
  height $thinNavbarHeight
  left 0
  position fixed
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
    font-size 1.5rem
    margin-bottom 5px
    margin-right 8px
    outline none
    padding 5px 15px

  &__menu-trigger
    background transparent
    border none
    display none
    margin 18px 0
    height 20px
    width 20px
    line-height 1.5em
    padding 0
    outline none

    .svg-inline--fa
      color $activeLinkAccent

    span
      font-size 0

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
      right -280px
      top 0
      transition right 0.2s
      width 280px
      padding-top 15px
      padding-bottom 50px
      z-index $hamburgerZindex

      &--visible
        right 0
        box-shadow 0 0 10px $hamburgerShadowColor

    & ^[0]__menu
      margin-top 30px
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
    height min(remify(50), 10vh)

    &:not(^[0]--use-hamburger) &__menu-link
      font-size remify(16)
      height 100%
      line-height min(remify(40), 9vh)
  
    &__menu-container,
    &__menu
      height 100%
</style>