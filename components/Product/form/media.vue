<template>
  <section class="flex items-center justify-center flex-col">
    <div
      class="flex w-full md:w-[90%] gap-8 md:flex-row flex-col md:mx-10 mx-2 my-8"
    >
      <div class="w-full md:w-[40%]">
        <h1 class="text-gray font-bold mb-2">Thumb Image</h1>
        <h-file-upload
          :limit="1"
          id="cover"
          accept="image/*"
          size="4 mb"
          name="thumb"
        />
      </div>

      <div class="w-full md:w-[60%]">
        <h1 class="text-gray font-bold mb-2">Other Images</h1>
        <h-file-upload
          :limit="5"
          id="media"
          accept="image/*"
          size="4 mb"
          name="others"
        />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
</script>
