<template>
  <div class="flex items-center gap-2 w-min">
    <input
      type="checkbox"
      :id="props.id"
      class="appearance-none w-4 h-4 checked:ring-1 accent-green400 ring-offset-2 rounded-[0.2rem] text-white border-green400 border-1 active:bg-green400 focus:ring-green400 focus:text-green400 checked:text-green400 cursor-pointer"
      v-model="checkmodel"
      :value="props.id"
    />
    <label
      :for="props.id"
      v-if="props.label"
      :class="props.class"
      class="text-sm font-semibold cursor-pointer "
      >{{ props.label }}</label
    >
  </div>
</template>
<script lang="ts" setup>
interface PropsInterface{
  id: string,
  label?: string,
  value?: string,
  modelValue: Array<string|number>,
  class?: string,

}
const props = defineProps<PropsInterface>();

const emit = defineEmits(["update:modelValue"]);

const checkmodel = computed({
  get: () => {
    return props.modelValue;
  },
  set: (value) => {
    console.log(value);
    emit("update:modelValue", value);
  },
});
</script>
