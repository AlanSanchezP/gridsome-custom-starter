<template>
  <article class="content-collection-item">
    <g-image :src="thumbnailSrc" 
      class="content-collection-item__thumbnail cover"
      alt="Thumbnail picture"
      title="Thumbnail picture" aria-hidden="true" />
    <div class="content-collection-item__title vertical-center">
      <span class="content-collection-item__title-span">{{item.title}}</span>
    </div>
  </article>
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

<style>
/* TODO: Evaluate if collection item styles are ok being global 
    or should be put here. */
</style>