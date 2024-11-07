<template>
  <main
    class="min-w-full h-full flex flex-col gap-y-8 items-center justify-top mx-auto"
  >
    <header class="flex items-center justify-center">
      <div
        class="relative flex flex-col items-end gap-y-2"
        v-for="(step, i) in steps"
        :key="step.key"
      >
        <div class="flex items-center">
          <hr
            class="h-[0.21rem] overflow-hidden outline-none border-none"
            :class="[
              state > i
                ? 'bg-lemon'
                : state == i
                ? 'bg-lemon'
                : 'bg-gray-light',
              i == 0 ? 'w-0' : props.lineClass,
            ]"
          />
          <div
            class="w-5 h-5 rounded-full flex items-center justify-center"
            :class="
              state > i
                ? 'bg-lemon'
                : state == i
                ? 'bg-green1000 border-[5px] border-lemon'
                : 'bg-gray-light border-[5px] border-green1000'
            "
          >
            <CheckIcon
              :class="state > i ? 'flex' : 'hidden'"
              class="w-3 h-3 text-green1000"
            />
          </div>
        </div>
        <h4
          class="text-gray font-semibold absolute -right-[70px] text-sm text-center w-40 top-6"
        >
          {{ step.value }}
        </h4>
      </div>
    </header>

    <form @submit.prevent="onSubmit" class="w-full my-3">
      <slot :name="steps[state].key" :state="state" :indx="state"> </slot>
      <div v-if="!isForAdd" class="flex flex-row justify-end mb-7">
        <h-button
          name="Update"
          type="submit"
          class="bg-lemon uppercase tracking-wide w-28 py-1.5 rounded-sm font-semibold text-green200 self-end ml-auto flex items-center justify-center gap-1 hover:bg-green400 transition-colors ease-in-out duration-300"
        >
        </h-button>
      </div>
      <footer class="w-full flex items-center justify-between">
        <h-button
          name="Previous"
          type="button"
          @click="onStepDown(-1)"
          v-if="state > 0"
          class="bg-lemon uppercase tracking-wide w-28 py-1.5 rounded-sm font-semibold text-green200 ml-1 flex items-center justify-center gap-1 hover:bg-green400 transition-colors ease-in-out duration-300"
        >
        </h-button>
        <h-button
          :name="steps.length - 1 == state ? 'Done' : 'Next'"
          :type="isForAdd ? 'submit' : 'button'"
          @click="isForAdd ? null : next()"
          v-if="state < steps.length"
          class="bg-lemon uppercase tracking-wide w-28 py-1.5 rounded-sm font-semibold text-green200 self-end ml-auto flex items-center justify-center gap-1 hover:bg-green400 transition-colors ease-in-out duration-300"
        >
          <CheckIcon
            v-if="steps.length - 1 == state"
            class="w-5 h-5 text-green200"
          />
        </h-button>
      </footer>
    </form>
  </main>
</template>
<script setup lang="ts">
import { CheckIcon } from "@heroicons/vue/24/solid";
import { useForm } from "vee-validate";

type Step = {
  key: string;
  value: string;
};
interface Props {
  steps: Step[];
  lineClass?: string;
  validationSchema?: any;
  isForAdd?: boolean;
  initialValue?: any;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  isForAdd: true,
  lineClass:
    "3xl:w-[14rem] 2xl:w-[12rem] xl:w-[10rem] lg:w-[8rem]  md:w-[6rem] w-[4rem]",
});

const state = ref(0);

const emit = defineEmits(["submit"]);
const currentSchema = computed(() => {
  return props.validationSchema[state.value];
});
const { handleSubmit, setValues } = useForm({
  keepValuesOnUnmount: true,
  validationSchema: currentSchema,
});
const initialValueComputed = computed(() => {
  return props.initialValue;
});

if (initialValueComputed.value) {
  setValues(initialValueComputed.value);
}
watch(initialValueComputed, (newValue) => {
  setValues(newValue);
});

const onSubmit: any = handleSubmit((values) => {
  if (props.isForAdd) {
    if (props.steps.length - 1 === state.value) {
      emit("submit", values);
      return;
    }
    state.value += 1;
  } else {
    emit("submit", values, state.value);
  }
});

const onStepDown = (value: number) => {
  if (state.value >= 1) state.value += value;
};

const next = () => {
  if (state.value < props.steps.length - 1) state.value += 1;
};
</script>
