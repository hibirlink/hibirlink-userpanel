<template>
  <section
    class="fixed top-16 z-50 bg-green1100 overflow-hidden pl-6 pr-10 py-4 xl:max-w-[572px] md:max-w-[510px] sm:max-w-[472px] max-w-[372px] drop-shadow-2xl rounded-bl-2xl rounded-tl-3xl rounded-br-3xl transition-all ease-in-out duration-300"
    :class="[showNotification ? 'right-4' : '-right-full']"
  >
    <XCircleIcon
      @click="onClose"
      class="w-8 h-8 mx-2 cursor-pointer hover:text-red text-gray absolute top-3 right-2 text-opacity-30 transition-all ease-in-out duration-300"
    />
    <p
      class="font-semibold line-clamp-3 pr-4"
      :class="[success ? 'text-green400' : 'text-red']"
    >
      <slot v-if="!message"></slot>
      {{ message }}
    </p>
  </section>
</template>
<script setup lang="ts">
import { XCircleIcon } from "@heroicons/vue/24/outline";

interface Props {
  message?: string;
  success?: boolean;
  showNotification: boolean;
}

const emits = defineEmits(["close"]);
const props = withDefaults(defineProps<Props>(), {
  success: false,
  showNotification: false,
});

const showNotification = ref(props.showNotification);

watch(
  () => props.showNotification,
  (value) => {
    if (value) showNotificationMethod();
  }
);

const onClose = () => {
  showNotification.value = false;
  emits("close");
};

const showNotificationMethod = () => {
  showNotification.value = true;
  return setTimeout(() => {
    showNotification.value = false;
    emits("close");
  }, 6000);
};
</script>
