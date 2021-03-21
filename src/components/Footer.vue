<template>
  <footer class="site-footer">
      <g-link to="/" class="site-footer__logo">
        <g-image src="~/assets/img/logo/logo-full_over-primary.png" 
          alt="Accesibility description of logo" 
          title="Logo"
          width="548px"
          height="177px"/>
      </g-link>
      <div class="site-footer__links">
        <g-link v-for="(item, index) in links" :key="`link-${index}`"
            :to="item.path"
            class="site-footer__link-item"
            v-text="item.text" />
      </div>
      <div class="site-footer__social">
        <a v-for="(item, index) in social"
          class="site-footer__social-item"
          target="_blank"
          :key="`social-${index}`"
          :href="item.linkTo"
          :title="'Contact us at ' + item.type" >
          <font-awesome-icon :icon="['fab', 'facebook-f']" v-if="item.type == 'facebook'" />
          <font-awesome-icon :icon="['fab', 'twitter']" v-else-if="item.type == 'twitter'" />
          <font-awesome-icon :icon="['fab', 'instagram']" v-else-if="item.type == 'instagram'" />
        </a>
      </div>
      <div class="site-footer__contact">
        <a v-for="(item, index) in contact"
          class="site-footer__link-item"
          :key="`contact-${index}`"
          :href="(item.type == 'phone' ? 'tel:' : 'mailto:') + item.value" >
          <font-awesome-icon :icon="(item.type == 'phone' ? 'phone-alt' : 'envelope')" />
          {{ item.text != undefined ? item.text : item.value }}
        </a>
      </div>
    <address class="site-footer__address" v-text="address" />
  </footer>
</template>

<script>
export default {
    // TODO: Make it dynamic via params
    props: {
      /* Format: {
          path: String,
          text: String
        }
        DOESN'T SUPPORT EXTERNAL LINKS FOR NOW
      */
      links: {type: Array, default: () => []},
      /* Format: {
          linkTo: String,
          type: String [ facebook | twitter | instagram] TODO: Support more
        }
      */
      social: {type: Array, default: () => []},
      /* Format: {
          value: String,
          text: String (optional),
          type: String [ phone | mail ] TODO: Support more,
        }
      */
      contact: {type: Array, default: () => []},
      address: {type: String, default: 'Company Address'}
    }
}
</script>

<style lang="stylus" scoped>
.site-footer
  align-items center
  display grid
  grid-template-areas "logo" \
                  "links" \
                  "contact" \
                  "social" \
                  "bottom"
  grid-row-gap remify(40)
  background $primaryThemeColor
  color white
  padding remify(54) 5vw remify(58) 5vw
  text-align center
  font-size remify(16)

  &__logo
    grid-area logo
    justify-self center
    width auto

    img
      width remify(140)

  &__link-item
    color white
    display block
    line-height 1.96
    transition opacity 0.2s

    &:hover
      opacity 0.8

  &__links
    grid-area links

  &__social
    grid-area social
    align-self center

  &__social-item
    background-color transparent
    color white
    display inline-block
    line-height 2.1em
    height remify(35)
    width remify(35)
    margin 0 remify(5)
    transition background-color 0.2s
    simple-border('all', remify(1), white)

    &:hover
      background-color white
      color $primaryThemeColor

  &__contact
    grid-area contact

  &__address
    grid-area bottom
    line-height 1.36

@media screen and (min-width: 450px)
  .site-footer
    display grid  
    grid-template-areas "logo   logo   logo" \
                      "links  x      contact" \
                      "social social social" \
                      "bottom bottom bottom"
    grid-template-columns 1fr 2px 1fr
    grid-column-gap 30px

@media screen and (min-width: 767px)
  .site-footer
    display grid
    grid-template-areas "logo   logo   logo" \
                        "links  social contact" \
                        "bottom bottom bottom"
    grid-template-columns 200px 1fr 200px

    &__links,
    &__contact
      text-align left

    &__link-item
      line-height 1.47

@media screen and (min-width: 1200px)
  .site-footer
    padding-left 15vw
    padding-right 15vw

@media screen and (min-width: $bigScreenAt)
  .site-footer
    grid-template-columns 21vw 1fr 21vw
    padding-left 5vw
    padding-right 5vw
</style>