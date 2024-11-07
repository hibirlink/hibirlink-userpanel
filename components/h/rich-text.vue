<template>
  <div class="mb-4">
    <p class="text-gray font-bold mb-2">{{ label }}</p>
    <QuillEditor
      :class="props.quillClass ? props.quillClass : 'min-h-[8.5rem]'"
      theme="snow"
      :toolbar="toolbar || 'essential'"
      v-model:content="quillContent"
      placeholder="Put your discount reason here."
      @update:content="quillValueChange"
    />
    <p class="px-1 py-2 text-sm text-red font-body">
      {{ errorMessage }} &nbsp;
    </p>
  </div>
</template>
<script setup lang="ts">
import { Delta, QuillEditor } from "@vueup/vue-quill";
import { useField } from "vee-validate";
const quillContent = ref();

interface QuillPropsInterface {
  quillClass?: string;
  placeholder: string;
  toolbar?: string;
  name: string;
  rules: string;
  label: string;
}
const props = defineProps<QuillPropsInterface>();
const emit = defineEmits(["update:modelValue"]);
const { value: quillValue, errorMessage } = useField(props.name, props.rules);
if (quillValue.value) quillContent.value = quillValue.value;

const quillValueChange = (delta: Delta) => {
  if (quillContent.value.ops[0].insert === "\n") {
    quillValue.value = null;
  } else {
    quillValue.value = delta;
  }
};
</script>