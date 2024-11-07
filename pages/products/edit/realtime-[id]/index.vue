<template>
  <div
    v-if="PData"
    class="flex flex-col min-h-[calc(100vh-3.7rem)] items-center justify-center min-w-full gap-8 py-5"
  >
    <h-modal
      class="z-50"
      :show-modal="showModal"
      :message="msg"
      :is-error="isError"
    ></h-modal>
    <h1 class="font-bold text-green100 text-lg lg:text-xl xl:text-2xl">
      Edit Realtime Product
    </h1>

    <h-stepper
      class="w-full"
      :isForAdd="false"
      :validation-schema="dynamicRule"
      :initial-value="PData"
      :steps="[
        { key: 'basics', value: 'Basic' },
        { key: 'discount', value: 'Discount' },
        { key: 'medias', value: 'Medias' },
        { key: 'location', value: 'Location' },
      ]"
      @submit="submit"
    >
      <template #basics="{ state, indx }">
        <template v-if="state == indx">
          <product-form-basic>
            <template #thumb>
              <div class="w-[200px]">
                <div class="flex-1 w-full">
                  <p class="text-gray font-bold mb-[0.4rem]">Thumb Image</p>
                </div>
                <h-file-upload
                  :limit="1"
                  id="cover"
                  accept="image/*"
                  size="4 mb"
                  name="thumb"
                />
              </div>
            </template>
          </product-form-basic>
        </template>
      </template>
      <template #discount="{ state, indx }">
        <template v-if="state == indx">
          <product-form-discount>
            <template v-if="discountId" #delete>
              <button
                type="submit"
                @click="deleteDiscount"
                class="bg-red uppercase my-2 tracking-wide w-28 py-1.5 rounded-sm font-semibold text-white self-end ml-auto flex items-center justify-center gap-1 hover:bg-red/90 transition-colors ease-in-out duration-300"
              >
                DELETE
              </button>
            </template>
          </product-form-discount>
        </template>
      </template>
      <template #medias="{ state, indx }">
        <template v-if="state == indx">
          <div
            v-if="showImages"
            class="flex flex-col gap-8 justify-center items-center w-full py-8"
          >
            <image-editor
              @notify-image-delete="onDeleteImage()"
              :image="otherImages"
              :mutate-gql="deleteImage"
              v-if="otherImages.length > 0"
            />
            <div class="md:w-[60%]">
              <h-file-upload
                :limit="5"
                id="media"
                accept="image/*"
                size="4 mb"
                name="featured_image"
              />
            </div>
          </div>
        </template>
      </template>
      <template #location="{ state, indx }">
        <template v-if="state == indx">
          <product-form-location />
        </template>
      </template>
    </h-stepper>
  </div>
</template>
<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import physicalProduct from "~/graphQL/query/product/realtime/singleProduct.gql";
import productBasic from "~/graphQL/mutation/product/realtime/updateProductBasic.gql";
import discountUpdate from "~/graphQL/mutation/product/realtime/updateProductDiscount.gql";
import updateLocation from "~/graphQL/mutation/product/realtime/updateProductLocation.gql";
import deleteProductDiscount from "~/graphQL/mutation/product/realtime/deleteProductDiscount.gql";
import deleteImage from "~/graphQL/mutation/product/realtime/deleteProductImage.gql";
import addImage from "~/graphQL/mutation/product/realtime/addProductImage.gql";
import addDiscount from "~/graphQL/mutation/product/realtime/addProductDiscount.gql";
import { isString } from "vue-composable";
const discountId = ref(null);
const otherImages = ref([]);
const showImages = ref(true);
const productId = Number(useRoute().params["id"]);
const {
  result: product,
  error: productError,
  fetchMore,
  refetch,
} = await useCustomQuery(physicalProduct, { id: productId });
const {
  mutate: mutateUpdateBasic,
  onDone: onUpdateBasicResult,
  onError: onUpdateBasicError,
} = await useCustomMutation(productBasic);
onUpdateBasicResult((data) => {
  refetchQuery();
  console.log("mutation Result");
  showModalPopup("You have successfully update a product.", false);
});
onUpdateBasicError((error) => {
  console.log("mutation Error", error.message);
  showModalPopup(error.message, true);
});

const {
  mutate: mutateDiscountUpdate,
  onDone: onDiscountUpdateResult,
  onError: onDiscountUpdateError,
} = await useCustomMutation(discountUpdate);
onDiscountUpdateResult((data) => {
  refetchQuery();
  console.log("mutation Result");
  showModalPopup("You have successfully update discount.", false);
});
onDiscountUpdateError((error) => {
  console.log("mutation Error", error.message);
  showModalPopup(error.message, true);
});

const {
  mutate: mutateAddProductDiscount,
  onDone: onAddProductDiscountResult,
  onError: onAddProductDiscountError,
} = await useCustomMutation(addDiscount);
onAddProductDiscountResult((data) => {
  refetchQuery();
  console.log("mutation Result");
  showModalPopup("You have successfully add discount.", false);
});
onAddProductDiscountError((error) => {
  console.log("mutation Error", error.message);
  showModalPopup(error.message, true);
});

const {
  mutate: mutateDeleteDiscount,
  onDone: onDeleteDiscountResult,
  onError: onDeleteDiscountError,
} = await useCustomMutation(deleteProductDiscount);
onDeleteDiscountResult((data) => {
  refetchQuery();
  console.log("mutation Result");
  showModalPopup("You have successfully add discount.", false);
});
onDeleteDiscountError((error) => {
  console.log("mutation Error", error.message);
  showModalPopup(error.message, true);
});

const {
  mutate: mutateUpdateLocation,
  onDone: onUpdateLocationResult,
  onError: onUpdateLocationError,
} = await useCustomMutation(updateLocation);
onUpdateLocationResult((data) => {
  refetchQuery();
  console.log("mutation Result");
  showModalPopup("You have successfully update Product Location.", false);
});
onUpdateLocationError((error) => {
  console.log("mutation Error", error.message);
  showModalPopup(error.message, true);
});

const {
  mutate: mutateAddImage,
  onDone: onAddImageResult,
  onError: onAddImageError,
} = await useCustomMutation(addImage);
onAddImageResult((data) => {
  showImages.value = false;
  fetchMore({ id: productId });
  console.log("mutation Result");
  showModalPopup("You have successfully update Images.", false);
});
onAddImageError((error) => {
  console.log("mutation Error", error.message);
  showModalPopup(error.message, true);
});

const onDeleteImage = () => {
  showImages.value = false;
  fetchMore({ variables: { id: productId } });
};
const showModal = ref(false);
const isError = ref(true);
const msg = ref("");
const showModalPopup = (_msg, _isError) => {
  msg.value = _msg;
  showModal.value = true;
  isError.value = _isError;
  setTimeout(() => {
    showModal.value = false;
  }, 5000);
};

const refetchQuery = async () => {
  fetchMore({ id: productId }).then((res) => {
    product.value = res.data;
  });
};

const PData = computed(() => {
  const data = product.value?.product ?? null;
  otherImages.value = [];
  if (data) {
    discountId.value = data.discount_id;
    if (data.otherImages && data.otherImages.length > 0) {
      otherImages.value = data.otherImages.map((images) => {
        return { id: images.id, url: images.image_url };
      });
    }
    showImages.value = true;
    console.log(data);
    return {
      productName: data.title,
      description: JSON.parse(JSON.stringify(data.description)),
      amount: data.amount,
      price: data.unit_price,
      status: data.status,
      category: data.category,
      subCategory: data.subCategory,
      discount: data.discount?.rate,
      discountStartDate: data.discount?.start_date,
      discountEndDate: data.discount?.end_date,
      thumb: data.cover_image,
      featured_image: undefined,
      discountReason: data.discount
        ? JSON.parse(JSON.stringify(data.discount?.reason))
        : null,
      city: data.product_address[0].city,
      subCity: data.product_address[0].sub_city,
      locationDescription: JSON.parse(
        JSON.stringify(data.product_address[0].description)
      ),
    };
  } else {
    return null;
  }
});

const submit = async (value, state) => {
  if (state === 0) {
    console.log(value);
    var image = value.thumb;
    if (!isString(value.thumb)) {
      const { urls, error } = await useFileUpload(value.thumb);
      if (error) {
        showModalPopup("Image Upload Error", true);
      } else {
        image = urls[0];
      }
    }
    const variables = {
      id: productId,
      title: value.productName,
      amount: value.amount,
      category: value.category.id,
      subCategory: value.subCategory.id,
      status: value.status,
      unitPrice: value.price,
      description: value.description,
      coverImage: image,
    };
    mutateUpdateBasic(variables);
  }
  if (state == 1) {
    if (value.discount) {
      if (discountId.value) {
        const variables = {
          id: discountId.value,
          rate: parseInt(value.discount),
          startDate: value.discountStartDate,
          endDate: value.discountEndDate,
          reason: value.discountReason,
        };
        mutateDiscountUpdate(variables);
      } else {
        const variables = {
          rate: value.discount,
          start_date: value.discountStartDate,
          end_date: value.discountEndDate,
          reason: value.discountReason,
          product_id: productId,
        };
        mutateAddProductDiscount(variables);
      }
    }
  }
  if (state == 2) {
    if (value.featured_image) {
      const { urls, error } = await useFileUpload(value.featured_image);
      if (error) {
        console.log("firebase Error");
        return;
      } else {
        const images = urls.map((url) => {
          return { image_url: url, product_id: productId };
        });
        mutateAddImage({ object: images });
      }
    }
  }
  if (state == 3) {
    const variables = {
      product_id: productId,
      city: value.city,
      subCity: value.subCity,
      description: value.locationDescription,
    };
    mutateUpdateLocation(variables);
  }
};

const deleteDiscount = () => {
  mutateDeleteDiscount({ id: discountId.value });
};
useHead({
  title: "Edit Realtime Product",
});
definePageMeta({
  middleware: "before-route-entry",
  layout: "custom",
});

const dynamicRule = [
  {
    productName: "required",
    category: "required",
    subCategory: "required",
    status: "required",
    amount: "required",
    price: "required",
    description: "quill",
    thumb: "required",
  },
  {
    discountStartDate: "discount:discount",
    discountEndDate: "discount:discount",
    discountReason: "customQuill:discount",
  },
  {
    featured_image: "required",
  },
  {
    locationDescription: "required",
    city: "required",
    subCity: "required",
  },
];
</script>
