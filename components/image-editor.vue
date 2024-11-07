<template>
  <div class="w-full flex flex-col gap-4">
    <div class="w-full flex flex-row flex-wrap justify-between">
      <h-check-box
        class="w-full"
        v-model="selectAll"
        :label="isSelected ? 'diselect' : 'Select All'"
        id="all"
        @click="isSelected ? deselectedAll() : selectAllFunction()"
      ></h-check-box>

      <h-button
        v-show="isSelected"
        name="Delete"
        button_class="px-3 py-1  text-sm text-white"
        @click="deleteSelectedImage"
      ></h-button>
    </div>
    <hr class="h-[1px] border-slate-300" />
    <div
      class="w-full h-[10rem] overflow-x-auto overflow-y-hidden border-green400 gap-3 flex"
    >
      <div
        v-for="im in imageValue"
        class="w-[10rem] relative min-w-[10rem] h-full"
        :key="im.id"
      >
        <span
          class="absolute top-2 right-2 h-[1.1rem] w-[1.1rem] rounded-sm bg-green-50 flex justify-center items-center"
        >
          <h-check-box
            v-model="selected_Images"
            name="selectedImage"
            :id="`${im.id}`"
          />
        </span>
        <nuxt-img
          class="w-full h-full object-center object-cover"
          :src="im.url"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const selected_Images = ref<string[]>([]);
const selectAll = ref<string[]>([]);

interface ImageInterface {
  id: number;
  url: string;
}

interface PropsInterface {
  image: Array<ImageInterface>;
  mutateGql: any;
}
const emit = defineEmits(["notifyImageDelete"]);
const props = defineProps<PropsInterface>();
const imageValue = computed(() => {
  return props.image;
});

selectAll.value = selected_Images.value.length > 0 ? ["all"] : [];

const isSelected = computed(() => {
  console.log(selected_Images);

  return selected_Images.value.length > 0;
});

watch(selected_Images, (newValue) => {
  selectAll.value = newValue.length > 0 ? ["all"] : [];
});

const selectAllFunction = () => {
  selected_Images.value = imageValue.value.map((e) => {
    return `${e.id}`;
  });
};
const deselectedAll = () => {
  selected_Images.value = [];
};

const {
  mutate: deleteImage,
  onDone: onDeleteImage,
  onError: onDeleteImageError,
} = await useCustomMutation(props.mutateGql);

const deleteSelectedImage = () => {
  deleteImage({
    ids: selected_Images.value.map((e) => {
      return Number(e);
    }),
  });
};
interface ImageValueInterface {
  id: number;
  imageURL: string;
}

onDeleteImage((response) => {
  console.log(response);

  emit("notifyImageDelete");
  selected_Images.value = [];
});

onDeleteImageError((error) => {
  console.log(error);
});
</script>
