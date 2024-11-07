<template>
  <article
    class="flex flex-col gap-2 px-6 bg-green1100 bg-opacity-80 pt-1 pb-7 drop-shadow-sm rounded-lg"
  >
    <div class="flex flex-row justify-end w-full">
      <h-dropdown
        class=""
        :leading_icon="EllipsisVerticalIcon"
        :items="[
          { name: 'Edit', value: id },
          { name: 'Delete', value: id },
        ]"
        @option-clicked="handleOptionClick"
      ></h-dropdown>
    </div>

    <div class="grid lg:gap-[3rem] gap-[1rem] lg:grid-flow-col">
      <div class="flex-col flex gap-10">
        <div class="flex flex-row gap-6 items-top">
          <nuxt-img
            format="webp"
            quality="100"
            loading="lazy"
            class="rounded-md"
            :src="img"
            alt="name"
            width="120"
            height="100"
            fit="outside"
          />
          <div class="flex flex-col gap-1">
            <h3
              class="text-green100 sm:text-xl text-base font-semibold line-clamp-1"
            >
              {{ service_title }}
            </h3>
            <h1 class="text-green200 text-base font-bold">
              {{ category }}
            </h1>
            <div class="flex flex-col gap-2 w-fit mt-8">
              <span class="text-gray sm:text-[1rem] text-sm font-semibold"
                >Contact Info</span
              >
              <div class="grid grid-cols-2 gap-y-2 gap-x-10">
                <div
                  class="flex gap-2"
                  v-for="item in contact_info"
                  :key="item.name"
                >
                  <span class="font-bold w-[10rem] sm:text-[1rem] text-sm">{{
                    item.name
                  }}</span>
                  <a
                    class="text-bold sm:text-[1rem] text-sm hover:text-blue-600 hover:underline w-fit"
                    :href="item.url"
                    target="_blank"
                    >{{ item.name }}</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-10"></div>
      </div>
      <div class="flex flex-col gap-5 w-full">
        <div class="flex flex-col gap-2">
          <span class="sm:text-base text-sm font-bold text-gray"
            >Service Detail</span
          >
          <p
            class="sm:text-base text-sm font-semibold"
            :class="[isMoreService ? 'line-clamp-none' : 'line-clamp-2']"
          >
            {{ service_detail }}
          </p>
          <div class="flex justify-end">
            <span
              class="flex items-center gap-3 text-gray cursor-pointer hover:text-green400 text-sm"
              @click="show_more_detail"
            >
              {{ show_title }}
              <ChevronDownIcon
                class="w-3 h-3"
                :class="[isMoreService ? 'rotate-180' : '']"
              />
            </span>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <span class="sm:text-base text-sm font-semibold text-gray"
            >Location</span
          >

          <div class="flex flex-row">
            <h1 class="font-semibold">Region/City</h1>
            <p>Amhara</p>
          </div>
          <div class="flex flex-row">
            <h1 class="font-semibold">SubCity</h1>
            <p>BahirDar</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-between pt-3">
      <h-button
        name="Scan"
        :leading_icon="QrCodeIcon"
        button_class="rounded px-6 py-1 text-xl scale-100 hover:scale-120 transition-ease-in-out duration-300"
      >
      </h-button>
      <div class="flex flex-row gap-6 flex-wrap">
        <span class="flex gap-1 font-medium items-center" v-if="props.license">
          <DocumentCheckIcon class="w-5 h-5 text-green200" /> License
        </span>
        <Rating :readonly="true" :rate-value="rate" />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import {
  EllipsisVerticalIcon,
  ChevronDownIcon,
  QrCodeIcon,
  DocumentCheckIcon,
} from "@heroicons/vue/24/outline";

interface ContactInterface {
  name?: string;
  url?: string;
}

interface ServiceInterface {
  service_title: string;
  img: string;
  category: string;
  service_type: string;
  contact_info: Array<ContactInterface>;
  license?: boolean;
  rate: number;
  service_detail: string;
  id: number;
}
const router = useRouter();
const show_title = ref("Show More");

const isMoreService = ref(false);
const show_more_detail = () => {
  isMoreService.value = !isMoreService.value;
  if (isMoreService.value) {
    show_title.value = "Show Less";
  } else show_title.value = "Show More";
};

const props = withDefaults(defineProps<ServiceInterface>(), {
  rate: 0,
});
interface ItemInterface {
  name: string;
  value: number;
}

const handleOptionClick = (clickedItem: ItemInterface) => {
  console.log(props.service_type);
  if (clickedItem.name === "Edit") {
    if (props.service_type === "Real Time Service")
      router.push("/edit/realtime-" + `${clickedItem.value}`);
    else if (props.service_type === "Virtual Service") {
      router.push("/edit/virtual-" + `${clickedItem.value}`);
    }
  }

  console.log(clickedItem);
};
</script>
