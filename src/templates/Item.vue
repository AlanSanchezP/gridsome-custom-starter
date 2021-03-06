<template>
   <div>
    <h1 v-html="$page.item.title" />
    <p v-html="$page.item.description" />
  </div>
</template>

<page-query>
query ($id: ID!) {
  item(id: $id) {
    title
    description
  }
}
</page-query>

<script>
export default {

}
</script>

<style>

</style>