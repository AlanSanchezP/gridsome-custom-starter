<template>
  <g-link v-if="isRouted"
    :to="destination"
    :exact="isRouted ? exact : null"
    :activeClass="isRouted ? activeClass : null"
    :exactActiveClass="isRouted ? exactActiveClass : null">
    <slot />
  </g-link>
  <a v-else
    :href="destination"
    :target="!isSpecial && !isAnchor ? '_blank' : null">
    <slot />
  </a>
</template>

<script>
export default {
  props: {
    destination: String,
    // G-link props. Only use for routed links
    exact: {type: Boolean, required: false},
    activeClass: {type: String, required: false},
    exactActiveClass: {type: String, required: false}
  },
  computed: {
    isRouted() {
      return this.destination.startsWith('/');
    },
    isSpecial() {
      return this.destination.startsWith('tel:') ||
        this.destination.startsWith('callto:') ||
        this.destination.startsWith('mailto:');
    },
    isAnchor() {
      return this.destination.startsWith('#');
    }
  }
}
</script>