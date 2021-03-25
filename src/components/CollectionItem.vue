<template>
  <article class="content-collection-item">
    <g-link :to="useLink ? item.path : null" 
      :is="useLink ? 'g-link' : 'div'"
      :role="useLink ? null : 'button'">
      <g-image :src="thumbnailSrc" 
        class="content-collection-item__thumbnail cover"
        alt="Thumbnail picture"
        title="Thumbnail picture" aria-hidden="true" />
      <div class="content-collection-item__title vertical-center">
        <span class="content-collection-item__title-span">{{item.title}}</span>
      </div>
    </g-link>
  </article>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    },
    useLink: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    thumbnailSrc() {
      return require(`!!assets-loader?width=1000&quality=100&fit=cover!@images/${this.item.thumbnail}`);
    }
  }
}
</script>

<style lang="stylus" scoped>
.content-collection-item
  background $lightShadowColor
  color $defaultTextColor
  cursor pointer
  max-width 363px
  flex-basis 100%
  margin-top remify(40)

  & > a
    color inherit
    display block

  &__title
    font-size remify(19)
    padding 0.5em 0.4em
    font-weight $_medium
    min-height 4em
    text-align center

    &-span
      width 90%

  &__thumbnail
    height remify(266)
    width 100%

  @media screen and (min-width: $bigScreenAt)
      max-width 30vw
</style>