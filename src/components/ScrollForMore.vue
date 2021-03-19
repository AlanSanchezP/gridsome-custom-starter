<template>
  <div class="scroll-for-more">
    <div class="scroll-for-more__content" v-if="showIndicator">
      <span>Scroll for more</span>
      <font-awesome-icon class="scroll-for-more__indicator" :icon="['fas', 'angle-double-right']" />
    </div>
  </div>
</template>

<script>
function checkScrollPosition() {
  if (!this) {
    console.warn("Call this function using checkScrollPosition.call(this)");
    return;
  }

  const elementRect = this.$el.getBoundingClientRect();
  const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  this.showIndicator = elementRect.top >= viewHeight;
}

export default {
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
  }
}
</script>

<style lang="stylus" scoped>
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

    span
      font-size 0

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