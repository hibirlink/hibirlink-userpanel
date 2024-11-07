<template>
  <section
    class="flex flex-col min-h-[calc(100vh-3.7rem)] items-center justify-center min-w-full gap-8 py-5"
  >
    <h1 class="font-bold text-green100 text-lg lg:text-xl xl:text-2xl">
      Edit Virtual Service
    </h1>
    <h-stepper
      :steps="[
        { key: 'basics', value: 'Basics' },
        { key: 'media', value: 'media' },
        { key: 'location', value: 'Location' },
        { key: 'discount', value: 'discount' },
      ]"
      :validation-schema="dynamicSchema"
      @submit="basicSubmitHandling"
      :isForAdd="false"
      :initial-value="initialValue"
      line-class="lg:w-[15rem] min-w-[6rem] md:w-[10rem] w-full xs:w-[6rem]"
      v-if="virtualService"
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
                label="Service Name"
              />

              <div class="w-full">
                <h-select
                  :items="category"
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
                label="Tin Number"
                rules="required"
                placeholder="e.g 21343"
                type="text"
                name="tinnumber"
              />
            </div>
            <div class="flex flex-col-reverse lg:flex-row-reverse lg:gap-8">
              <div class="flex gap-1 flex-col w-full">
                <div class="lg:w-[16rem] flex flex-col gap-2 w-[16rem]">
                  <span class="font-bold text-gray">Cover Image</span>
                  <h-file-upload
                    size="1 mb"
                    type="image"
                    id="coverImage"
                    name="thumbnail"
                  />
                </div>
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
          </section>
        </template>
      </template>
      <template #media="{ state, indx }">
        <template v-if="state == indx">
          <section class="w-full py-4">
            <div
              class="gap-6 grid grid-cols-1 items-center justify-center w-full"
            >
              <image-editor
                :image="imageUrlComputed"
                :mutate-gql="deleteImage"
                v-if="imageURL.length > 0"
                @notify-image-delete="ImageSuccessfullDeleted"
              />

              <div class="w-full flex flex-col gap-2">
                <span class="font-bold text-gray">Add Other Images</span>
                <h-file-upload
                  class="w-full"
                  size="1 mb"
                  id="media"
                  name="medias"
                  accept="image/*"
                  @getFile="getFile"
                  :is-cleared="clearImage"
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
          <FormSocialAddress
            class="pb-[5rem] py-3"
            :social_addresses="
              JSON.parse(
                JSON.stringify(
                  virtualService.virtual_service_addresses[0].social_media
                )
              ) || []
            "
          />
        </template>
      </template>
      <template #discount="{ state, indx }">
        <template v-if="state == indx">
          <div class="w-full flex justify-end">
            <button
              @click="deleteDiscountOperation"
              v-if="discountID"
              class="rounded-md px-3 py-1 bg-green400 font-bold text-sm text-gray"
            >
              Delete
            </button>
          </div>
          <form-discount />
        </template>
      </template>
    </h-stepper>
  </section>
</template>
<script setup lang="ts">
import fetch_Category from "@/graphQL/query/service/virtual/fetchCategory.gql";
import fetchVSBYID from "@/graphQL/query/service/virtual/fetchVirtualService.gql";
import deleteImage from "@/graphQL/mutation/service/virtual/deleteImage.gql";
import updateVSMutation from "@/graphQL/mutation/service/virtual/updateVS.gql";
import addImagesForOneVS from "@/graphQL/mutation/service/virtual/addVSImages.gql";
import updateVSAddressMutation from "@/graphQL/mutation/service/virtual/updateVSAddress.gql";
import deleteDiscount from "@/graphQL/mutation/service/deleteDiscount.gql";
import updateDiscount from "@/graphQL/mutation/service/updateDiscount.gql";
import insertDiscount from "@/graphQL/mutation/service/insert_discount_for_discount.gql";
const otherImages = ref<Array<String>>([]);
const coverImage = ref("");
const imageURL = ref([]);
const clearImage = ref(false);
const getFile = (value: any) => {
  otherImages.value = value;
  console.log(otherImages.value);
};
const getCoverImage = (value: any) => {
  coverImage.value = value;
};

useHead({
  title: "Editing Virtual Service",
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
    // tinnumber: "required",
  },
  {
    thumbnail: "required",
    medias: "required",
  },
  {
    "address detail": "required",
    phoneNumber: "required",
  },
  {
    "Discount Start Date": "discount:Discount",
    "Discount End Date": "discount:Discount",
    "Discount Reason": "customQuill",
  },
];
const { result, onError: onFetchCategoryError } = await useCustomQuery(
  fetch_Category
);

const route = useRoute();

const id = computed(() => {
  return Number(route.params.id);
});
const variables = computed(() => {
  return { id: id.value };
});
const imageUrlComputed = computed(() => {
  return imageURL.value;
});

const {
  mutate: updateVS,
  onDone: onVSUpdatedResult,
  onError: onVSEUpdatedError,
} = await useCustomMutation(updateVSMutation);

const {
  mutate: addDiscount,
  onDone: onAddDiscount,
  onError: onAddDiscountError,
} = await useCustomMutation(insertDiscount);

const {
  mutate: addImages,
  onDone: onAddImageResult,
  onError: onAddImageError,
} = await useCustomMutation(addImagesForOneVS);
const {
  result: fetch_VS_BY_ID_RESULT,
  onError: onVSFetchError,
  fetchMore: fetchUpdatedVSService,
} = await useCustomQuery(fetchVSBYID, variables);

const {
  mutate: updateVSAddress,
  onDone: onUpdateVSAddressResult,
  onError: onUpdateVSAddressError,
} = await useCustomMutation(updateVSAddressMutation);
const {
  mutate: deleteDiscountMutate,
  onDone: onDeleteDiscount,
  onError: onDeleteDiscountError,
} = await useCustomMutation(deleteDiscount);
const {
  mutate: updateDiscountMutation,
  onDone: onUpdateDiscount,
  onError: onUpdateDiscountError,
} = await useCustomMutation(updateDiscount);
const category = computed(() => {
  console.log(result?.value);
  if (result && result.value)
    return result.value.VSC?.map((e: any) => {
      return { name: e.name, id: e.id };
    });

  return [];
});

const virtualService = computed(() => {
  console.log(fetch_VS_BY_ID_RESULT.value);
  if (fetch_VS_BY_ID_RESULT.value?.VS) {
    const data = fetch_VS_BY_ID_RESULT.value.VS;
    console.log(data);
    const detail = data.description;

    console.log(data.realtime_service_addresses);
    imageURL.value = data.virtual_service_images.map((e: any) => {
      return { id: e.id, url: e.image_url };
    });

    return data;
  } else return null;
});

const initialValue = computed(() => {
  if (virtualService.value) {
    console.log(virtualService.value.detail);
    return {
      title: virtualService.value.title,
      accountNumber: virtualService.value.account.account_number,
      detail: virtualService.value.description,
      service_category: virtualService.value.virtual_service_category,
      "Bank Name": virtualService.value.account.account_type,
      thumbnail: virtualService.value.logo,
      holdername: virtualService.value.account.account_holder,
      tinnumber: virtualService.value.license,
      "web link": virtualService.value.web_link,
      "address detail":
        virtualService.value.virtual_service_addresses[0]?.description,
      phoneNumber:
        virtualService.value.virtual_service_addresses[0].phone_number,
      "Discount Start Date": virtualService.value.service_discount?.start_date,
      "Discount End Date": virtualService.value.service_discount?.end_date,
      "Discount Reason": virtualService.value.service_discount?.reason,
      Discount: virtualService.value.service_discount?.rate,
    };
  } else {
    return {};
  }
});

const discountID = computed(() => {
  if (virtualService.value && virtualService.value.service_discount) {
    return virtualService.value.service_discount.id;
  }
  return null;
});

onVSFetchError((error: any) => {
  console.log(error);
});

onVSUpdatedResult((result: any) => {
  console.log(result);
});

onAddImageResult(async (result: any) => {
  clearImage.value = true;
  await fetchUpdatedVSService(variables);
  clearImage.value = false;
});

onAddImageError((error: any) => {
  console.log(error);
});

onVSEUpdatedError((error: any) => {
  console.log(error);
});

onUpdateVSAddressResult((result: any) => {
  console.log(result);
});

onUpdateVSAddressError((error: any) => {
  console.log(error);
});

onFetchCategoryError((error: any) => {
  console.log(error);
});

onAddDiscount((result: any) => {
  alert("Inserted");
});
onAddDiscountError((error: any) => {
  console.log(error);
  alert("error insert Discount");
});
onDeleteDiscount((result: any) => {
  console.log(result);
  fetchUpdatedVSService(variables);
});

onDeleteDiscountError((error: any) => {
  console.log(error);
});

onUpdateDiscount((result: any) => {
  alert("updated");
  console.log(result);
});

onUpdateDiscountError((error: any) => {
  console.log(error);
});

const file_checker_and_uploader = async (value: any) => {
  if (typeof value === "string") {
    return value;
  } else {
    const { urls } = await useFileUpload(value);
    if (urls) return urls[0];
    return null;
  }
};

const basicSubmitHandling = async (value: any, state: number) => {
  console.log(value);

  if (state === 0) {
    const url = await file_checker_and_uploader(value["thumbnail"]);

    if (url) {
      const virtual_service_basic = {
        object: {
          category_id: value["service_category"].id,
          title: value["title"],
          description: value["detail"],
          logo: value["thumbnail"],
          license: value["tinnumber"],
          web_link: value["web link"],
        },
        account: {
          account_holder: value["holdername"],
          account_number: value["accountNumber"],
          account_type: value["Bank Name"],
        },
        accountID: virtualService.value.account.id,
        id: id.value,
      };

      updateVS(virtual_service_basic);
    } else {
      console.log("image upload Error");
    }
  } else if (state === 1) {
    const { urls, error } = await useFileUpload(value["medias"]);

    if (!error) {
      const imageURLs = urls?.map((value: any) => {
        return { image_url: value, service_id: id.value };
      });
      console.log(imageURLs);
      addImages({ objects: imageURLs });
    }
  } else if (state === 2) {
    const updateAddress = {
      id: virtualService.value.virtual_service_addresses[0].id,
      set: {
        phone_number: value.phoneNumber,
        social_media: value["all social address"],
        description: value["address detail"],
      },
    };
    // updating the address of service mutation
    updateVSAddress(updateAddress);
  } else if (state === 3) {
    const updateDiscountVariable = {
      id: discountID.value,
      object: {
        end_date: value["Discount End Date"],
        rate: value["Discount"],
        start_date: value["Discount Start Date"],
        reason: value["Discount Reason"],
      },
    };

    if (discountID.value) updateDiscountMutation(updateDiscountVariable);
    else {
      const addDiscountVariable = {
        object: {
          serviceid: id.value,
          enddate: value["Discount End Date"],
          rate: value["Discount"],
          startdate: value["Discount Start Date"],
          reason: value["Discount Reason"],
        },
      };
      addDiscount(addDiscountVariable);
    }
  }
};

const ImageSuccessfullDeleted = () => {
  fetchUpdatedVSService(variables);
};

const deleteDiscountOperation = () => {
  deleteDiscountMutate({ id: discountID.value });
};
</script>
