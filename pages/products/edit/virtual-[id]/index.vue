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
      Edit Virtual Product
    </h1>

    <h-stepper
      class="w-full"
      :isForAdd="false"
      :validation-schema="dynamicRule"
      :initial-value="PData"
      :steps="[
        { key: 'basics', value: 'Basic' },
        { key: 'medias', value: 'Medias' },
      ]"
      @submit="submit"
    >
      <template #basics="{ state, indx }">
        <template v-if="state == indx">
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
                  placeHolder="Put your description here."
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
          </div>
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
        </template>
      </template>
    </h-stepper>
  </div>
</template>
<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import digitalProduct from "~/graphQL/query/product/digital/singleProduct.gql";
import deleteImage from "~/graphQL/mutation/product/digital/deleteProductImage.gql";
import fetchCategory from "~/graphQL/query/product/digital/fetchCategory.gql";
import updateBasic from "~/graphQL/mutation/product/digital/updateProductBasic.gql";
import addImage from "~/graphQL/mutation/product/digital/addProductImage.gql";
import { isString } from "vue-composable";
const otherImages = ref([]);
const showImages = ref(true);
const productId = Number(useRoute().params["id"]);
const {
  result: product,
  error: productError,
  fetchMore,
  refetch,
} = await useCustomQuery(digitalProduct, { id: productId });
const {
  mutate: mutateUpdateBasic,
  onDone: onUpdateBasicResult,
  onError: onUpdateBasicError,
} = await useCustomMutation(updateBasic);
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
  mutate: mutateAddImage,
  onDone: onAddImageResult,
  onError: onAddImageError,
} = await useCustomMutation(addImage);
onAddImageResult((data) => {
  showImages.value = false;
  fetchMore({ variables: { id: productId } });
  console.log("mutation Result");
  showModalPopup("You have successfully update a product.", false);
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
    if (data.images && data.images.length > 0) {
      otherImages.value = data.images.map((images) => {
        return { id: images.id, url: images.imageUrl };
      });
    }
    console.log("OTHERIMAGES", otherImages.value);
    showImages.value = true;
    return {
      productName: data.title,
      description: JSON.parse(JSON.stringify(data.description)),
      price: data.unit_price,
      category: data.category,
      subCategory: data.subCategory,
      thumb: data.cover_image,
      others: undefined,
      demoLink: data.demoLink,
    };
  } else {
    return null;
  }
});

watchEffect(() => {
  console.log("PRODUCT", product.value);
  console.log("Error", productError.value);
});

const submit = async (value, state) => {
  if (state === 0) {
    console.log("=======>", value);
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
      category: value.category.id,
      price: value.price,
      description: value.description,
      coverImage: image,
      demoLink: value.demoLink,
    };
    mutateUpdateBasic(variables);
  }

  if (state == 1) {
    if (value.others) {
      const { urls, error } = await useFileUpload(value.others);
      if (error) {
        console.log("firebase Error");
        return;
      } else {
        const images = urls.map((url) => {
          return { imageUrl: url, productID: productId };
        });
        mutateAddImage({ object: images });
      }
    }
  }
};

useHead({
  title: "Edit Virtual Product",
});
definePageMeta({
  middleware: "before-route-entry",
  layout: "custom",
});

const dynamicRule = [
  {
    productName: "required",
    category: "required",
    price: "required",
    description: "quill",
    thumb: "required",
  },
  {
    others: "required",
  },
];

const { result, error } = await useCustomQuery(fetchCategory);
const categoryList = computed(() => {
  const data = result.value?.category ?? [];
  return data;
});
if (error.value) {
  showModalPopup("Something Went Wrong", true);
}
</script>
