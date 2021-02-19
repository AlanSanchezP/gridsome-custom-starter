<template>
  <footer class="site-footer">
      <g-link to="/" class="site-footer__logo">
        <g-image src="~/assets/img/logo/logo-full-white.png" 
          alt="Accesibility description of logo" 
          title="Logo" />
      </g-link>
      <div class="site-footer__links">
        <a href="#" class="site-footer__link-item">Footer link item</a>
        <a href="#" class="site-footer__link-item">Footer link item</a>
        <a href="#" class="site-footer__link-item">Footer link item</a>
        <a href="#" class="site-footer__link-item">Footer link item</a>
        <a href="#" class="site-footer__link-item">Footer link item</a>
      </div>
      <div class="site-footer__social">
        <a href="#" target="_blank" class="site-footer__social-item">Facebook link</a>
        <a href="#" target="_blank" class="site-footer__social-item">Instagram link</a>
        <a href="#" target="_blank" class="site-footer__social-item">Twitter link</a>
      </div>
      <div class="site-footer__contact">
        <a href="callto:" class="site-footer__link-item">+0 0000000</a>
        <a href="callto:" class="site-footer__link-item">+0 0000000</a>
        <a href="mailto:" class="site-footer__link-item">hello@test.test</a>
      </div>
    <address class="site-footer__address">Company Address</address>
  </footer>
</template>

<script>
export default {
    // TODO: Make it dynamic via params
}
</script>

<style lang="stylus" scoped>
.site-footer
  display grid
  grid-template-areas "logo" \
                  "links" \
                  "contact" \
                  "social" \
                  "bottom"
  grid-row-gap remify(40)
  background $primaryThemeColor
  color white
  padding remify(60) 5vw remify(65) 5vw
  text-align center
  font-size remify(18)

  a
    color white
    transition opacity 0.2s

    &:hover
      opacity 0.8

.site-footer__logo
  grid-area logo
  justify-self center
  width auto

  img
    width remify(155)

.site-footer__link-item
  display block
  line-height 1.96

.site-footer__links
  grid-area links

.site-footer__social
  grid-area social
  align-self center

.site-footer__social-item
  display inline-block
  height remify(40)
  width remify(40)
  simple-border('all', 1px, white)
  margin 0 remify(6)

.site-footer__contact
  grid-area contact

.site-footer__address
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

  .site-footer__links,
  .site-footer__contact
    text-align left

  .site-footer__link-item
    line-height 1.47
</style>