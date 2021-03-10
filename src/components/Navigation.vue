<template>
    <header class="navigation-bar" v-bind:class="{'navigation-bar--use-hamburger': useHamburger, 'performing-responsive-evaluation': performingResponsiveEvaluation}">
      <g-link to="/" class="navigation-bar__main-logo">
        <g-image src="~/assets/img/logo/logo-full.png" 
          alt="Logo accessibility description" 
          title="Logo"/>
      </g-link>
      <button type="button" class="navigation-bar__menu-trigger" @click="showMenu" ref="menuTrigger">
        <font-awesome-icon icon="bars"/>
        <span>Display menu</span>
      </button>
      <div class="navigation-bar__menu-container" v-bind:class="{'navigation-bar__menu-container--visible': showSidebarMenu}"  v-offClick="offClickHandler">
        <g-link class="navigation-bar__hamburger-logo" to="/" @click="closeMenu">
          <g-image src="~/assets/img/logo/logo-full-white.png" 
            alt="Logo accessibility description"
            title="Logo" />
        </g-link>
        <nav class="navigation-bar__menu" ref="menu">
          <g-link to="/" class="navigation-bar__menu-link" active-class="navigation-bar__menu-link--active" exact>Home</g-link>
          <g-link to="/about" class="navigation-bar__menu-link" active-class="navigation-bar__menu-link--active" exact>About</g-link>
          <g-link to="/contact" class="navigation-bar__menu-link" active-class="navigation-bar__menu-link--active" exact>Contact</g-link>
          <g-link to="/items" class="navigation-bar__menu-link" active-class="navigation-bar__menu-link--active">Items</g-link>
          <g-link to="/more" class="navigation-bar__menu-link" active-class="navigation-bar__menu-link--active">More</g-link>
        </nav>
      </div>
    </header>
</template>

<script>
import {OffClickHandlerBuilder} from '~/OffClickDirective';

// keys: string
//  using the format w<WIDTH>h<HEIGHT> : w1024h720
// values: integer
//  -1|0|1 for "unsure but calculating", "not use hamburger" and "use hamburger"
var resolutionsMapping = new Map();

function checkResponsive() {
  if (!this) {
    console.warn("Call this function using checkResponsive.call(this)");
    return;
  }
  var windowSize = `w${window.screen.availWidth}h${window.screen.availHeight}`;

  // This prevents the need to shedule more things than needed
  //  and prevents double checks (onresize triggers more than once for some reason,
  //  at least on developer tools)  
  if (resolutionsMapping.has(windowSize)) {
    let storedValue = resolutionsMapping.get(windowSize);
    if (storedValue === -1) return;
    else if (storedValue === 1) {
      this.useHamburger = true;
    } else {
      this.closeMenu();
      this.useHamburger = false;
    }
    return;
  }

  // Indicate that this resolution is already being handled
  resolutionsMapping.set(windowSize, -1);
  this.useHamburger = false;
  this.performingResponsiveEvaluation = true;
  // TODO: Investigate if this can cause any issues with timeouts from different events

  // It's necessary to schedule this so that Vue can update the DOM.
  //  Otherwise, this.$refs.menu.offsetTop value won't update and the check won't work
  function scheduledCheck() {
    var childHeight = this.$refs.menu.firstChild.offsetHeight;
    // Check if elements got separated into 2 or more rows.
    //  Using 1.2 factor to allow human-caused margin overflows (?)
    if (this.$refs.menu.offsetHeight > childHeight * 1.2) {
      resolutionsMapping.set(windowSize, 1);
      this.useHamburger = true;
    } else {
      resolutionsMapping.set(windowSize, 0);
      this.closeMenu();
      this.useHamburger = false;
    }
    this.performingResponsiveEvaluation = false;
  }

  setTimeout(scheduledCheck.bind(this), 0);
}

export default {
  // TODO: Receive menu links through params
  mounted() {
    checkResponsive.call(this);
    window.addEventListener('resize', checkResponsive.bind(this), true);
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
      performingResponsiveEvaluation: false,
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
$thinNavbarHeight = 56px
$desktopScreenBreakpoint = 968px
$desktopScreenNavbarHeight = 78px

// TODO: Find a better way to handle this marginm-top

body.noscroll
  overflow hidden !important

#main-content
  margin-top $thinNavbarHeight
  @media screen and (min-width: $desktopScreenBreakpoint)
    margin-top $desktopScreenNavbarHeight
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
  top 0
  width 100%
  z-index $navbarZindex
  simple-border('bottom', remify(1), $lightShadowColor)

  &.performing-responsive-evaluation .navigation-bar__menu-container
    opacity 0

.navigation-bar__menu-trigger
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
  
.navigation-bar__menu-container
  flex-grow 1
  text-align right

.navigation-bar__main-logo
  height 63%

  img
    height 100%
    width auto

.navigation-bar__hamburger-logo
  display none
  center-block()
  width 70%

  img
    width 100%

.navigation-bar__menu-link
  line-height $thinNavbarHeight - $activeLinkBorderHeight

.navigation-bar:not(.navigation-bar--use-hamburger)
  .navigation-bar__menu-link
    color $linkColor
    display inline-block
    font-size 1rem
    simple-border('bottom', $activeLinkBorderHeight, transparent)
    padding 0 0.7em

    &:hover, &.navigation-bar__menu-link--active
      simple-border('bottom', $activeLinkBorderHeight, $activeLinkAccent)

.navigation-bar.navigation-bar--use-hamburger
  .navigation-bar__menu-trigger
    display block

  .navigation-bar__menu-container
    background $hamburgerBg
    height 100vh
    margin-right 0
    overflow-y auto
    position fixed
    right -280px
    top 0
    transition right 0.2s
    width 280px
    padding-top 25px
    padding-bottom 50px
    z-index $hamburgerZindex

    &.navigation-bar__menu-container--visible
      right 0
      box-shadow 0 0 10px $hamburgerShadowColor

      .navigation-bar__hamburger-logo
        display block

  .navigation-bar__menu
    margin-top 30px
    text-align left

  .navigation-bar__menu-link
    color $hamburgerLinkColor
    display block
    font-size remify(16)
    line-height 1
    padding 1em 2em
    simple-border('left', $activeLinkBorderWidth, transparent)

    &:hover, &:active, &.navigation-bar__menu-link--active
      background-color $hamburgerLinkBg
      simple-border('left', $activeLinkBorderWidth, $hamburgerActiveLinkAccent)

@media screen and (min-width: $desktopScreenBreakpoint)
  .navigation-bar
    justify-content initial
    height $desktopScreenNavbarHeight
    padding 0 remify(34)

    &:not(.navigation-bar--use-hamburger) .navigation-bar__menu-link
      font-size remify(16)
      line-height $desktopScreenNavbarHeight - $activeLinkBorderHeight
      padding 0 0.7em


@media screen and (min-width: $bigScreenAt)
  .navigation-bar
    height min(remify(50), 10vh)

    &:not(.navigation-bar--use-hamburger) .navigation-bar__menu-link
      font-size remify(16)
      height 100%
      line-height min(remify(40), 9vh)
  
    &__menu-container,
    &__menu
      height 100%

</style>