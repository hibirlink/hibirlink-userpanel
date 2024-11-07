<template>
  <main class="min-w-screen min-h-screen font-nunito">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </main>
</template>
<script setup lang="ts">
import { useAppStore } from "~/store/store";
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - hibirlink` : "hibirlink user panel";
  },
});

const refreshUserToken = async () => {
  const userToken = await getUserIdToken();
  updateState(userToken || null);

};

onMounted(() => {
  setInterval(async () => {
    await refreshUserToken();
  }, 30000);
});
</script>
