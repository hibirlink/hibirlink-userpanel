<template>
  <div class="flex flex-col gap-2 ml-2">
    <h1 class="text-2xl font-bold">Availability</h1>
    <span class="text-sm text-slate-400">Per Week</span>
    <div class="flex flex-row flex-wrap gap-5">
      <h-check-box label="Monday" value="Monday" id="monday" v-model="days" />
      <h-check-box
        label="Tuesday"
        value="Tuesday"
        id="tuesday"
        v-model="days"
      />
      <h-check-box
        label="Wednesday"
        value="Wednesday"
        id="wednesday"
        v-model="days"
      />
      <h-check-box
        label="Thursday"
        value="Thursday"
        id="thursday"
        v-model="days"
      />
      <h-check-box label="Friday" value="Friday" id="friday" v-model="days" />
      <h-check-box
        label="Saturday"
        value="Saturday"
        id="saturday"
        v-model="days"
      />
      <h-check-box label="Sunday" value="Sunday" id="sunday" v-model="days" />
    </div>
    <span v-if="errorDay" class="text-red text-sm">{{ errorDay }}</span>
    <div class="flex flex-col gap-2">
      <span class="text-sm text-slate-400 pt-4">Per Day</span>
      <div class="flex gap-6 flex-wrap">
        <h-radio-button
          label="24 hours"
          name="hour"
          value="24 hours"
          id="hour24"
          v-model="valueHour"
        />
        <h-radio-button
          label="Working Hours"
          name="hour"
          value="working hours"
          id="working"
          v-model="valueHour"
        />
        <h-radio-button
          label="Dynamic"
          name="hour"
          value="dynamic"
          id="dynamic"
          v-model="valueHour"
        />
      </div>
      <span v-if="errorHour" class="text-red text-sm">{{ errorHour }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useField} from "vee-validate"
const { value: valueDay, errorMessage: errorDay } = useField(
  "days",
  "required",
  { keepValueOnUnmount: true }
);

const { value: valueHour, errorMessage: errorHour } = useField(
  "hour",
  "required",
  { keepValueOnUnmount: true, initialValue: "" }
);

if (!valueHour.value) {
  valueHour.value = "";
}

const days: any = ref([]);
if (valueDay.value) {
  days.value = Object.values(valueDay.value);
}

watch(days, (newValue) => {
  if (newValue) valueDay.value = newValue;
});
</script>
