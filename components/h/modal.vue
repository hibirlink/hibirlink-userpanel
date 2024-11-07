<template>
  <div
    :class="[
      showModal ? 'scale-100' : 'scale-0',
      isError ? 'border-red' : 'border-green400',
    ]"
    class="fixed top-0 right-0 max-w-[24rem] h-fit px-6 py-2 border bg-green1100 my-2 mr-2 rounded-md transition-transform ease-in-out duration-200"
  >
    <p class="font-bold" :class="isError ? 'text-red' : 'text-green400'">
      {{ message }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface ModalProps {
  message: string;
  showModal: boolean;
  isError?: boolean;
}
defineProps<ModalProps>();
</script>
