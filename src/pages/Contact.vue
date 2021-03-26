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
        <font-awesome-icon v-if="submitStatus == PENDING" icon="circle-notch" spin class="form-submit__spinner" />
        <div v-if="submitStatus == INVALID" class="form-submit__message form-submit__message--error">{{submitError}}</div>
        <button v-if="submitStatus != PENDING && submitStatus != SUCCESS"
          class="site-button site-button--default" type="submit" name="submit">Submit</button>
        <div v-if="submitStatus == SUCCESS" class="form-submit__message form-submit__message--success">
          <font-awesome-icon icon="check"/> Your message was sent successfully.
        </div>
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
  created() {
    this.PENDING = PENDING;
    this.INVALID = INVALID;
    this.SUCCESS = SUCCESS;
  },
  data() {
    return {
      name: '',
      email: '',
      message: '',
      submitStatus: null,
      submitError: ''
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
      if (this.$v.$invalid) {
        this.submitStatus = INVALID;
        this.submitError = 'Your data has some errors.'
      } else {
        this.submitStatus = PENDING;
        this.submitError = '';
        setTimeout(() => {
          this.submitStatus = SUCCESS;
        }, 1000);
      }
      
      // TODO: Handle actual submission here. submitError should be a useful message from server.
    }
  }
}
</script>

<style lang="stylus" scoped>
.contact-form-page
  padding-bottom remify(98)
  padding-top remify(48)
  text-align center

.contact-form
  margin-top remify(50)
  max-width 436px
  width 90%
  center-block()

.form-item
  margin-top remify(12)
  font-size remify(16)

  &__input
    color $inputTextColor
    font-weight $_bold
    font-size inherit
    padding 1em 2em
    simple-border('all', remify(0.5), $lightShadowColor)

    &::placeholder
      color rgba($inputTextColor, 0.86)
      font-family inherit
      font-weight $_normal

    textarea&
      height 180px

.form-submit
  margin-top remify(20)

  &__message--error
    margin-bottom remify(20)
  
  &__message--success
    font-size remify(19)
  
  &__spinner
    font-size remify(32)

.site-button
  font-size remify(16)

@media screen and (min-width: 481px)
  .form-item--short-contact
    width 70%

  .form-submit
    text-align right

@media screen and (min-width: $bigScreenAt)
  .contact-form
    max-width initial
    width 50%
</style>