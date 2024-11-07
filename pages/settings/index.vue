<template>
  <section class="min-h-[calc(100vh-3.7rem)] flex flex-col w-full">
    <div class="w-full flex-1">
      <div v-if="computedResult" class="flex flex-col justify-center mt-3">
        <SettingsCustomer
          :first-name="computedResult.firstName"
          :last-name="computedResult.lastName"
          :email="computedResult.email"
        ></SettingsCustomer>
        <SettingsSupplier
          v-if="computedResult?.supplier"
          :supplier-profile="computedResult.supplier"
        ></SettingsSupplier>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import getUserProfile from "@/graphQL/query/getUserProfile.gql";
import { useAppStore } from "@/store/store";
useHead({
  title: "Settings",
});

const { onError, result } = await useCustomQuery(getUserProfile, {
  id: localStorage.getItem("userID"),
});

const computedResult = computed(() => {
  const data = result.value?.userProfile;
  return data;
});

onError((error) => {
  console.log(error);
});

definePageMeta({
  middleware: "before-route-entry",
  layout: "custom",
});
</script>
