<template>
  <main class="flex flex-col gap-4 pb-3">
    <!-- <h2 class="text-xl font-bold text-green100">Your Services</h2> -->
    <div
      v-if="service_data?.RTS && service_data.RTS.length > 0"
      class="flex flex-col gap-6"
    >
      <h1 class="font-bold text-xl">
        <span class="text-green400">RealTime</span> Services
      </h1>
      <div v-for="service_item in service_data.RTS" :key="service_item.id">
        <service-card
          :service_title="service_item.title"
          :service_detail="service_item.description.ops[0].insert"
          :img="service_item.logo"
          :license="service_item.isVerified"
          :category="service_item.category.name"
          :rate="
            service_item.rate.aggregate.avg.rate
              ? service_item.rate.aggregate.avg.rate
              : 0
          "
          :id="service_item.id"
          :contact_info="service_item.contact[0].socialMedia"
          service_type="Real Time Service"
        />
      </div>
    </div>
    <div
      v-if="service_data?.virtual && service_data.virtual.length > 0"
      class="flex flex-col gap-4"
    >
      <h1 class="text-xl font-bold"><span class="text-green400">Virtual</span> Services</h1>
      <div v-for="service_item in service_data.virtual" :key="service_item.id">
        <service-card
          :service_title="service_item.title"
          :service_detail="service_item.description.ops[0].insert"
          :img="service_item.logo"
          :license="service_item.is_verified"
          :category="service_item.category.name"
          :rate="
            service_item.rate.aggregate.avg.rate
              ? service_item.rate.aggregate.avg.rate
              : 0
          "
          :id="service_item.id"
          :contact_info="service_item.contact[0].socialMedia"
          service_type="Virtual Service"
        />
      </div>
    </div>

    <NuxtLink :to="{ path: '/add' }">
      <h-button
        name="Add Service"
        class="text-white bg-green200 fixed bottom-5 right-4 z-20 font-bold shadow-xl rounded-full py-2 px-4"
        :leading_icon="RocketLaunchIcon"
      ></h-button>
    </NuxtLink>
  </main>
</template>

<script setup lang="ts">
import {
  RocketLaunchIcon,
  QrCodeIcon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";

import QueryAllTimeService from "@/graphQL/query/service/fetchAllService.gql";
const emit = defineEmits(["checkForm"]);

const offeset = ref(0);
const variables = computed(() => {
  return {
    id: localStorage.getItem("userID"),
    offset: offeset.value,
    limit: 2,
  };
});
const { loading, result, onError, refetch } = await useCustomQuery(
  QueryAllTimeService,
  variables
);

useHead({
  title: "Next Rel",
});
definePageMeta({
  middleware: "before-route-entry",
  layout: "custom",
});

const page_update = (offset: number) => {
  offeset.value = offset;

  refetch();
};

const errorToFetch = ref(false);

const service_data = computed(() => {
  console.log(result.value);
  return result.value?.USERID;
});

// const total_RTS = computed(() => {
//   if (result.value) {
//     return result.value.USERID.total_realtime_service;
//   } else return 0;
// });

onError((error) => {
  console.log(error);
  errorToFetch.value = true;
});
</script>
