<template>
  <div class="scroll-for-more">
    <transition name="fade">
    <div class="scroll-for-more__content" title="Scroll for more" v-show="showIndicator"
      @click="scrollToAnchor">
      <span class="screen-reader-only">Scroll for more</span>
      <font-awesome-icon class="scroll-for-more__indicator" :icon="['fas', 'angle-double-right']" />
    </div>
    </transition>
  </div>
</template>

<script>
function toggleIndicatorVisibility(entries, observer) {
  if (!this) {
    console.warn('Call this function using toggleIndicatorVisibility.call(this)');
    return;
  }
  entries.forEach(entry => {
    this.showIndicator = (!entry.isIntersecting && entry.boundingClientRect.top > 0);
  });
}

export default {
  props: {
    // !! Important. Must be an element that is not expected to be replaced
    //  at any point by vue, since IntersectionObserver will be attached to it
    anchorRef: {type: String, required: false, default: null}
  },
  mounted() {
    let options = {
      rootMargin: '0px',
      threshold: 0.25
    };
    this.observer = new IntersectionObserver(toggleIndicatorVisibility.bind(this), options);
    this.observer.observe(this.anchorElement);
  },
  beforeUnmount() {
    this.observer.unobserve(this.anchorElement);
  },
  data() {
    return {
      showIndicator: false
    }
  },
  methods: {
    scrollToAnchor() {
      window.scroll({
        top: this.anchorElement.getBoundingClientRect().top,
        behavior: 'smooth'
      });
    }
  },
  computed: {
    anchorElement() {
      if (this.anchorRef === null) {
        return this.$el;
      }
      var parent;
      if (this.$parent.$options._componentTag === "Layout") {
        parent = this.$parent.$parent;
      } else {
        parent = this.$parent;
      }
      if (parent.$refs[this.anchorRef] === undefined) {
        console.warn(`Reference '${this.anchorRef}' was not found in parent component. Using default element as anchor.`);
        return this.$el;
      }
      return parent.$refs[this.anchorRef];
    }
  }
}
</script>

<style lang="stylus" scoped>
.fade-enter-active,
.fade-leave-active
  transition opacity .5s

.fade-enter,
.fade-leave-to,
.fade-leave-active
  opacity 0

.scroll-for-more
  &__content
    border-radius remify(35)
    bottom remify(15)
    box-shadow 0 0 remify(2) black
    color white
    cursor pointer
    height remify(70)
    left 50%
    position fixed
    transform translateX(-50%)
    transition background-color 0.2s
    width remify(40)
    z-index 30
    simple-border('all', remify(2.5), white)

    &:hover, &:active, &:focus
      background-color white
      color black

      & ^[0]__indicator
        filter none

  &__indicator
    animation-duration 3s
    animation-iteration-count infinite
    animation-name scrollDown
    animation-timing-function ease
    display block
    filter "drop-shadow(0 0 %s black)" % remify(2)
    height remify(28)
    position relative
    transform rotate(90deg)
    width @height
    center-block()

@keyframes scrollDown
  0%
    opacity 0
    top -20%
  
  40%
    opacity 1
    top 8%
  
  50%
    opacity 1
    top 8%

  100%
    opacity 0
    top 70%
</style>