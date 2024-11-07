<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <ProductRegistration v-if="userRole === 'customer'" />
    <div v-else>
      <div class="w-full justify-center my-8 flex gap-2 md:gap-5 items-center">
        <NuxtLink
          to="/products"
          class="text-base transition-colors ease-in-out duration-300 border-b-2 rounded hover:border-green400 hover:text-green400 px-4 py-0.5 md:px-6 font-semibold"
          :class="
            path.endsWith('/products')
              ? 'text-green400 border-green400'
              : 'text-green100 border-green200'
          "
        >
          Physical Products
        </NuxtLink>
        <span class="w-1 h-4 bg-lemon rounded-lg bg-opacity-50"></span>
        <NuxtLink
          to="/products/virtual"
          class="text-sm md:text-base transition-colors ease-in-out duration-300 border-b-2 hover:border-green400 hover:text-green400 px-4 py-0.5 md:px-6 rounded font-semibold"
          :class="
            path.endsWith('/virtual')
              ? 'text-green400 border-green400'
              : 'text-green100 border-green200'
          "
        >
          Virtual Products
        </NuxtLink>
      </div>
      <NuxtPage />
      <NuxtLink :to="{ path: '/products/add' }">
        <h-button
          name="Add Product"
          class="text-white bg-green200 fixed bottom-5 right-4 z-20 font-bold shadow-xl rounded-full py-2 px-4"
          :leading_icon="ShoppingBagIcon"
        ></h-button>
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  ShoppingBagIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/vue/24/solid";

import fetchUserRole from "@/graphQL/query/fetchUserRole.gql";

const userRole = ref(null as string | null);
const { result, onError, loading } = await useCustomQuery(fetchUserRole, {
  userID: localStorage.getItem("userID"),
});

watchEffect(() => {
  userRole.value = result.value?.userRole.role ?? null;
});

const router = useRoute();

const path = computed(() => {
  return router.path;
});

useHead({
  title: "Products",
});
definePageMeta({
  middleware: "before-route-entry",
  layout: "custom",
});
</script>
