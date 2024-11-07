<template>
  <ul class="flex flex-row gap-1 items-center">
    <li @click="readonly == true ? null : ChangeRating(1)">
      <StarIcon
        class="w-4 h-4"
        :class="[rating >= 1 ? 'text-red' : 'text-[#e5e7eb]']"
      />
    </li>
    <li @click="readonly == true ? null : ChangeRating(2)">
      <StarIcon
        class="w-4 h-4"
        :class="[rating >= 2 ? 'text-red' : 'text-[#e5e7eb]']"
      />
    </li>
    <li @click="readonly == true ? null : ChangeRating(3)">
      <StarIcon
        class="w-4 h-4"
        :class="[rating >= 3 ? 'text-red' : 'text-[#e5e7eb]']"
      />
    </li>
    <li @click="readonly == true ? null : ChangeRating(4)">
      <StarIcon
        class="w-4 h-4"
        :class="[rating >= 4 ? 'text-red' : 'text-[#e5e7eb]']"
      />
    </li>
    <li @click="readonly == true ? null : ChangeRating(5)">
      <StarIcon
        class="w-4 h-4"
        :class="[rating == 5 ? 'text-red' : 'text-[#e5e7eb]']"
      />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { StarIcon } from "@heroicons/vue/24/solid";
interface RateInterfaceProps {
  rateValue: number;
  readonly: boolean;
}
const props = defineProps<RateInterfaceProps>();

const emits = defineEmits(["update"]);

const rating = ref(Math.floor(props.rateValue));

const ChangeRating = (value: number) => {
  rating.value = value;
  emits("update", value);
};
</script>
