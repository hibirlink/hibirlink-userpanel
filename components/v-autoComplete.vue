<template>
  <div class="w-full md:px-[15%] py-2 relative">
    <Combobox v-model="selected_value" @update:modelValue="updateSearch">
      <div class="w-full relative">
        <ComboboxInput
          placeholder="Search"
          class="h-[2.2rem] placeholder:text-slate-300 placeholder:text-sm pl-3 bg-transparent outline-none ring-offset-0 rounded border border-lemon focus:border-green300 w-full"
          @keyup="onChange"
          :display-value="(value:any)=>value"
        />
        <span
          @click="searchClicked"
          class="absolute right-0 top-0 flex items-center justify-center h-[2.2rem] border border-lemon hover:border-green400 hover:cursor-pointer hover:bg-green400 bg-lemon px-3 rounded-r"
        >
          <MagnifyingGlassIcon class="w-5 h-5 text-white"></MagnifyingGlassIcon>
        </span>
      </div>
      <div class="relative w-full">
        <ComboboxOptions
          class="bg-green1000 rounded absolute drop-shadow-xl z-10 top-[0.25rem] left-0 w-full"
          :class="[
            !(query === '' || (data.length < 1 && query !== ''))
              ? 'border-lemon border-[1px] border-opacity-50'
              : '',
          ]"
        >
          <!-- <span
            v-if="data.length < 1 && query !== ''"
            class="pl-6 py-1 text-center block w-full"
            >Not Results</span
          > -->
          <ComboboxOption
            v-for="searched in data"
            :key="searched"
            :value="searched"
            v-slot="{ selected, active }"
          >
            <li
              class="cursor-pointer relative hover:text-white flex gap-2 hover:bg-lemon py-1 pl-5"
              :class="{
                '': selected,
                'bg-lemon text-white': active,
              }"
            >
              <!-- <span
                v-if="selected"
                class="absolute inset-0 left-0 flex items-center pl-3"
                :class="{ 'text-white': active, 'text-teal-600': !active }"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span> -->
              {{ searched }}
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </div>
    </Combobox>
  </div>
</template>
<script setup lang="ts">
import {
  Combobox,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/vue";
import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/vue/24/solid";

interface AutoCompletePropsInterface {
  modelValue?: string;
  data?: string[] | string | any;
}

const props = withDefaults(defineProps<AutoCompletePropsInterface>(), {
  modelValue: "",
  data: [],
});

const emit = defineEmits<{
  (e1: "update:data", id: string | number): void;
  (e1: "update:value", value: string | number): void;
}>();

const selected_value = ref("");
const query = ref("");

const updateSearch = (value: any) => {
  selected_value.value = value;
  emit("update:data", value);
};

const searchClicked = () => {
  updateSearch(query.value);
};

const onChange = (event: any) => {
  query.value = event.target.value;
  emit("update:value", event.target.value);
};
</script>
