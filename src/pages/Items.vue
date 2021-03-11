<template>
  <Layout class="content-collection-page">
    <h1 class="page-title">Items</h1>
    <div class="content-collection">
      <CollectionItem v-for="item in $page.items.edges" v-bind:item="item.node" v-bind:key="item.node.id" />
    </div>
  </Layout>
</template>

<page-query>
query {
  items: allItem {
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
import CollectionItem from '../components/CollectionItem';
export default {
  metaInfo : {
    title: 'Items'
  },
  components: {
      CollectionItem
  }
}
</script>

<style lang="stylus" scoped>
.page-title
  text-align center

.content-collection
  margin-bottom remify(70)
  width 90%

  &-page
    padding-top remify(30)

  @media screen and (min-width: 768px)
    width 80%

    &-item
      flex-basis 46%
</style>