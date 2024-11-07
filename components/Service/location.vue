<template>
  <section class="w-full flex flex-col gap-8 py-4">
    <div class="flex flex-col gap-4 lg:gap-8 lg:flex-row w-full">
      <div class="w-full flex-col gap-4">
        <h-select
          :items="location"
          label="Region/City"
          name="region or city"
          v-model="located_at"
        >
        </h-select>
        <h-select
          :items="subLocation || []"
          label="Subcity"
          name="subcity"
          v-model="sub_located_at"
        >
        </h-select>
        <h-text-field
          class="py-2 w-full"
          name="Phone"
          leadingText="+251"
          type="text"
          rules="required|phone:9"
          label="Phone Number"
          placeholder="912345678"
        />
      </div>
      <div class="w-full flex lg:flex-col lg:gap-[4rem] flex-col-reverse">
        <h-rich-text
          label="Address Detail"
          rules="required"
          toolbar="minimal"
          name="address detail"
          placeholder="Enter the specific description of address like kebele 1"
          quillClass="min-h-[7rem] w-full"
        />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useField } from "vee-validate";

const location: any = ["Amhara", "Tigray", "Oromia", "Addis Ababa"];
const { value } = useField("subcity");
const subLocatedValue: any = {
  Amhara: ["BahirDar", "DebreMarkos", "Gonder", "Debre Birhan"],
  Oromia: ["Ambo", "Adama"],
  Tigray: ["Mekele", "Adigrat"],
  "Addis Ababa": ["Bole", "Saris 22 Mazoria"],
};
const located_at = ref("");
const sub_located_at = ref("dddddddddd");

const subLocation = computed(() => {
  return subLocatedValue[`${located_at.value}`];
});

watch(located_at, (newdata) => {
  console.log(newdata);
  value.value = "";
  console.log(sub_located_at.value);
  sub_located_at.value = "";
});
</script>
