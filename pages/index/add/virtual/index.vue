<template>
  <section
    class="flex flex-col min-h-[calc(100vh-3.7rem)] items-center justify-center min-w-full gap-8 py-5"
  >
    <h1 class="font-bold text-green100 text-lg lg:text-xl xl:text-2xl">
      Add Virtual Service
    </h1>
    <h-stepper
      :steps="[
        { key: 'basics', value: 'Basics' },
        { key: 'media', value: 'media' },
        { key: 'location', value: 'Location' },
      ]"
      :validation-schema="dynamicSchema"
      @submit="basicSubmitHandling"
      line-class="lg:w-[20rem] min-w-[6rem] md:w-[15rem] xs:w-[10rem]"
    >
      <template #basics="{ state, indx }">
        <template v-if="state == indx">
          <section class="w-full flex flex-col py-4">
            <div class="flex flex-col lg:gap-8 lg:flex-row w-full">
              <h-text-field
                class="py-2"
                name="title"
                placeholder="Hibir Transport"
                type="text"
                rules="required"
                label="Service title"
              />

              <div class="w-full">
                <h-select
                  :items="catagory"
                  name="service_category"
                  label="Category"
                  class="w-full"
                ></h-select>

                <p class="px-1 text-sm text-red font-body" id="email-error">
                  {{ "" || "" }} &nbsp;
                </p>
              </div>
            </div>

            <div class="flex w-full lg:flex-row flex-col lg:gap-8">
              <h-text-field
                class="py-2"
                label="Account Number"
                rules="required"
                placeholder="10003232323232"
                type="text"
                name="accountNumber"
              />

              <div class="w-full">
                <h-select
                  :items="['Awash', 'CBE', 'Amhara']"
                  name="Bank Name"
                  label="Bank Type"
                  class="w-full"
                ></h-select>

                <p class="px-1 text-sm text-red font-body" id="email-error">
                  {{ "" || "" }} &nbsp;
                </p>
              </div>
            </div>
            <div class="flex w-full flex-col lg:flex-row lg:gap-8">
              <h-text-field
                class="py-2"
                label="Holder Name"
                placeholder="John mike"
                rules="required"
                type="text"
                name="holdername"
              />
              <h-text-field
                class="py-2"
                label="tin Number "
                rules="required"
                placeholder="e.g 21343"
                type="text"
                name="licence number"
              />
            </div>
            <div class="flex flex-col lg:flex-row lg:gap-8">
              <div class="w-full">
                <FormDiscount />
              </div>
              <div class="w-full">
                <h-rich-text
                  rules="required"
                  label="Service Detail"
                  toolbar="minimal"
                  name="detail"
                  placeholder="Service detail"
                  quillClass="min-h-[9rem] min-w-full"
                />
              </div>
            </div>
          </section>
        </template>
      </template>
      <template #media="{ state, indx }">
        <template v-if="state == indx">
          <section class="w-full py-4">
            <div
              class="grid gap-6 lg:grid-cols-3 grid-cols-1 items-center justify-center w-full lg:gap-8"
            >
              <div class="lg:w-[16rem] flex flex-col gap-2 mx-auto w-[16rem]">
                <span class="text-bold text-2xl">Cover Image</span>
                <h-file-upload
                  size="1 mb"
                  type="image"
                  id="coverImage"
                  name="thumbnail"
                />
              </div>
              <div class="lg:col-span-2 w-full flex flex-col gap-2">
                <span class="text-bold text-2xl">Other Images</span>
                <h-file-upload
                  class="w-full"
                  size="1 mb"
                  id="media"
                  name="medias"
                  accept="image/*"
                  :limit="4"
                />
              </div>
            </div>
          </section>
        </template>
      </template>
      <template #location="{ state, indx }">
        <template v-if="state == indx">
          <div class="w-full flex lg:flex-row flex-col lg:gap-8 gap-2">
            <div class="gap-3 w-full">
              <h-text-field
                leadingText="+251"
                name="phoneNumber"
                label="Phone Number"
                type="text"
                placeholder="99473627"
                class="w-full py-2"
                rules="required"
              />
              <h-text-field
                leadingText="url"
                name="web link"
                label="Website Link"
                type="url"
                placeholder="https://www.sombody.com"
                class="w-full py-2"
                rules="required"
              />
            </div>

            <div class="w-full">
              <h-rich-text
                rules="required"
                label="Address Detail"
                toolbar="minimal"
                name="address detail"
                placeholder="address detail"
                quillClass="min-h-[9rem] min-w-full"
              />
            </div>
          </div>
          <FormSocialAddress class="pb-[5rem] py-3" />
        </template>
      </template>
    </h-stepper>
  </section>
</template>
<script setup lang="ts">
import InsertVS from "@/graphQL/mutation/service/virtual/insertVS.gql";
import fetch_Category from "@/graphQL/query/service/virtual/fetchCategory.gql";

useHead({
  title: "Add Virtual Service",
});
definePageMeta({
  middleware: "before-route-entry",
  layout: "custom",
});
const dynamicSchema = [
  {
    title: "required",
    accountNumber: "required",
    detail: "required",
    service_category: "required",
    "Bank Name": "required",
    holdername: "required",
    "licence number": "required",
    "Discount End Date": "required",
    "Discount Reason": "customQuill",
    Discount: "required",
    "Discount Start Date": "required",
  },
  {
    thumbnail: "required",
    medias: "required",
  },
  {
    "web link": "required",
    "address detail": "required",
    phoneNumber: "required",
  },
];
const { result, onError: onFetchCategoryError } = await useCustomQuery(
  fetch_Category
);
const {
  mutate: insert_VS,
  onDone: onVSResult,
  onError: onVSError,
} = await useCustomMutation(InsertVS);

const catagory = computed(() => {
  console.log(result?.value);
  if (result && result.value)
    return result.value.VSC?.map((e: any) => {
      return { name: e.name, id: e.id };
    });

  return [];
});

onVSResult((result) => {
  console.log(result);
});
onVSError((error) => {
  console.log(error);
});
onFetchCategoryError((error) => {
  console.log(error);
});

const basicSubmitHandling = async (value: any) => {
  console.log(value);
  const logo = await useFileUpload(value.thumbnail);
  console.log(logo);
  const medias = await useFileUpload(value.medias);
  const images = medias.urls?.map((item) => {
    return { image_url: item };
  });
  console.log(images);

  const discount = ref();
  if (value["Discount"]) {
    discount.value = {
      data: {
        end_date: value["Discount End Date"],
        rate: value.Discount,
        reason: value["Discount Reason"],
        start_date: value["Discount Start Date"],
      },
    };
  }
  const address = {
    data: {
      phone_number: value.phoneNumber,
      social_media: value["all social address"],
      description: value["address detail"],
    },
  };
  const account = {
    data: {
      account_number: value["accountNumber"],
      account_type: value["Bank Name"],
      account_holder: value["holdername"],
    },
  };

  const insertVSVariable = {
    object: {
      service_owner: localStorage.getItem("userID"),
      category_id: value["service_category"].id,
      title: value.title,
      description: value.detail,
      logo: logo.urls && logo.urls[0],
      web_link: value["web link"],
      virtual_service_images: { data: images },
      account: account,
      virtual_service_addresses: address,
      service_discount: discount.value,
    },
  };

  insert_VS(insertVSVariable);
};
</script>
