<template>
  <NuxtPage />
</template>
<script setup lang="ts">
useHead({
  title: "Services",
});
definePageMeta({
  middleware: "before-route-entry",
  layout: "custom",
});
</script>
