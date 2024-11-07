<template>
  <main>next-rel</main>
</template>
<script setup lang="ts">
useHead({
  title: "Next Release",
});
definePageMeta({
  middleware: "before-route-entry",
  layout: "custom",
});
</script>
