Copy code
<template>
  <div class="">
    <div>
      <div
        class="fixed z-40 top-0 left-0 bottom-0 right-0 bg-black opacity-50"
        @click="
          () => {
            emits('close');
          }
        "
      ></div>
      <div
        class="fixed z-50 rounded-xl top-1/2 left-1/2 max-h-[80%] max-w-[30rem] w-full h-fit overflow-y-auto transform -translate-y-1/2 -translate-x-1/2 bg-white p-8 shadow-xl drop-shadow-lg"
      >
        <header class="">
          <XCircleIcon
            @click="
              () => {
                emits('close');
              }
            "
            class="w-7 h-7 ml-auto cursor-pointer hover:text-red text-green400 transition-colors duration-300 ease-in-out"
          ></XCircleIcon>
        </header>
        <main class="">
          <slot name="content"></slot>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XCircleIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";

const emits = defineEmits(["close"]);
</script>
