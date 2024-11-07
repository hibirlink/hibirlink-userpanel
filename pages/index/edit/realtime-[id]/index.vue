<template>
  <section
    class="flex flex-col min-h-[calc(100vh-3.7rem)] items-center justify-center min-w-full gap-8 py-5"
  >
    <h1 class="font-bold text-green100 text-lg lg:text-xl xl:text-2xl">
      Edit Realtime Service
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
      v-if="realtimeService"
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
                  :items="category"
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
            <div class="flex flex-col-reverse lg:flex-row-reverse lg:gap-8">
              <div class="flex gap-1 flex-col w-full">
                <div class="lg:w-[16rem] flex flex-col gap-2 w-[16rem]">
                  <span class="font-bold text-gray">Cover Image</span>
                  <h-file-upload
                    size="1 mb"
                    type="image"
                    id="coverImage"
                    name="CoverImage"
                    @getFile="getCoverImage"
                  />
                </div>
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
            <service-avaliability class="pt-10" />
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
                  name="media"
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
          <service-location />
          <form-social-address
            class="py-3"
            :social_addresses="
              JSON.parse(
                JSON.stringify(
                  realtimeService.realtime_service_addresses[0].socialMedia
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
import fetch_Category from "@/graphQL/query/service/realtime/fetchRealTimeServiceCategory.gql";
import fetchRTSBYID from "@/graphQL/query/service/realtime/fetchOneRTS.gql";
import deleteImage from "@/graphQL/mutation/service/realtime/deleteImage.gql";
import updateRTSMutation from "@/graphQL/mutation/service/realtime/updateService.gql";
import addImagesForOneRTS from "@/graphQL/mutation/service/realtime/addImageForOneService.gql";
import updateRTSAddressMutation from "@/graphQL/mutation/service/realtime/update_address.gql";
import deleteDiscount from "@/graphQL/mutation/service/deleteDiscount.gql";
import insertDiscount from "@/graphQL/mutation/service/insertDiscount.gql";
import updateDiscount from "@/graphQL/mutation/service/updateDiscount.gql";
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
  title: "Editing Realtime Service",
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

    days: "required",
    hour: "required",
  },
  {
    CoverImage: "required",
    media: "required",
  },
  {
    "region or city": "required",
    subcity: "required",
    "address detail": "required",
    Phone: "required",
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

const imageUrlComputed = computed(() => {
  return imageURL.value;
});

const {
  mutate: updateRTS,
  onDone: onRTSUpdatedResult,
  onError: onRTSEUpdatedError,
} = await useCustomMutation(updateRTSMutation);
const {
  mutate: addDiscount,
  onDone: onAddDiscount,
  onError: onAddDiscountError,
} = await useCustomMutation(insertDiscount);
const {
  mutate: addImages,
  onDone: onAddImageResult,
  onError: onAddImageError,
} = await useCustomMutation(addImagesForOneRTS);
const variables = computed(() => {
  return { id: id.value };
});

const {
  result: fetch_RTS_BY_ID_RESULT,
  onError: onFETCHRTSBYIDERROR,
  fetchMore: fetchUpdatedService,
} = await useCustomQuery(fetchRTSBYID, variables);

const {
  mutate: updateRTSAddress,
  onDone: onUpdateRTSAddressResult,
  onError: onUpdateRTSAddressError,
} = await useCustomMutation(updateRTSAddressMutation);
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
    return result.value.RTSC?.map((e: any) => {
      return { name: e.name, id: e.id };
    });

  return [];
});



const realtimeService = computed(() => {
  if (fetch_RTS_BY_ID_RESULT.value?.QORTS) {
    const data = fetch_RTS_BY_ID_RESULT.value.QORTS;
    console.log(data);
    const detail = data.description;

    console.log(data.realtime_service_addresses);
    imageURL.value = data.realtime_service_images.map((e) => {
      return { id: e.id, url: e.imageURL };
    });

    return data;
  } else return null;
});

const initialValue = computed(() => {
  if (realtimeService.value) {
    console.log(realtimeService.value.detail);
    return {
      "Service Name": realtimeService.value.title,
      "account number": realtimeService.value.account.account_number,
      "service detail": realtimeService.value.description,
      category: realtimeService.value.realtime_service_category,
      "Bank Type": realtimeService.value.account.account_type,
      CoverImage: realtimeService.value.logo,
      "holder name": realtimeService.value.account.account_holder,
      "tin number": realtimeService.value.tinNumber,
      days: realtimeService.value.avaliability.days,
      hour: realtimeService.value.avaliability.hour,

      "region or city":
        realtimeService.value.realtime_service_addresses[0]?.region_city,
      subcity: realtimeService.value.realtime_service_addresses[0].subcity,
      "address detail":
        realtimeService.value.realtime_service_addresses[0]?.description,
      Phone: realtimeService.value.realtime_service_addresses[0].phoneNumber,
      "Discount Start Date": realtimeService.value.service_discount?.start_date,
      "Discount End Date": realtimeService.value.service_discount?.end_date,
      "Discount Reason": realtimeService.value.service_discount?.reason,
      Discount: realtimeService.value.service_discount?.rate,
    };
  } else {
    return {};
  }
});

const discountID = computed(() => {
  if (realtimeService.value && realtimeService.value.service_discount) {
    return realtimeService.value.service_discount.id;
  }
  return null;
});

onFETCHRTSBYIDERROR((error) => {
  console.log(error);
});

onRTSUpdatedResult((result) => {
  console.log(result);
});
onAddImageResult(async (result) => {
  clearImage.value = true;
  await fetchUpdatedService(variables);
  clearImage.value = false;
});
onAddImageError((error) => {
  console.log(error);
});
onRTSEUpdatedError((error) => {
  console.log(error);
});
onUpdateRTSAddressResult((result) => {
  console.log(result);
});
onUpdateRTSAddressError((error) => {
  console.log(error);
});

onFetchCategoryError((error: any) => {
  console.log(error);
});

onAddDiscount((result: any) => {
  alert("Inserted");
});
onAddDiscountError((error: any) => {
  alert("error inasert Discount");
});

onDeleteDiscount((result) => {
  console.log(result);
  fetchUpdatedService(variables);
});

onDeleteDiscountError((error) => {
  console.log(error);
});
onUpdateDiscount((result) => {
  console.log(result);
});
onUpdateDiscountError((error) => {
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
    const url = await file_checker_and_uploader(value["CoverImage"]);
    if (url) {
      const realtime_service_basic = {
        object: {
          avaliability: { days: value["days"], hour: value["hour"] },
          category_id: value["category"].id,
          description: value["service detail"],
          logo: url,
          tinNumber: value["tin number"],
          title: value["Service Name"],
        },
        id: id.value,
        accountID: realtimeService.value.account.id,
        account: {
          account_holder: value["holder name"],
          account_number: value["account number"],
          account_type: value["Bank Type"],
        },
      };

      updateRTS(realtime_service_basic);
    } else {
      console.log("image upload Error");
    }
  } else if (state === 1) {
    const { urls, error } = await useFileUpload(value["media"]);

    if (!error) {
      const imageURLs = urls?.map((value) => {
        return { imageURL: value, serviceID: id.value };
      });

      addImages({ objects: imageURLs });
    }
  } else if (state === 2) {
    const updateAddress = {
      id: realtimeService.value.realtime_service_addresses[0].id,
      set: {
        phoneNumber: value.Phone,
        region_city: value["region or city"],
        subcity: value["subcity"],
        socialMedia: value["all social address"],
        description: value["address detail"],
      },
    };
    // updating the address of service mutation
    updateRTSAddress(updateAddress);
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
  fetchUpdatedService(variables);
};

const deleteDiscountOperation = () => {
  deleteDiscountMutate({ id: discountID.value });
};
</script>
