<template>
  <main>
    <ProductPList />
  </main>
</template>

<script setup lang="ts">
useHead({
  title: "Products",
});
definePageMeta({
  middleware: "before-route-entry",
  layout: "custom",
});
</script>
