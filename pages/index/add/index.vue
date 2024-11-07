<template>
  <main
    class="flex flex-col items-center justify-center md:gap-16 gap-8 w-full min-h-[calc(100vh-3.7rem)]"
  >
    <h1 class="font-bold text-xl">Choose Service Type</h1>
    <section
      class="flex md:flex-row flex-col items-center justify-center gap-16"
    >
      <NuxtLink :to="{ path: '/add/realtime' }">
        <div
          class="flex flex-col items-center justify-center gap-4 group cursor-pointer"
        >
          <h1 class="flex items-center justify-center gap-2 text-xl font-bold">
            RealTime Services
          </h1>
          <p class="text-gray">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. Some additinal not
            will added and it hsould be at most five lines. no more than five
            lines. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry.
          </p>
          <button
            type="button"
            class="flex items-center flex-col font-bold text-sm text-green200 group-hover:text-green400 transition-colors ease-in-out duration-300"
          >
            <p class="uppercase">continue</p>
            <ArrowRightIcon class="w-8 h-4 group-hover:animate-wiggle" />
          </button>
        </div>
      </NuxtLink>
      <NuxtLink :to="{ path: '/add/virtual' }">
        <div
          class="flex flex-col items-center justify-center gap-4 group cursor-pointer"
        >
          <h1
            class="flex items-center justify-center gap-2 text-xl transition-all ease-in-out duration-300 font-bold"
          >
            Virtual Services
          </h1>
          <p for="virtual" class="text-gray">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. Some additinal not
            will added and it hsould be at most five lines. no more than five
            lines. Lorem Ipsum is simply dummy text of the printing and
            typesetting industry.
          </p>
          <button
            type="button"
            class="flex items-center flex-col font-bold text-sm text-green200 group-hover:text-green400 transition-colors ease-in-out duration-300"
          >
            <p class="uppercase">continue</p>
            <ArrowRightIcon class="w-8 h-4 group-hover:animate-wiggle" />
          </button>
        </div>
      </NuxtLink>
    </section>
  </main>
</template>
<script setup lang="ts">
import { ArrowRightIcon } from "@heroicons/vue/24/solid";
useHead({
  title: "Service",
});
definePageMeta({
  middleware: "before-route-entry",
  layout: "custom",
});
</script>
