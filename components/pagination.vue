<script setup lang="ts">
import { usePagination } from "vue-composable";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";
import type { Ref } from "vue";

interface PaginationPropsInterface {
  modelValue?: number;
  length?: number;
  disabled?: boolean;
  itemsPerPage: number;
  totalData?: number;
  offset?: number;
}

const props = withDefaults(defineProps<PaginationPropsInterface>(), {
  modelValue: 1,
  length: undefined,
  disabled: false,
  itemsPerPage: undefined,
  totalData: undefined,
  offset: undefined,
});

const emit = defineEmits<{
  (e: "update:modelValue", idr: number): void;
  (e: "update:offset", id: number): void;
}>();

const setEvents = () => {
  emit("update:modelValue", pageTracker.value);
  emit("update:offset", offset.value);
};

const totalPages = computed(() => {
  if (props.length !== undefined) {
    return Number(props.length) / 1;
  } else if (
    props.totalData !== undefined &&
    props.itemsPerPage !== undefined
  ) {
    return Math.ceil(props.totalData / props.itemsPerPage);
  }
  return 0;
});

let pageTracker: Ref<number> = ref(0);
if (props.offset === 0) {
  pageTracker.value = 1;
} else if (props.offset !== undefined) {
  pageTracker.value = Math.floor(props.offset / props.itemsPerPage);
} else {
  pageTracker.value = props.modelValue / 1;
}

// Functions two calculate direction of the dots
const offset = computed(() => {
  return (pageTracker.value - 1) * props.itemsPerPage;
});

const pageL1 = computed(() => {
  return pageTracker.value === 1;
});

const page3OR4 = computed(() => {
  return pageTracker.value === 3 || pageTracker.value === 4;
});

const pageBTN = computed(() => {
  return pageTracker.value >= 5 && pageTracker.value < totalPages.value - 2;
});

const pageLASTS = computed(() => {
  return pageTracker.value >= totalPages.value - 2;
});

const firstThree = computed(() => {
  return pageL1.value
    ? 3
    : page3OR4.value
    ? 5
    : pageBTN.value || pageLASTS.value
    ? 1
    : 3;
});

const lastThree = computed(() => {
  return pageL1.value
    ? totalPages.value - 2
    : page3OR4.value || pageBTN.value
    ? totalPages.value
    : pageLASTS.value
    ? totalPages.value - 4
    : totalPages.value - 2;
});

const middleStart = computed(() => {
  return pageBTN.value ? pageTracker.value - 1 : 0;
});

const middleEnd = computed(() => {
  return pageBTN.value ? pageTracker.value + 1 : 0;
});

const middleChecker = computed(() => {
  return pageBTN.value ? true : false;
});

const toggle = (n: number) => {
  pageTracker.value = n;
  setEvents();
};

const backward = () => {
  if (pageTracker.value > 1) {
    pageTracker.value--;
    setEvents();
  }
};

const forward = () => {
  if (pageTracker.value < totalPages.value) {
    pageTracker.value++;
    setEvents();
  }
};

const { prev, next } = usePagination({
  currentPage: pageTracker.value,
  pageSize: totalPages.value,
  total: 0,
});

const range = (start: number, end: number) => {
  return Array<any>(end - start + 1)
    .fill(undefined)
    .map((_, idx) => start + idx);
};
</script>

<template>
  <div>
    <div
      v-if="totalPages > 0"
      class="flex flex-wrap border-t border-t-slate-200/30 justify-between pb-2 mx-2"
    >
      <div>
        <a
          href="#"
          class="relative inline-flex items-center sm:px-2 py-2 text-sm font-medium hover:text-green400"
          :class="[
            pageTracker === 1 || props.disabled
              ? 'text-gray-light pointer-events-none'
              : 'text-gray-500',
          ]"
          @click="
            prev();
            backward();
          "
        >
          <ChevronLeftIcon class="h-5 w-6" aria-hidden="true" />
          <span class="ml-1 hidden sm:block">Previous</span>
        </a>
      </div>

      <div
        class="relative z-0 inline-flex -space-x-px --0.5"
        aria-label="Pagination"
      >
        <a
          v-for="n in totalPages"
          v-show="totalPages <= 7"
          :key="n"
          href="#"
          aria-current="page"
          class="text-gray-500 relative inline-flex items-center px-4 py-2 text-sm font-medium"
          :class="{
            ' border-t-2  px-2 z-10 text-green400 border-green400 ':
              n === pageTracker,
            'text-gray-300 pointer-events-none': props.disabled,
          }"
          :disabled="props.disabled ? 'pointer-events-none' : ''"
          @click="toggle(n)"
        >
          {{ n }}
        </a>

        <a
          v-for="n in range(1, firstThree)"
          v-show="totalPages > 7"
          :key="n"
          href="#"
          aria-current="page"
          class="text-gray-500 relative inline-flex items-center px-4 py-2 text-sm font-medium"
          :class="{
            ' border-t-2 px-2 z-10 text-green400 border-green400':
              n === pageTracker,
            'text-gray-300 pointer-events-none': props.disabled,
          }"
          @click="toggle(n)"
        >
          {{ n }}
        </a>
        <a
          v-show="totalPages > 7"
          v-if="middleChecker"
          href="#"
          aria-current="page"
          class="text-gray-500 relative inline-flex items-center px-4 py-2 text-sm font-medium"
          :class="{
            'text-gray-300 pointer-events-none': props.disabled,
          }"
        >
          ...
        </a>
        <!-- <div > -->
        <a
          v-for="n in range(middleStart, middleEnd)"
          v-show="pageTracker > 4 && pageTracker < totalPages - 2"
          :key="n"
          href="#"
          aria-current="page"
          class="text-gray-500 relative inline-flex items-center px-4 py-2 text-sm font-medium"
          :class="{
            'border-t-2 px-2 z-10 text-green400 border-green400':
              n === pageTracker,
            'text-gray-300 pointer-events-none': props.disabled,
          }"
          @click="toggle(n)"
        >
          {{ n }}
        </a>
        <!-- </div> -->
        <a
          v-show="totalPages > 7"
          href="#"
          aria-current="page"
          class="text-gray-500 relative inline-flex items-center px-4 py-2 text-sm font-medium"
          :class="{
            'text-gray-300 pointer-events-none': props.disabled,
          }"
        >
          ...
        </a>
        <a
          v-for="n in range(lastThree, totalPages)"
          v-show="totalPages > 7"
          :key="n"
          href="#"
          aria-current="page"
          class="text-gray-500 relative inline-flex items-center px-4 py-2 text-sm font-medium"
          :class="{
            'border-t-2 px-2 z-10 text-green400 border-green400':
              n === pageTracker,
            'text-gray-300 pointer-events-none': props.disabled,
          }"
          @click="toggle(n)"
        >
          {{ n }}
        </a>
      </div>
      <div>
        <a
          href="#"
          class="relative inline-flex items-center sm:px-2 py-2 text-sm font-medium hover:text-green400"
          :class="[
            pageTracker === totalPages || props.disabled
              ? 'text-gray-light pointer-events-none'
              : 'text-gray-500',
          ]"
          @click="
            next();
            forward();
          "
        >
          <span class="mr-1 hidden sm:block">Next</span>
          <ChevronRightIcon class="h-5 w-6" aria-hidden="true" />
        </a>
      </div>
    </div>
    <div v-else class="flex flex-wrap justify-between mx-10">
      <div>
        <a
          href="#"
          class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-50 pointer-events-none mr-2 hover:text-green400"
        >
          <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
          <span class="ml-1 hidden sm:block">Previous</span>
        </a>
      </div>
      <div>
        <a
          href="#"
          class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-50 pointer-events-none hover:text-green400"
        >
          <span class="mr-1 hidden sm:block">Next</span>
          <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </div>
  </div>
</template>
