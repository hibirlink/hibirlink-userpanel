<template>
  <section
    class="flex flex-col min-h-[calc(100vh-3.7rem)] items-center justify-center min-w-full gap-8 py-5"
  >
    <h1 class="font-bold text-green100 text-lg lg:text-xl xl:text-2xl">
      Add Realtime Service
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
                name="Service Name"
                placeholder="Hibir Transport"
                type="text"
                rules="required"
                label="Service Name"
              />

              <div class="w-full">
                <h-select
                  :items="catagory"
                  name="category"
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
                name="account number"
              />

              <div class="w-full">
                <h-select
                  :items="['Awash', 'CBE', 'Amhara']"
                  name="Bank Type"
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
                name="holder name"
              />
              <h-text-field
                class="py-2"
                label="Tin Number"
                rules="required"
                placeholder="e.g 21343"
                type="text"
                name="tin number"
              />
            </div>
            <div class="flex flex-col lg:flex-row lg:gap-8">
              <div class="flex gap-1 flex-col w-full">
                <form-discount />
              </div>
              <div class="w-full">
                <h-rich-text
                  rules="required"
                  label="Service Detail"
                  toolbar="minimal"
                  name="service detail"
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
                  name="CoverImage"
                  @getFile="getCoverImage"
                />
              </div>
              <div class="lg:col-span-2 w-full flex flex-col gap-2">
                <span class="text-bold text-2xl">Other Images</span>
                <h-file-upload
                  class="w-full"
                  size="1 mb"
                  id="media"
                  name="media"
                  accept="image/*"
                  @getFile="getFile"
                  :limit="4"
                />
              </div>
            </div>
          </section>
        </template>
      </template>
      <template #location="{ state, indx }">
        <template v-if="state == indx">
          <div class="w-full">
            <service-location />
            <form-social-address />
            <service-avaliability />
          </div>
        </template>
      </template>
    </h-stepper>
  </section>
</template>
<script setup lang="ts">
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import InsertRTS from "@/graphQL/mutation/InsertRTS.gql";
import fetch_Category from "@/graphQL/query/service/realtime/fetchRealTimeServiceCategory.gql";
const otherImages = ref<Array<String>>([]);
const coverImage = ref("");

const getFile = (value: any) => {
  otherImages.value = value;
};
const getCoverImage = (value: any) => {
  coverImage.value = value;
};

useHead({
  title: "Add Realtime Service",
});
definePageMeta({
  middleware: "before-route-entry",
  layout: "custom",
});
const dynamicSchema = [
  {
    "Service Name": "required",
    "account number": "required",
    "service detail": "required",
    category: "required",
    "Bank Type": "required",
    "holder name": "required",
    "tin number": "required",
    "Discount Start Date": "discount:Discount",
    "Discount End Date": "discount:Discount",
    "Discount Reason": "customQuill",
  },
  {
    CoverImage: "required",
    media: "required",
  },
  {
    "region or city": "required",
    subcity: "required",
    "address detail": "required",
    days: "required",
    hour: "required",
    Phone: "required",
  },
];
const { result, onError: onFetchCategoryError } = await useCustomQuery(
  fetch_Category
);
console.log(fetch_Category);
const {
  mutate: insert_RTS,
  onDone: onRTSResult,
  onError: onRTSError,
} = await useCustomMutation(InsertRTS);

const catagory = computed(() => {
  console.log(result?.value);
  if (result && result.value)
    return result.value.RTSC?.map((e: any) => {
      return { name: e.name, id: e.id };
    });

  return [];
});

onRTSResult((result) => {
  console.log(result);
});
onRTSError((error) => {
  console.log(error);
});
onFetchCategoryError((error) => {
  console.log(error);
});

const basicSubmitHandling = async (value: any) => {
  console.log(value);
  const logo = await useFileUpload(value.CoverImage);
  console.log(logo);
  const medias = await useFileUpload(value.media);
  const images = medias.urls?.map((item) => {
    return { imageURL: item };
  });
  console.log(images);

  const discount = ref();
  if (value.Discount) {
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
      phoneNumber: value.Phone,
      region_city: value["region or city"],
      subcity: value.subcity,
      socialMedia: value["all social address"],
      description: value["address detail"],
    },
  };
  const account = {
    data: {
      account_number: value["account number"],
      account_type: value["Bank Type"],
      account_holder: value["holder name"],
    },
  };
  const RTSINSERTION = {
    object: {
      service_owner: localStorage.getItem("userID"),
      title: value["Service Name"],
      description: value["service detail"],
      avaliability: { days: value.days, hour: value.hour },
      category_id: value.category.id,
      logo: logo.urls && logo.urls[0],
      tinNumber: value["tin number"],
      service_discount: discount.value,
      realtime_service_addresses: address,
      realtime_service_images: { data: images },
      account: account,
    },
  };
  insert_RTS(RTSINSERTION);
};
</script>
