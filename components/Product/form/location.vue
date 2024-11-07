<template>
  <section class="w-full flex flex-col items-center justify-center">
    <div class="w-full md:w-1/2 grid items-center gap-5">
      <div class="w-full grid grid-cols-2 gap-5">
        <h-select
          :items="location"
          name="city"
          label="City"
          v-model="located_at"
        ></h-select>
        <h-select
          :items="subLocation || []"
          name="subCity"
          label="sub City"
        ></h-select>
      </div>
      <h-rich-text
        cls="min-h-[8.5rem]"
        placeholder="Put your location Description here."
        name="locationDescription"
        rules="required"
        label="Location Description"
      />
    </div>
  </section>
</template>
<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import { CheckIcon } from "@heroicons/vue/24/solid";
import { useField } from "vee-validate";

const location = ["Amhara", "Tigray", "Oromia", "Addis Ababa"];
const { value } = useField("subCity");
const subLocatedValue = {
  Amhara: ["BahirDar", "DebreMarkos", "Gonder", "Debre Birhan"],
  Oromia: ["Ambo", "Adama"],
  Tigray: ["Mekele", "Adigrat"],
  "Addis Ababa": ["Bole", "Saris 22 Mazoria"],
};
const located_at = ref("");

const subLocation = computed(() => {
  return subLocatedValue[`${located_at.value}`];
});

watch(located_at, (newdata) => {
  value.value = "";
});
</script>
