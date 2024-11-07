<template>
  <div class="grid md:grid-cols-2 md:gap-5">
    <div>
      <div class="">
        <h-text-field
          class="py-2"
          label="Discount (optional)"
          name="discount"
          placeholder="Discount in %"
          type="number"
        />
      </div>
      <div class="">
        <h-text-field
          class="py-2"
          label="Discount Begin Date"
          name="discountStartDate"
          placeholder="Discount in %"
          type="date"
          rules="discount:Discount"
        />
      </div>
      <div class="">
        <h-text-field
          class="py-2"
          label="Discount End Date"
          name="discountEndDate"
          placeholder="Discount in %"
          type="date"
          rules="discount:Discount"
        />
      </div>
    </div>
    <div>
      <h-rich-text
        class="h-fit"
        cls="min-h-[8.5rem]"
        placeHolder="Put your discount reason here."
        name="discountReason"
        rules="customQuill"
        label="Discount Reason"
      />
      <slot name="delete"></slot>
    </div>
  </div>
</template>

<script setup>
</script>
