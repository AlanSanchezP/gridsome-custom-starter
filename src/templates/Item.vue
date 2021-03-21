<template>
   <Layout class="content-collection-item-page">
    <div class="content-collection-item-page__cover cover vertical-center" 
      :style="{'background-image': 'url(' + coverSrc + ')'}">
        <h1 class="page-title content-collection-item-page__title" v-text="$page.item.title"></h1>
    </div>
    <p class="content-collection-item-page__description" v-text="$page.item.description"></p>
    <div class="content-collection-item-page__video">
      <div class="embed-responsive embed-responsive-16by9">
        <iframe :src="$page.item.videoEmbedUrl"></iframe>
      </div>
    </div>
    <g-link to="/items/" class="site-button site-button--default">Aliquam aut deti</g-link>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  item(id: $id) {
    title
    cover
    description
    videoEmbedUrl
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.item.title
    }
  },
  computed: {
    coverSrc() {
      return require(`@images/${this.$page.item.cover}`);
    }
  }
}
</script>

<style lang="stylus" scoped>
.content-collection-item-page
  padding-bottom remify(80)
  text-align center

  &__cover
    height calc(80vh - 95px)
    text-align center
    min-height auto
    padding 20px 0

    @media screen and (orientation: portrait)
      max-height "min(76vh, 500px)" % null

  &__title
    color $inverseTextColor
    font-size remify(34)
    font-weight $_heavy
    text-shadow 0 0 remify(10) $defaultTextColor
    width 90%
    center-block()

  &__description
    background-color $surfaceColor
    border-radius remify(7)
    padding remify(40) remify(30)
    position relative
    text-align left
    top remify(-10)
    width 100%
    center-block()

  &__video
    margin-top 0
    width 90%
    center-block()

.site-button
  margin-top remify(50)
  font-size 1.2rem

@media screen and (min-width: 742px)
  .content-collection-item-page__description
    box-shadow 0 remify(5) remify(2) rgba($defaultTextColor, 0.3)
    margin-bottom 0
    min-width 638px
    top remify(-72)
    width 60%

@media screen and (min-width: 960px)
  .content-collection-item-page__video
    width 70%
</style>