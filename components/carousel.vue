<template>
  <div class="selection:bg-none">
    <div class="relative w-full">
      <nuxt-img
        :src="prop.productImage[imageIndex].image"
        quality="100"
        loading="lazy"
        format="webp"
        class="w-full h-[400px] object-center object-cover"
        :class="height ? height : ''"
      />
      <ChevronLeftIcon
        v-if="handleLeft"
        @click="prev()"
        class="absolute left-5 top-[calc(50%-48px)] w-8 h-24 cursor-pointer fill-green1000 shadow-2xl"
      />
      <ChevronRightIcon
        v-if="handleRight"
        @click="next()"
        class="absolute right-5 top-[calc(50%-48px)] w-8 h-24 cursor-pointer fill-green1000 shadow-2xl"
      />
    </div>
    <div
      v-if="prop.productImage.length > 1 && gallery"
      class="w-full flex overflow-x-scroll scrollbar-hide mt-5"
    >
      <nuxt-img
        v-for="(image, index) in prop.productImage"
        :key="index"
        :src="image.image"
        quality="100"
        loading="lazy"
        format="webp"
        class="w-[150px] h-[90px] object-cover object-center mr-8 rounded-md"
        @click="changeImage(index)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";
var imageIndex = ref(0);
var handleLeft = ref(false);
var handleRight = ref(false);
interface productImageData {
  image: string;
}
interface productImageInterface {
  productImage: Array<productImageData>;
  gallery?: boolean;
  height?: string;
}

const prop = defineProps<productImageInterface>();
function changeImage(index: number) {
  if (index != imageIndex.value) imageIndex.value = index;
  if (imageIndex.value > 0 && imageIndex.value < prop.productImage.length - 1) {
    handleLeft.value = true;
    handleRight.value = true;
  } else if (imageIndex.value == 0) {
    handleLeft.value = false;
    handleRight.value = true;
  } else if (imageIndex.value == prop.productImage.length - 1) {
    handleRight.value = false;
    handleLeft.value = true;
  }
}

const next = (): void => {
  if (imageIndex.value < prop.productImage.length - 1) {
    imageIndex.value++;
  }
  if (imageIndex.value == prop.productImage.length - 1) {
    handleRight.value = false;
  }
  handleLeft.value = true;
};

const prev = (): void => {
  if (imageIndex.value > 0) {
    imageIndex.value--;
  }
  if (imageIndex.value == 0) {
    handleLeft.value = false;
  }
  handleRight.value = true;
  console.log(handleRight.value);
};

if (prop.productImage.length > 1) handleRight.value = true;
</script>
