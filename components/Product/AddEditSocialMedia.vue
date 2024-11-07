<template>
  <section class="">
    <form
      @submit.prevent="handleAddSocialAccount"
      class="w-full flex flex-col items-center justify-center"
    >
      <h1
        class="text-3xl font-bold font-nunito text-green200 text-left w-full max-w-[27rem] mb-3"
      >
        Add Social Account
      </h1>
      <h1
        class="text-base font-semibold font-nunito text-gray text-left w-full max-w-[27rem] mb-5"
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit vero
        molestiae pariatur.
      </h1>
      <h-select
        class="w-full mx-auto"
        :items="['Facebook', 'Instagram', 'Telegram']"
        name="SocialMediaType"
        label="Social Media Type"
        rules="required"
        v-model="socialMediaType"
      ></h-select>

      <div class="w-full mx-auto">
        <h-text-field
          class="py-2 rounded-r-lg"
          name="SocialMediaLink"
          placeholder="Social Account Link"
          rules="required"
          type="text"
          v-model="socialMediaLink"
          label="Account Link"
        />
      </div>

      <div class="w-full mt-7">
        <HButton
          type="submit"
          name="Add Social Account"
          button_class="px-7"
          class="w-full"
        ></HButton>
      </div>
    </form>
  </section>
</template>
<script setup lang="ts">
import { useForm } from "vee-validate";

const socialMediaType = ref("");
const socialMediaLink = ref("");
const emits = defineEmits(["add-account"]);

const { handleSubmit, resetForm } = useForm();
const handleAddSocialAccount = handleSubmit(
  (value) => {
    emits("add-account", {
      type: socialMediaType.value,
      value: socialMediaLink.value,
    });
    resetForm();
  },
  (error) => {}
);
</script>
