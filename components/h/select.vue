<template>
  <div>
    <div class="flex-1 w-full">
      <p class="text-gray font-bold mb-[0.4rem]">{{ props.label }}</p>
    </div>
    <div
      class="text-right w-full border-[1.5px] border-gray-light hover:border-lemon rounded-lg bg-transparent"
    >
      <Menu as="div" class="relative w-full inline-block text-left">
        <div>
          <MenuButton
            v-slot="{ open }"
            class="justify-center py-[0.455rem] w-full px-4"
          >
            <div
              class="w-full justify-between group flex gap-2 items-center hover:cursor-pointer"
            >
              <!-- <Squares2X2Icon
              class="group-hover:fill-green300 transition-colors ease-in-out duration-300 fill-green200 w-4 h-4"
            ></Squares2X2Icon> -->
              <h1
                class="transition-colors ease-in-out duration-300 font-semibold truncate"
                :class="!selectValue ? 'text-[#9a9a9a]' : 'text-green200'"
              >
                {{
                  selectValue
                    ? IsObject
                      ? selectValue.name
                      : selectValue
                    : "Select " + props.label
                }}
              </h1>
              <ChevronDownIcon
                class="group-hover:fill-green300 fill-green200 w-4 h-4"
                :class="{ 'rotate-180': open }"
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
            class="absolute z-10 min-w-max w-full mt-3 left-0 top-8 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div class="px-1 py-1" v-if="IsObject">
              <MenuItem
                v-for="item in props.items"
                :key="item.id"
                v-slot="{ active, close }"
              >
                <h1
                  @click="handleClick(item, close)"
                  class="transition-all ease-in-out duration-300 font-semibold"
                  :class="[
                    active
                      ? ' bg-lemon text-green1000 cursor-pointer'
                      : 'text-green200 ',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  ]"
                >
                  {{ item.name }}
                </h1>
              </MenuItem>
            </div>
            <div class="px-1 py-1" v-else>
              <MenuItem
                v-for="item in props.items"
                :key="item"
                v-slot="{ active, close }"
              >
                <h1
                  @click="handleClick(item, close)"
                  class="transition-all ease-in-out duration-300 font-semibold"
                  :class="[
                    active
                      ? ' bg-lemon text-green1000 cursor-pointer'
                      : 'text-green200 ',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  ]"
                >
                  {{ item }}
                </h1>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
    <p class="px-1 py-1 text-sm text-red font-body" id="email-error">
      {{ errorMessage }} &nbsp;
    </p>
  </div>
</template>

<script setup>
import { isArray } from "@apollo/client/cache/inmemory/helpers";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ChevronDownIcon, Squares2X2Icon } from "@heroicons/vue/20/solid";
import { useField } from "vee-validate";
import { isObject } from "vue-composable";

const props = defineProps({
  items: Array,
  name: String,
  label: String,
  modalValue: { type: Object, required: false },
});
const { value: selectValue, errorMessage } = useField(props.name, "required");

const emit = defineEmits(["update:modelValue"]);
const handleClick = (item, close) => {
  selectValue.value = item;
  emit("update:modelValue", item);
  close();
};

const IsObject = computed(() => {
  if (props.items.length > 0) {
    return isObject(props.items[0]);
  } else return false;
});
</script>
