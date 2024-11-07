<template>
  <form
    class="flex flex-col min-h-[calc(100vh-3.7rem)] items-center justify-center min-w-full gap-8 py-5"
  >
    <h1 class="font-bold text-green100 text-lg lg:text-xl xl:text-2xl">
      Edit Realtime Service
    </h1>
    <h-stepper
      :steps="[
        { key: 'basics', value: 'Basics' },
        { key: 'location', value: 'Location' },
        { key: 'license_payment_info', value: 'License and Payment Info' },
      ]"
      v-model="state"
      @next="checkForm"
    >
      <template #basics="{ state, indx }">
        <template v-if="state == indx">
          <section class="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 py-4">
            <div class="flex-1 w-full">
              <h-text-field
                class="py-2"
                name="Service Name"
                placeholder="Hibir Transport"
                type="text"
                rules="required"
                label="Service Name"
              />
              <div
                class="w-full h-52 my-2 border-2 border-lemon border-dashed rounded-md"
              ></div>
              <div class="my-2">
                <h3 class="font-bold text-gray mb-2">
                  Other Contact Information
                </h3>
                <QuillEditor
                  theme="snow"
                  toolbar="minimal"
                  v-model:content="content"
                  placeholder="Add other social media or contact informations here! Use the link tag to add social account links."
                  class="min-h-[9rem]"
                />
              </div>
            </div>
            <div class="flex-1 w-full">
              <div class="flex-1 w-full">
                <p class="text-gray font-bold mb-[0.4rem]">Category</p>
              </div>
              <div
                class="w-full border-[1.5px] border-gray-light hover:border-lemon rounded-lg bg-transparent"
              >
                <h-select
                  :items="['one', 'two', 'tree', 'four']"
                  v-model="selectCategory"
                ></h-select>
              </div>
              <p class="px-1 py-1 text-sm text-red font-body" id="email-error">
                {{ "" || "" }} &nbsp;
              </p>
              <h-text-field
                class="py-2 w-full"
                name="Phone"
                leadingText="+251"
                type="text"
                rules="required|phone:9"
                label="Phone Number"
                placeholder="912345678"
              />
              <div class="my-2">
                <h3 class="font-bold text-gray mb-2">Service Detail</h3>
                <QuillEditor
                  theme="snow"
                  toolbar="essential"
                  v-model:content="content"
                  placeholder="Describe your service detaily here."
                  class="min-h-[16.3rem]"
                />
              </div>
            </div>
          </section>
        </template>
      </template>
      <template #location="{ state, indx }">
        <template v-if="state == indx">
          <section class="w-full grid grid-cols-1 gap-8 py-4">
            <geo-location />
          </section>
        </template>
      </template>
      <template #license_payment_info="{ state, indx }">
        <template v-if="state == indx">
          <section class="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 py-4">
            <div class="flex-1 w-full">
              <h-text-field
                class="py-2"
                name="Account Number"
                placeholder="1000 --------"
                type="text"
                rules="required"
                label="Bank Account"
              />
              <div
                class="w-full h-64 my-2 border-2 border-lemon border-dashed rounded-md"
              ></div>
            </div>
            <div class="flex-1 w-full">
              <div>
                <h3 class="font-bold text-gray mb-2">I do not know</h3>
                <QuillEditor
                  theme="snow"
                  toolbar="essential"
                  v-model:content="content"
                  placeholder="Describe your service detaily here."
                  class="min-h-[17rem]"
                />
              </div>
            </div>
          </section>
        </template>
      </template>
    </h-stepper>
  </form>
</template>
<script setup lang="ts">
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const selectCategory = ref("Select Category");
const state = ref(0);
const content = ref("");
const checkForm = () => {
  state.value += 1;
};
useHead({
  title: "Edit Realtime Service",
});
definePageMeta({
  middleware: "before-route-entry",
  layout: "custom",
});
</script>
