<template>
<Layout>
  <div ref="aux" class="home-carousel__aux" aria-hidden="true"/>
  <Swiper class="home-carousel" ref="indexCarousel" :options="swiperOptions"
    @slideChangeTransitionEnd="onSlideChange"
    :class="{'home-carousel--fixed-height': useFixedHeight}"
    resizeObserver="true">
    <SwiperSlide class="home-carousel-item">
      <g-image src="~/assets/img/covers/cover_d.jpeg"
        class="home-carousel-item__cover cover"
        width="3000px"
        height="1500px" />
      <div class="home-carousel-item__div  vertical-center">
        <div class="home-carousel-item__content">
          <h2 class="home-carousel-item__title">Laborum praesentium quidem nisi!</h2>
          <p class="home-carousel-item__text">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure, quaerat voluptates consectetur error ipsum exercitationem deleniti dolore incidunt sit rem dignissimos nihil! Quo molestias deleniti nulla ullam minima placeat rem.
          </p>
          <a href="#" class="site-button site-button--transparent-inverse">Laudantium possimus</a>
        </div>
      </div>
    </SwiperSlide>
    <SwiperSlide class="home-carousel-item">
      <g-image src="~/assets/img/covers/cover_e.jpeg"
        class="home-carousel-item__cover cover"
        width="3000px"
        height="1500px" />
      <div class="home-carousel-item__div vertical-center">
        <div class="home-carousel-item__content">
          <h2 class="home-carousel-item__title">Aipisicing elit, tenetur laborum ex</h2>
          <p class="home-carousel-item__text">
            Maiores distinctio, veritatis officia saepe consectetur ad ducimus inventore nemo ex nesciunt cumque soluta aperiam omnis consequatur perferendis corrupti. Saepe non dicta omnis tempore corporis alias obcaecati voluptate fugiat iste libero eaque consequatur, maxime.
          </p>
          <a href="#" class="site-button site-button--transparent-inverse">Officia rerum</a>
        </div>
      </div>
    </SwiperSlide>
    <SwiperSlide class="home-carousel-item">
      <g-image src="~/assets/img/covers/cover_f.jpeg"
        class="home-carousel-item__cover cover"
        width="3000px"
        height="1500px" />
      <div class="home-carousel-item__div  vertical-center">
        <div class="home-carousel-item__content">
          <h2 class="home-carousel-item__title">Assumenda ea mollitia in eos vero eligendi</h2>
          <p class="home-carousel-item__text">
            Reprehenderit nesciunt, sint explicabo quam animi, necessitatibus nemo vel maxime perferendis est nisi! Iure, quaerat voluptates consectetur error ipsum exercitationem deleniti dolore incidunt sit rem dignissimos nihil! Quo molestias deleniti nulla ullam minima placeat rem.
          </p>
          <a href="#" class="site-button site-button--transparent-inverse">Laudantium possimus</a>
        </div>
      </div>
    </SwiperSlide>
    <button type="button" class="swiper-button-next" slot="button-next" />
    <button type="button" class="swiper-button-prev" slot="button-prev" />
  </Swiper>
  <ScrollForMore ref="scrollForMore" anchorRef="introduction" />
  <div class="home-introduction" ref="introduction">
    <p class="home-introduction__text">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias iste et reiciendis cumque! Officiis voluptas, necessitatibus neque beatae tempore officia mollitia atque possimus in minus cumque. Ea obcaecati atque repellendus.
    </p>
    <g-link to="/about" class="site-button site-button--default">Dolorum harum hic</g-link>
  </div>
  <div class="home-gradient home-gradient--logo-section">
    <g-image class="home-gradient-logo" src="~/assets/img/logo/logo.png"
            alt="Logo description"
            title="Logo" aria-hidden="true"/>
    <div class="home-gradient__items" data-enllax-type="foreground" data-enllax-ratio=".2">
      <div class="home-gradient__item">
        <font-awesome-icon icon="rocket" class="home-gradient__item-icon" />
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit, suscipit culpa ducimus expedita.
        </p>
      </div>
      <div class="home-gradient__item">
        <font-awesome-icon icon="star" class="home-gradient__item-icon" />
        <p>
          A animi incidunt praesentium consectetur adipisicing elit. Voluptatibus tempore ex quam architecto.
        </p>
      </div>
      <div class="home-gradient__item">
        <font-awesome-icon icon="user-shield" class="home-gradient__item-icon" />
        <p>
          Quia voluptates animi inventore reiciendis accusamus officiis necessitatibus placeat commodi maiores.
        </p>
      </div>
      <div class="home-gradient__item">
        <font-awesome-icon icon="comments" class="home-gradient__item-icon" />
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
      <CollectionItemAndModal v-for="item in $page.items.edges" v-bind:item="item.node" v-bind:key="item.node.id"/>
    </div>
    <g-link to="/items/" class="site-button site-button--default">Leniti blanditiis!</g-link>
  </div>
</Layout>
</template>

<page-query>
query {
  items: allItem(limit: 2) {
    edges {
      node {
        id
        title
        thumbnail
        description
        path
      }
    }
  }
}
</page-query>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import CollectionItemAndModal from '../components/CollectionItemAndModal';
import ScrollForMore from '../components/ScrollForMore';

const DIV_CLASS_NAME = '.home-carousel-item__div';
const CONTENT_CLASS_NAME = '.home-carousel-item__content';
const COVER_CLASS_NAME = '.home-carousel-item__cover';

function evaluateDynamicCarouselHeight() {
  if (!this) {
    console.warn("Call this function using evaluateDynamicCarouselHeight.call(this)");
    return;
  }
  var tallestChildContent = 0;
  for (let slide of this.$refs.indexCarousel.$children) {
    let slideContentHeight = slide.$el.querySelector(CONTENT_CLASS_NAME).offsetHeight;
    tallestChildContent = Math.max(tallestChildContent, slideContentHeight);
  }
  const contentPadding = parseInt(
    getComputedStyle(
      this.$refs.indexCarousel.$children[0].$el.querySelector(DIV_CLASS_NAME)
    ).paddingTop.replace(/px/, '')) * 2;
  const referenceHeight = this.$refs.aux.offsetHeight - contentPadding; // includes padding
  this.useFixedHeight = tallestChildContent < referenceHeight;
}

export default {
  metaInfo: {
    title: 'Welcome to my project'
  },
  components: {
    Swiper,
    SwiperSlide,
    CollectionItemAndModal,
    ScrollForMore
  },
  mounted() {
    this.swiper.on('resize', evaluateDynamicCarouselHeight.bind(this));
  },
  data() {
    return {
      swiperOptions: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        loop: true
      },
      useFixedHeight: true
    }
  },
  methods: {
    onSlideChange() {
      const effectiveSlidesCount = this.$refs.indexCarousel.$children.length;
      if (this.swiper.activeIndex == 0 ||
        this.swiper.activeIndex > effectiveSlidesCount) {
        const slide = this.swiper.slides[this.swiper.activeIndex];
        const slideCover = slide.querySelector(COVER_CLASS_NAME);

        if (slideCover.src.includes('data:')) {
          slideCover.srcset = slideCover.dataset.srcset;
        }
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.indexCarousel.$swiper;
    }
  }
}
</script>

<style lang="stylus" scoped>
.home-carousel
  color white

  &__aux, &--fixed-height
    height calc(95vh - 72px)

    @media screen and (orientation: portrait)
      max-height "min(76vh, 500px)" % null

  &__aux
    position fixed
    z-index -1000

  @media screen and (max-width: 300px)
    .swiper-button-prev
      left -100vw !important

  .swiper-button-next,
  .swiper-button-prev
    background none
    border none
    color white
    outline none
    position absolute
    text-shadow 0 0 remify(10) $defaultTextColor
    top 50%
    transform translateY(-50%)

    &::after
      font-size remify(30)

  .swiper-button-prev
    left remify(12)

  .swiper-button-next
    right remify(12)

  &-item
    height 100%
    overflow hidden
    position relative

    &__cover
      bottom 0
      height 100%
      left 0
      position absolute
      right 0
      top 0
      width 100%

    &__div
      background-image "linear-gradient(to right, rgba(0, 0, 0, 0.8), max(60%, 220px), transparent)" % null
      justify-content start
      height 100%
      padding remify(30) 10vw
      position relative
      text-align left
      z-index 2

    &__content
      max-width "max(344px, 40vw)" % null

    &__title
      font-family 'Avenir'
      font-size remify(32)

    &__text
      line-height 1.17
      padding-bottom unit(38/18, 'em')
      margin-top unit(19/18, 'em')

  .site-button
    font-size remify(16)
    padding 0.8em 1.2em

.agile__slide
  transition opacity 0.2

  &:not(.agile__slide--active)
    opacity 0

.home-introduction
  padding-top unit(89/18, 'em')
  padding-bottom unit(127/18, 'em')
  max-width 655px
  text-align center
  width 90%
  center-block()

  &__text
    line-height 1.17
    padding-bottom unit(39/18, 'em')

  .site-button
    font-size remify(16)
    padding 1em 1.5em

.home-gradient
  background-image linear-gradient(to bottom, #57d0c3, rgba(0, 87, 123, 0.5)), linear-gradient(rgba(161, 209, 202, 0.63), rgba(161, 209, 202, 0.63))

  &--logo-section
    position relative
    padding remify(90) 0 remify(60) 0

  &-logo
    position absolute
    left 50%
    top 0
    transform translate(-50%, -38%)
    width remify(96)
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
      margin-top remify(42)

    &-icon
      height remify(50)
      width @height

    p
      font-size remify(15.5)
      margin-top unit(23/14, 'em')

    @media screen and (min-width: 731px)
      flex-basis 23%
      max-width 180px
    
      &:nth-child(n + 3)
        margin-top initial

.starred-content
  max-width 880px
  padding remify(60) 0 remify(86) 0
  text-align center
  width 90%
  center-block()

  &__title
    font-family 'Avenir'
    font-size remify(20)
    padding-bottom unit(33/22, 'em')

  &__description
    width 100%
    max-width 655px
    line-height 1.17
    center-block()

  .site-button
    font-size remify(15.5)
    margin-top 4em

@media screen and (min-width: $bigScreenAt)
  .home-introduction
    max-width initial
    width 70%

  .home-gradient
    &__items
      max-width initial

    &__item
      max-width initial

  .starred-content
    max-width initial
    width 88%

    &__description
      max-width initial
      width 88%
</style>
