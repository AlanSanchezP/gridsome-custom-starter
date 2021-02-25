<template>
  <Layout class="contact-form-page">
    <h1 class="page-title">Contact us</h1>
    <form class="contact-form">
      <div class="input-wrapper input-wrapper--short-contact-form-size">
        <input id="name" class="contact-form__input" type="text" name="name" placeholder="Name">
      </div>
      <div class="input-wrapper input-wrapper--short-contact-form-size">
        <input id="email" class="contact-form__input" type="email" name="email" placeholder="Email">
      </div>
      <div class="input-wrapper">
        <textarea id="message" class="contact-form__input" name="message" placeholder="Message"></textarea>
      </div>
      <div class="button-wrapper">
        <button class="site-button site-button--default" type="submit" name="submit">Enviar</button>
      </div>
    </form>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Contact us'
  }
}
</script>

<style lang="stylus" scoped>
.contact-form-page
  padding-bottom remify(120)
  padding-top remify(62)
  text-align center

.contact-form
  margin-top remify(50)
  center-block()
  max-width 436px
  width 90%

  &__input
    color $inputTextColor
    font-weight $bold
    font-size 16px // TODO: Find a good way to resize fonts. Small fonts on mobile look bad
    padding 1em 2em
    simple-border('all', 0.5px, $lightShadowColor)

    &, &:hover, &:active &:focus
      box-shadow none
      outline none

    &::placeholder
      color rgba($inputTextColor, 0.86)
      font-family inherit
      font-weight $normal

.button-wrapper
  margin-top remify(25)

.input-wrapper
  margin-top remify(14)
  font-size remify(17)

.site-button
  font-size remify(16)

textarea.contact-form__input
  height 180px

@media screen and (min-width: 481px)
  .contact-form
    .button-wrapper
      text-align right

    .input-wrapper--short-contact-form-size
      width 70%
</style>