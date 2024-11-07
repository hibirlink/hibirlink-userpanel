<template>
  <div>
    <h-text-field
      class="py-2"
      label="Discount (optional)"
      name="Discount"
      placeholder="Discount in %"
      type="number"
    />

    <div v-show="discountValue" class="w-full">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div class="">
          <h-text-field
            class="py-2"
            label="Discount Begin Date"
            name="Discount Start Date"
            placeholder="Discount in %"
            type="date"
            rules="discount:Discount"
          />
        </div>
        <div class="">
          <h-text-field
            class="py-2"
            label="Discount End Date"
            name="Discount End Date"
            placeholder="Discount in %"
            type="date"
            rules="discount:Discount"
          />
        </div>
      </div>
      <h-rich-text
        cls="min-h-[8.5rem]"
        name="Discount Reason"
        rules="customQuill"
        label="Discount Reason"
        placeholder="Enter discount Value"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useField } from "vee-validate";
const { value: discountValue, errorMessage: discountError } =
  useField("Discount");
</script>
