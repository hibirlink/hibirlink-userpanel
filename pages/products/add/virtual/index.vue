<template>
  <div
    class="flex flex-col min-h-[calc(100vh-3.7rem)] items-center min-w-full gap-8 py-5"
  >
    <h1 class="font-bold text-green100 text-lg lg:text-xl xl:text-2xl">
      Add Virtual Product
    </h1>
    <h-modal
      class="z-50"
      :show-modal="showModal"
      :message="msg"
      :is-error="isError"
    ></h-modal>
    <form @submit.prevent="submit" class="w-full">
      <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
        <div class="w-full">
          <div class="">
            <h-text-field
              class="py-2"
              label="Product Name"
              name="productName"
              placeholder="Product Name"
              type="text"
              rules="required"
            />
          </div>

          <div class="w-full grid grid-cols-2 gap-5">
            <h-select
              :items="categoryList"
              name="category"
              label="Category"
            ></h-select>
            <div class="">
              <h-text-field
                class="py-2"
                label="Price"
                name="price"
                placeholder="Price"
                type="number"
                rules="required"
              />
            </div>
          </div>
          <div class="w-full grid grid-cols-2 gap-5">
            <div class="">
              <h-text-field
                class="py-2"
                label="Demo Link"
                name="demoLink"
                placeholder="http://www.example.com"
                type="text"
              />
            </div>
          </div>
        </div>
        <div>
          <div class="w-full h-fit">
            <h-rich-text
              cls="min-h-[11rem]"
              placeholder="Put your description here."
              name="description"
              rules="quill"
              label="Description"
            />
          </div>
        </div>
        <div class="w-full">
          <h1 class="text-gray font-bold mb-2">Thumb Image</h1>
          <h-file-upload
            :limit="1"
            id="cover"
            accept="image/*"
            size="4 mb"
            name="thumb"
            rule="required"
          />
        </div>

        <div class="w-full">
          <h1 class="text-gray font-bold mb-2">Other Images</h1>
          <h-file-upload
            :limit="5"
            id="media"
            accept="image/*"
            size="4 mb"
            name="others"
          />
        </div>
      </div>
      <button
        type="submit"
        class="bg-lemon uppercase tracking-wide w-fit px-4 my-4 py-1.5 rounded-sm font-semibold text-green200 self-end ml-auto flex items-center justify-center gap-1 hover:bg-green400 transition-colors ease-in-out duration-300"
      >
        ADD PRODUCT
      </button>
    </form>
  </div>
</template>
<script lang="ts" setup>
import addProduct from "~/graphQL/mutation/product/digital/addProduct.gql";
import fetchCategory from "~/graphQL/query/product/digital/fetchCategory.gql";
import { getAuth } from "@firebase/auth";
import { useForm } from "vee-validate";
const { handleSubmit, resetForm } = useForm();
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
  title: "Add Virtual Product",
});
definePageMeta({
  middleware: "before-route-entry",
  layout: "custom",
});

const {
  mutate: mutateAddProduct,
  onDone: onAddProductResult,
  onError: onAddProductError,
} = await useCustomMutation(addProduct);
onAddProductResult((data) => {
  resetForm();
  console.log("mutation Result");
  showModalPopup("You have successfully added a product.", false);
});
onAddProductError((error) => {
  console.log("mutation Error", error.message);
  showModalPopup(error.message, true);
});
const uploadImage = async (value: any) => {
  if (value && value.length > 0) {
    const { urls, error } = await useFileUpload(value);
    return { urls, error };
  }
  return { urls: null, error: null };
};

const submit = handleSubmit(
  async (value) => {
    const { urls: thumbUrl, error: thumbError } = await uploadImage(
      value.thumb
    );
    const { urls: otherUrl, error: otherError } = await uploadImage(
      value.others
    );
    if (thumbError || otherError || !thumbUrl) {
      showModalPopup("Image Upload Error", true);
      return;
    }
    var multImage = null;
    if (otherUrl) {
      multImage = otherUrl.map((url) => {
        return { imageUrl: url };
      });
    }
    const id = localStorage.getItem("userID");
    const object = {
      object: {
        title: value.productName,
        category_id: value.category.id,
        demoLink: value.demoLink,
        description: value.description,
        cover_image: thumbUrl[0],
        digital_product_images: multImage ? { data: multImage } : null,
        supplier_id: id,
        unit_price: value.price,
      },
    };
    mutateAddProduct(object);
  },
  (error) => {
    console.log(error);
  }
);

const { result, error } = await useCustomQuery(fetchCategory);
const categoryList = computed(() => {
  const data = result.value?.category ?? [];
  return data;
});
if (error.value) {
  showModalPopup("Something Went Wrong", true);
}
</script>
