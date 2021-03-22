<template>
  <div class="scroll-for-more">
    <transition name="fade">
    <div class="scroll-for-more__content" v-show="showIndicator"
      @click="scrollToAnchor">
      <span class="screen-reader-only">Scroll for more</span>
      <font-awesome-icon class="scroll-for-more__indicator" :icon="['fas', 'angle-double-right']" />
    </div>
    </transition>
  </div>
</template>

<script>
function checkScrollPosition() {
  if (!this) {
    console.warn("Call this function using checkScrollPosition.call(this)");
    return;
  }
  const anchorElementRect = this.anchorElement.getBoundingClientRect();
  const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  this.showIndicator = anchorElementRect.top >= viewHeight;
}

export default {
  props: {
    anchorRef: {type: String, required: false, default: null}
  },
  created() {
    this.forceEvaluation = checkScrollPosition.bind(this);
  },
  mounted() {
    window.addEventListener('scroll', this.forceEvaluation, true);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.forceEvaluation, true);
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
    color white
    height remify(70)
    left 50%
    position fixed
    transform translateX(-50%)
    width remify(40)
    z-index 30
    simple-border('all', remify(2.5), white)

  &__indicator
    animation-duration 3s
    animation-iteration-count infinite
    animation-name scrollDown
    animation-timing-function ease
    display block
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