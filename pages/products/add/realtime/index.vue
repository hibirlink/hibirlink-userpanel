<template>
  <div
    class="flex flex-col min-h-[calc(100vh-3.7rem)] items-center justify-center min-w-full gap-8 py-5"
  >
    <h1 class="font-bold text-green100 text-lg lg:text-xl xl:text-2xl">
      Add Realtime Product
    </h1>
    <h-modal
      class="z-50"
      :show-modal="showModal"
      :message="msg"
      :is-error="isError"
    ></h-modal>
    <h-stepper
      class="w-full"
      :validation-schema="dynamicRule"
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
          <product-form-basic />
        </template>
      </template>
      <template #discount="{ state, indx }">
        <template v-if="state == indx">
          <product-form-discount />
        </template>
      </template>
      <template #medias="{ state, indx }">
        <template v-if="state == indx">
          <product-form-media />
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
<script setup lang="ts">
import addProduct from "~/graphQL/mutation/product/realtime/addProduct.gql";
import { getAuth } from "@firebase/auth";
const {
  mutate: mutateAddProduct,
  onDone: onAddProductResult,
  onError: onAddProductError,
} = await useCustomMutation(addProduct);
onAddProductResult((data) => {
  console.log("mutation Result");
  showModalPopup("You have successfully added a product.", false);
});
onAddProductError((error) => {
  console.log("mutation Error", error.message);
  showModalPopup(error.message, true);
});
const showModal = ref(false);
const isError = ref(true);
const msg = ref("");
const showModalPopup = (_msg: string, _isError: boolean) => {
  msg.value = _msg;
  showModal.value = true;
  isError.value = _isError;
  setTimeout(() => {
    showModal.value = false;
  }, 5000);
};
useHead({
  title: "Add Realtime Product",
});
definePageMeta({
  middleware: "before-route-entry",
  layout: "custom",
});
const uploadImage = async (value: any) => {
  if (value && value.length > 0) {
    const { urls, error } = await useFileUpload(value);
    return { urls, error };
  }
  return { urls: null, error: null };
};

const submit = async (value: any) => {
  console.log(value);
  const { urls: thumb, error: thumbError } = await uploadImage(value.thumb);
  const { urls: othersImage, error: otherImagesError } = await uploadImage(
    value.others
  );
  if (
    thumbError ||
    (value.others && value.others.length > 0 && otherImagesError)
  ) {
    console.log("Upload Error");
    showModalPopup("Image Upload Error", true);
    return;
  }
  console.log(value);
  const data = ["one", "two"];
  {
  }

  const OtherImages = othersImage?.map((url) => {
    return { image_url: url };
  });
  const discountData = {
    data: {
      start_date: value.discountStartDate,
      end_date: value.discountEndDate,
      reason: value.discountReason,
      rate: value.discount,
    },
  };

  const id = localStorage.getItem("userID");
  const object = {
    object: {
      supplier_id: id,
      title: value.productName,
      category_id: value.category.id,
      sub_category_id: value.subCategory.id,
      unit_price: value.price,
      discount: value.discount ? discountData : null,
      cover_image: thumb ? thumb[0] : "default image",
      physical_product_images: OtherImages ? { data: OtherImages } : null,
      description: value.description,
      status: value.status,
      product_address: {
        data: {
          city: value.city,
          sub_city: value.subCity,
          description: value.locationDescription,
        },
      },
      amount: value.amount,
    },
  };

  mutateAddProduct(object);
};

const dynamicRule = [
  {
    productName: "required",
    category: "required",
    subCategory: "required",
    status: "required",
    amount: "required",
    price: "required",
    description: "quill",
  },
  {
    discountStartDate: "discount:discount",
    discountEndDate: "discount:discount",
    discountReason: "customQuill:discount",
  },
  {
    thumb: "required",
  },
  {
    locationDescription: "required",
    city: "required",
    subCity: "required",
  },
];
</script>
