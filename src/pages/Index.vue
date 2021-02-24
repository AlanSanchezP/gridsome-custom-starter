<template>
<Layout>
  <Swiper class="home-carousel" ref="mySwiper" :options="swiperOptions">
    <!-- TODO: Implement a carousel here -->
    <SwiperSlide class="home-carousel-item vertical-center cover">
      <div class="home-carousel-item__div" data-enllax-type="foreground" data-enllax-ratio=".5">
        <div class="home-carousel-item__content">
          <h2 class="home-carousel-item__title">Laborum praesentium quidem nisi!</h2>
          <p class="home-carousel-item__text">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure, quaerat voluptates consectetur error ipsum exercitationem deleniti dolore incidunt sit rem dignissimos nihil! Quo molestias deleniti nulla ullam minima placeat rem.
          </p>
          <a href="#" class="site-button site-button--transparent-inverse">Laudantium possimus</a>
        </div>
      </div>
    </SwiperSlide>
    <SwiperSlide class="home-carousel-item vertical-center cover">
      <div class="home-carousel-item__div" data-enllax-type="foreground" data-enllax-ratio=".5">
        <div class="home-carousel-item__content">
          <h2 class="home-carousel-item__title">Aipisicing elit, tenetur laborum ex</h2>
          <p class="home-carousel-item__text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. A facilis maxime esse distinctio inventore, consequatur iure ipsum laboriosam suscipit mollitia possimus autem voluptatum fugit tenetur minus expedita illum, nam dignissimos!
          </p>
          <a href="#" class="site-button site-button--transparent-inverse">Officia rerum</a>
        </div>
      </div>
    </SwiperSlide>
    <button type="button" class="swiper-button-next" slot="button-next" />
    <button type="button" class="swiper-button-prev" slot="button-prev" />
  </Swiper>
<div class="home-introduction">
  <p class="home-introduction__text">
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias iste et reiciendis cumque! Officiis voluptas, necessitatibus neque beatae tempore officia mollitia atque possimus in minus cumque. Ea obcaecati atque repellendus.
  </p>
  <a href="#" class="site-button site-button--default">Dolorum harum hic</a>
</div>
<div class="home-gradient home-gradient--logo-section">
  <g-image class="home-gradient-logo" src="~/assets/img/logo/logo.png" 
          alt="Logo description" 
          title="Logo" aria-hidden="true"/>
  <div class="home-gradient__items" data-enllax-type="foreground" data-enllax-ratio=".2">
    <div class="home-gradient__item">
      <g-image src="~/assets/img/logo/logo.png" 
        alt="Accessibility description" title="Icon" aria-hidden="true" />
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit, suscipit culpa ducimus expedita.
      </p>
    </div>
    <div class="home-gradient__item">
      <g-image src="~/assets/img/logo/logo.png" 
        alt="Accessibility description" title="Icon" aria-hidden="true" />
      <p>
        A animi incidunt praesentium consectetur adipisicing elit. Voluptatibus tempore ex quam architecto.
      </p>
    </div>
    <div class="home-gradient__item">
      <g-image src="~/assets/img/logo/logo.png" 
        alt="Accessibility description" title="Icon" aria-hidden="true" />
      <p>
        Quia voluptates animi inventore reiciendis accusamus officiis necessitatibus placeat commodi maiores.
      </p>
    </div>
    <div class="home-gradient__item">
      <g-image src="~/assets/img/logo/logo.png" 
        alt="Accessibility description" title="Icon" aria-hidden="true" />
      <p>
        Tenetur nulla quis harum, perferendis nesciunt quod porro aut labore? Doloribus ab voluptas earum.
      </p>
    </div>
  </div>
</div>
<div class="starred-content">
  <h2 class="starred-content__title">Ipsam ea vero quidem ut</h2>
  <p class="starred-content__description">
    Commodi possimus quas aut voluptatum quod iure, voluptate, quasi veniam ea iste, similique laudantium molestiae provident nihil corporis quae excepturi. Inventore, nulla!
  </p>
  <div class="content-collection">
    <article class="content-collection-item">
      <a href="#">
        <h3 class="content-collection-item__title">Esse inventore, eveniet eligendi</h3>
        <g-image src="~/assets/img/logo/logo.png" 
          class="content-collection-item__photo cover"
          alt="Avatar picture"
          title="Avatar picture" aria-hidden="true" />
        <div class="content-collection-item__info">
          <g-image src="~/assets/img/logo/logo.png" 
            class="content-collection-item__avatar circle"
            alt="Avatar picture"
            title="Avatar picture" aria-hidden="true" />
          <p class="content-collection-item__excerpt">
            Porro praesentium earum sed ipsam? Assumenda, deserunt amet! Suscipit doloribus velit quae laudantium tempore. Aperiam consectetur eos repudiandae sint incidunt illum dolores.
          </p>
        </div>
      </a>
    </article>
    <article class="content-collection-item">
      <a href="#">
        <h3 class="content-collection-item__title">Doloremque ipsam cumque voluptatum</h3>
        <g-image src="~/assets/img/logo/logo.png" 
          class="content-collection-item__photo cover"
          alt="Avatar picture"
          title="Avatar picture" aria-hidden="true" />
        <div class="content-collection-item__info">
          <g-image src="~/assets/img/logo/logo.png" 
            class="content-collection-item__avatar circle"
            alt="Avatar picture"
            title="Avatar picture" aria-hidden="true" />
          <p class="content-collection-item__excerpt">
            In necessitatibus praesentium totam accusantium fugiat quis, qui deleniti kiste dolore deleniti beatae at eligendi repellendus vel earum quae.
          </p>
        </div>
      </a>
    </article>
  </div>
  <a href="#" class="site-button site-button--default">Leniti blanditiis!</a>
</div>
</Layout>
</template>

<script>
import '~/assets/styl/content_collection.styl';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

export default {
  metaInfo: {
    title: 'Welcome to my project'
  },
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOptions: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        loop: true
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  }
}
</script>

<style lang="stylus" scoped>
.home-carousel
  color white
  height calc(95vh - 72px)
  background-color $primaryThemeColor
  overflow hidden // Remove when carousel is ready

  @media screen and (orientation: portrait) and (min-height: 400px) and (min-width: 400px)
    max-height 76vw

  .swiper-button-next,
  .swiper-button-prev
    background none
    border none
    color white
    outline none
    position absolute
    text-shadow 0 0 10px $defaultTextColor
    top 50%
    transform translateY(-50%)

    &::after
      font-size remify(34)

  .swiper-button-prev
    left remify(14)

  .swiper-button-next
    right remify(14)

  &-item
    display flex
    height 100%
    overflow hidden

    &__div
      width 80%
      min-width 288px
      text-align left
      position relative
      z-index 2

    &__content
      max-width 344px

    &__title
      font-size remify(39)

    &__text
      font-size remify(18)
      line-height 1.17
      padding-bottom unit(38/18, 'em')
      margin-top unit(19/18, 'em')

  .site-button
    font-size remify(18)
    padding 0.8em 1.2em

.agile__slide
  transition opacity 0.2

  &:not(.agile__slide--active)
    opacity 0

.home-introduction
  margin-top unit(89/18, 'em')
  margin-bottom unit(127/18, 'em')
  max-width 655px
  text-align center
  font-size remify(18)
  width 90%
  center-block()

  &__text
    line-height 1.17
    padding-bottom unit(39/18, 'em')

  .site-button
    font-size remify(17)
    padding 1em 1.5em

.home-gradient
  background-image linear-gradient(to bottom, #57d0c3, rgba(0, 87, 123, 0.5)), linear-gradient(rgba(161, 209, 202, 0.63), rgba(161, 209, 202, 0.63))

  &--logo-section
    position relative
    padding remify(90) 0 remify(74) 0

  &-logo
    position absolute
    left 50%
    top 0
    transform translate(-50%, -38%)
    width remify(110)
    z-index 3

  &__items
    color white
    display flex
    align-items flex-start
    justify-content space-around
    flex-wrap wrap
    width 90%
    max-width 950px
    text-align center
    z-index 2
    center-block()

  &__item
    flex-basis 40%
    max-width initial

    &:nth-child(n + 3)
      margin-top remify(50)

    img
      height remify(38)

    p
      font-size remify(14)
      margin-top unit(23/14, 'em')

    @media screen and (min-width: 731px)
      flex-basis 23%
      max-width 180px
    
      &:nth-child(n + 3)
        margin-top initial

.starred-content
  center-block()
  text-align center
  max-width 880px
  width 90%
  padding remify(70) 0 remify(105) 0

  &__title
    font-size remify(22)
    padding-bottom unit(33/22, 'em')

  &__description
    font-size remify(18)
    width 100%
    max-width 655px
    line-height 1.17
    center-block()

  .site-button
    margin-top 4em
</style>
