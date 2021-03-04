<template>
  <CollectionItem @click.native="showModal" :item="item"/>
</template>

<script>
import CollectionItem from './CollectionItem';
import CollectionItemModal from './CollectionItemModal';

export default {
  components: {
    CollectionItem
  },
  methods: {
    showModal() {
      this.$modal.show(CollectionItemModal, {
        item: this.item
      },
      {
        classes: 'content-collection-item-modal', 
        height: 'auto',
        width: '90%',
        scrollable: true
      });
    }
  },
  props: {
    item: {
      type: Object
    }
  }
}
</script>

<style lang="stylus" scoped>
.content-collection-item-modal
  left 50% !important
  max-width 600px
  right 0 !important
  transform translateX(-50%) !important
</style>