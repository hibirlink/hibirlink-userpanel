<template>
  <button
    :disabled="disabled"
    :type="type"
    :class="button_class"
    class="flex items-center gap-2 bg-gradient-to-r from-green400 to-lemon hover:shadow-md p-2 font-semibold tracking rounded-md text-green200/80 hover:bg-green400 ring-4 hover:ring-lemon hover:ring-opacity-50 focus:ring-opacity-80 focus:ring-lemon hover:bg-opacity-40 ring-opacity-50 ring-transparent transition-all ease-in-out duration-300"
  >
    <component
      :is="leading_icon"
      class="h-6 w-6 text-current cursor-pointer hover:text-current"
    />
    <p class="text-center w-full font-bold">{{ name }}</p>
    <component
      :is="trailing_icon"
      class="h-6 w-6 text-current cursor-pointer hover:text-current"
    />
  </button>
</template>

<script setup>
defineProps({
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  type: {
    type: String,
    required: false,
    default: "button",
  },
  name: {
    type: String,
    required: false,
    default: "Button",
  },
  trailing_icon: {
    type: Function,
    required: false,
    default: null,
  },
  leading_icon: {
    type: Function,
    required: false,
    default: null,
  },
  button_class: {
    type: String,
    required: false,
    default: null,
  },
});
</script>
