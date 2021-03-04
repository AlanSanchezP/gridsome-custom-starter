<template>
  <div class="content-collection-item-modal__body">
    <g-image :src="thumbnailSrc" 
      class="content-collection-item-modal__thumbnail cover"
      alt="Thumbnail picture"
      title="Thumbnail picture" aria-hidden="true" />
    <div class="content-collection-item-modal__data">
      <h3 class="content-collection-item-modal__title"> {{ item.title }} </h3>
      <p class="content-collection-item-modal__description">{{ item.description }}</p>
      <a class="site-button site-button--default" href="#">Possimus totam!</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    thumbnailSrc() {
      return require('~/assets/' + this.item.thumbnail.replace('~/assets/', ''));
    }
  }
}
</script>

<style lang="stylus" scoped>
.site-button
  font-size 1.1em

.content-collection-item-modal
  &__body
    background white
    display flex
    flex-direction column

  &__title
    font-weight $heavy
    font-size remify(25)

  &__thumbnail
    width 100%
    height 60vw
    max-height 60vh
    order 1

  &__data
    flex-basis 100%
    text-align center
    padding remify(23) remify(26) remify(18) remify(30)

  &__description
    color $gray1
    font-weight $medium
    line-height 1.5
    margin-top remify(12)

@media screen and (min-width: 821px)
  .content-collection-item-modal
    &__body
      flex-direction row
      max-height remify(320)

    &__data
      flex-grow 1
      text-align left
      overflow scroll

    &__thumbnail
      flex-basis 60%
      order initial
      height auto
      max-height initial
      width 0

</style>