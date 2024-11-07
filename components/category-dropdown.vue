<template>
  <div class="text-right">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton class="inline-flex justify-center py-2">
          <div
            to="/products/category-computer-new"
            class="group flex gap-2 items-center min-w-fit hover:cursor-pointer"
          >
            <Squares2X2Icon
              class="group-hover:fill-green300 transition-colors ease-in-out duration-300 fill-green200 w-4 h-4"
            ></Squares2X2Icon>
            <h1
              class="group-hover:text-green300 text-green200 transition-colors ease-in-out duration-300"
            >
              Categories
            </h1>
            <ChevronDownIcon
              class="group-hover:fill-green300 fill-green200 w-4 h-4"
            ></ChevronDownIcon>
          </div>
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute z-10 min-w-max p-3 mt-3 left-0 top-8 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div
            :class="
              categories.length > 6
                ? 'sm:grid sm:grid-cols-2 sm:gap-x-5 sm:gap-y-1 '
                : ''
            "
            class="px-1 py-1"
          >
            <MenuItem
              v-for="category in categories"
              :key="category"
              v-slot="{ active, close }"
            >
              <NuxtLink
                :to="{ path: `${getPath()}-${category}` }"
                @click="close"
                class="transition-all ease-in-out duration-300 font-semibold"
                :class="[
                  active ? ' bg-green300 text-green1000 ' : 'text-green200 ',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
                {{ category }}
              </NuxtLink>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script lang="ts" setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ChevronDownIcon, Squares2X2Icon } from "@heroicons/vue/20/solid";

interface CategoryInterface {
  categories: string[];
  isRealTimeProduct: boolean;
  isProduct: boolean;
}

const props = defineProps<CategoryInterface>();
const route = useRoute();

const getPath = (): string => {
  return `/${props.isProduct ? "products" : "services"}/${
    props.isRealTimeProduct ? "" : "virtual/"
  }category`;
};
</script>
