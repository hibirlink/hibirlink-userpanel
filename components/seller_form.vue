<template>
  <form class="flex flex-col sm:flex-row w-full gap-9">
    <div class="flex flex-col gap-2 flex-1">
      <p class="text-sm">Payment information</p>
      <div class="flex flex-row gap-4">
        <div class="flex flex-row gap-2">
          <input
            class=""
            name="payment"
            v-model="paymentType"
            type="radio"
            value="CBE"
          />
          <span>CBE Birr</span>
        </div>
        <div class="flex flex-row gap-2">
          <input
            type="radio"
            class=""
            name="payment"
            v-model="paymentType"
            value="awash"
          />
          <span>Awash Bank</span>
        </div>
        <div class="flex flex-row gap-2">
          <input
            type="radio"
            class=""
            name="payment"
            v-model="paymentType"
            value="tele"
          />
          <span>Tele Birr</span>
        </div>
      </div>
      <h-text-field
        v-model="paymentNumber"
        placeholder="Account Number "
        name="paymentType"
        class="py-2 px-1"
      />
      <div class="flex flex-col">
        <p class="text-sm">License</p>

        <textarea
          class="min-h-[9rem] w-full border bg-transparent rounded-lg border-green400"
        />
      </div>
    </div>
    <div class="flex flex-col flex-1">
      <p class="text-sm">Contact Info</p>

      <textarea
        class="min-h-[18rem] w-full border bg-transparent rounded-lg border-green400"
      />
      <div class="flex justify-end w-full pt-5">
        <button class="py-2 px-3 bg-green400 rounded-md">
          Update Seller Info
        </button>
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
const paymentType = ref(null);
const paymentNumber = ref("");
</script>
