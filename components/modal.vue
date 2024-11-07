<template>
  <div
    :class="{ 'bg-opacity-0': isClosed, 'bg-opacity-100': !isClosed }"
    v-show="isClosed"
    @click.self="toggle"
    class="w-full bg-black/30 h-full overflow-y-auto duration-700 flex justify-center py-[2rem] items-center transition-colors z-50 fixed top-0 left-0"
  >
    <slot name="modal" :isClosed="isClosed" class="justify-items-center">
    </slot>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  isRemoved: Boolean,
});

const emit = defineEmits(["getUpdateParent"]);
const customProps = computed(() => {
  console.log(props.isRemoved);
  return props.isRemoved;
});
const isClosed = ref(props.isRemoved);
watch(customProps, (newValue) => {
  console.log(newValue);
  isClosed.value = newValue;
});

const toggle = () => {
  isClosed.value = false;
  emit("getUpdateParent", isClosed.value);
};
</script>
