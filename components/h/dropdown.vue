<template>
  <div class="text-right">
    <Menu as="div" class="relative w-full inline-block text-left">
      <div>
        <MenuButton
          v-slot="{ open }"
          class="justify-center w-fit py-1 items-end"
        >
          <div class="w-fit group flex gap-2 items-end hover:cursor-pointer">
            <component
              :is="leading_icon"
              class="group-hover:fill-green300 transition-colors ease-in-out duration-300 fill-green200 w-8 h-8"
            ></component>
            <h1
              v-if="label"
              class="transition-colors ease-in-out duration-300 font-semibold"
            >
              {{ label }}
            </h1>
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
          class="absolute z-10 min-w-[10rem] w-full mt-0 right-0 top-8 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div
            :class="
              items.length > 6
                ? 'sm:grid sm:grid-cols-2 sm:gap-x-3 sm:gap-y-1 '
                : ''
            "
            class="px-1 py-1"
          >
            <MenuItem
              v-for="item in items"
              :key="item.name"
              v-slot="{ active, close }"
            >
              <h1
                @click="handleClick(item, close)"
                class="transition-all ease-in-out duration-300 font-semibold"
                :class="[
                  active
                    ? ' bg-lemon text-green1100 cursor-pointer'
                    : 'text-green200 ',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
                {{ item.name }}
              </h1>
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

interface ItemInterface {
  name: string;
  value: string | number | boolean | Array<any>;
}

interface PropInterface {
  leading_icon: Function;
  label?: string;
  items: Array<ItemInterface>;
}

const props = defineProps<PropInterface>();
const emit = defineEmits(["optionClicked"]);
const handleClick = (item: ItemInterface, close: Function): void => {
  emit("optionClicked", item);
  close();
};
</script>
