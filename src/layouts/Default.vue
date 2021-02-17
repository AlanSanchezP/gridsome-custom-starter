<template>
  <main>
    <slot/>
  </main>
</template>
<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>