<template>
  <Layout>
    <h1 class="special-title">Consectetur adipisicing</h1>
    
    <div class="incomplete-box">
      <p>
        Libero, rerum nemo? Autem perferendis facere, laboriosam numquam, sint cumque voluptate atque eum aperiam repellendus eaque saepe recusandae nulla animi ratione optio provident accusantium fuga enim possimus reiciendis iusto et!
        Corporis minima obcaecati nam optio nemo praesentium cupiditate voluptatum.
      </p>
      <p>
        Provident unde magnam repellat laboriosam dolor ab, officiis consequatur odit voluptates labore. Odio, aliquam amet. Consectetur voluptatibus voluptatum natus magni sunt. Unde neque eos recusandae odit! Nostrum molestias sequi quaerat dignissimos sint sapiente doloremque earum iure? Commodi exercitationem quaerat assumenda in sequi molestiae dolorum eum quia, delectus repellat unde magni doloremque.
      </p>
    </div>
    
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Another page'
  }
}
</script>

<style lang="stylus" scoped>
.special-title
  background $primaryThemeColor
  color $inverseTextColor
  padding-bottom remify(94)
  padding-top remify(81)
  text-align center

.incomplete-box
  font-size remify(16)
  line-height 1.38
  margin-bottom remify(40)
  margin-top remify(40)
  max-width 581px
  padding remify(24) remify(30)
  position relative
  width 90%
  simple-border('all', remify(1), $lightShadowColor)
  center-block()

  &::before
    background white
    content ' '
    height 4px
    min-width 30px
    position absolute
    right 5%
    top -2px
    width 9%

  p, &__paragraph
    margin 0

    &:not(:first-child)
      margin-top 1.4em

@media screen and (min-width: $bigScreenAt)
  .incomplete-box
    max-width initial
    width 65vw
</style>