<template>
  <Layout class="about-page">
    <div class="about-page__cover cover vertical-center simple-parallax">
      <h1 class="page-title about-page__title">Debitis repellendus nam?</h1>
    </div>
    <div class="about-page__introduction">
      <g-image src="~/assets/img/logo/logo.png" alt="Logo" class="about-page__logo" />
      <p>
        <strong>Consectetur</strong> ut inventore nihil libero suscipit fugit velit sapiente laudantium omnis placeat architecto, quia rem iste vel non voluptatum aliquid ea assumenda velit quo tenetur iusto. Quas consequuntur cumque corporis consequatur ipsum sapiente natus labore libero quos ad facere ea ut asperiores, sint, esse consectetur tempora iste exercitationem nulla.
      </p>
    </div>
    <div class="about-page__content">
      <div class="about-page__content-section">
        <g-image src="~/assets/img/logo/logo.png" alt="Accessibility description of photo" title="Photo" class="about-page__content-image"/>
        <p>
          Tempore, quibusdam non fugit animi magnam minus sapiente, saepe consequatur, totam alias inventore molestiae voluptatem voluptates maxime magni! Vel, iure voluptatem nesciunt commodi quod eos qui odio impedit. Excepturi, temporibus.Autem, officia corporis porro est laudantium atque laboriosam soluta cupiditate, illum amet ut optio nam cumque, assumenda illo voluptas possimus eos. Officiis facilis labore modi obcaecati, dolor in soluta expedita.
        </p>
      </div>
      <div class="about-page__content-section">
        <p>
          Dolorum dolores nulla repellat ipsa rerum, explicabo cumque, voluptatum adipisci iusto error ad recusandae, voluptate ullam! Pariatur tempora quasi nesciunt possimus ab. Odio illo autem aperiam saepe provident animi. Qui sit quos perferendis totam natus saepe cupiditate sunt explicabo iste dolor praesentium aspernatur hic odio, repellendus deleniti, vel quam inventore eligendi omnis?
        </p>
        <g-image src="~/assets/img/logo/logo.png" alt="Accessibility description of photo" title="Photo" class="about-page__content-image" />
      </div>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'About us'
  }
}
</script>

<style lang="stylus" scoped>
.about-page
  &__cover
    background-image url('~@/assets/img/logo/logo.png')
    height calc(80vh - 78px)
    min-height auto
    text-align center

    @media screen and (orientation: portrait)
      max-height "min(76vh, 500px)" % null

  &__title
    color $inverseTextColor
    font-size remify(36)
    text-shadow 0 0 remify(10) $defaultTextColor
    width 90%
    center-block()

  &__introduction
    background $inverseTextColor
    border-radius remify(7)
    font-size remify(16)
    line-height 1.31
    max-width 682px
    padding remify(40) 0 remify(20)
    position relative
    transform translateY(remify(-10))
    center-block()

    p
      max-width 506px
      text-align center
      width 90%
      center-block()

  &__logo
    left 50%
    position absolute
    top 0
    transform translate(-50%, -67%)
    width remify(80)

  &__content
    background $lightShadowColor
    max-width 783px
    padding-top remify(30)
    center-block()

    p
      font-size remify(16)
      line-height 1.5

    &-section
      align-items center
      display flex
      flex-direction column
      justify-content center
      text-align center
      width 90%
      center-block()

      &:nth-of-type(1)
        .about-page__content-image
          margin-bottom 2.5rem
          margin-left 0
          max-width 380px
          order 1
          width 100%

      &:nth-of-type(2) 
        padding-bottom remify(108)

        .about-page__content-image
          margin remify(40) remify(100) 0 remify(100)

@media screen and (min-width: 682px)
  .about-page
    &__introduction
      box-shadow 0 remify(5) remify(2) rgba($defaultTextColor, 0.3)
      padding-bottom remify(40)
      padding-top remify(62)
      margin-bottom remify(-30)
      transform translateY(-40%)

    &__title
      margin-bottom 1em

@media screen and (min-width: 783px)
  .about-page
    &__content
      padding-top initial

      &-section
        flex-direction row
        justify-content space-between

        p
          margin 2.5em 0 0 0

        .about-page__content-image
          flex-grow 1

        &:nth-of-type(1) 
          .about-page__content-image
            margin-bottom 0
            margin-left remify(-121)
            margin-right 2rem
            max-width initial
            order 0
            width initial

          p
            flex-basis 70%

        &:nth-of-type(2) 
          .about-page__content-image
            margin-left 3rem
            margin-right remify(-60)

          p
            flex-basis 72%
            margin-left remify(60)
            margin-top remify(80)

@media screen and (min-width: $bigScreenAt)
  .about-page
    &__introduction
      max-width initial
      width 60%

      p
        max-width initial
        width 86%
    &__content
      max-width initial
      width 75%
</style>
