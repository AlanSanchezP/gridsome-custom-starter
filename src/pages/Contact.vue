<template>
  <Layout class="contact-form-page">
    <h1 class="page-title">Contact us</h1>
    <form class="contact-form" @submit.prevent="submit">
      <div class="form-item form-item--short-contact" :class="{ 'form-item--error': $v.name.$error}">
        <input class="form-item__input" type="text" name="name" placeholder="Name" v-model.trim="$v.name.$model">
        <div class="form-item__message" v-if="!$v.name.required && $v.name.$dirty">Field is required.</div>
      </div>
      <div class="form-item form-item--short-contact" :class="{ 'form-item--error': $v.email.$error}">
        <input class="form-item__input" type="email" name="email" placeholder="Email" v-model.trim="$v.email.$model">
        <div class="form-item__message" v-if="!$v.email.required && $v.email.$dirty">Field is required.</div>
        <div class="form-item__message" v-if="!$v.email.email && $v.email.$dirty">Field must be an email.</div>
      </div>
      <div class="form-item" :class="{ 'form-item--error': $v.message.$error}">
        <textarea class="form-item__input" name="message" placeholder="Message" v-model.trim="$v.message.$model"></textarea>
        <div class="form-item__message" v-if="!$v.message.maxLength">Message should be less than {{$v.message.$params.maxLength.max}} characters.</div>
      </div>
      <div class="form-submit">
        <button class="site-button site-button--default" type="submit" name="submit">Submit</button>
      </div>
    </form>
  </Layout>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email, maxLength } from 'vuelidate/lib/validators';

const PENDING = -1;
const INVALID = 0;
const SUCCESS = 1;

export default {
  metaInfo: {
    title: 'Contact us'
  },
  mixins: [validationMixin],
  data() {
    return {
      name: '',
      email: '',
      message: '',
      submitStatus: null
    }
  },
  validations: {
    name : {required},
    email: {required, email},
    message: {
      maxLength: maxLength(100)
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
      this.submitStatus = !this.$v.$error;
      // TODO: Handle actual submission here
    }
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

.form-item
  margin-top remify(14)
  font-size remify(17)

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

    textarea&
      height 180px

.form-submit
  margin-top remify(25)

.site-button
  font-size remify(16)

@media screen and (min-width: 481px)
  .form-item--short-contact
    width 70%

  .form-submit
    text-align right
</style>