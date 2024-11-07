<template>
  <div
    class="flex-1 text-sm flex flex-col gap-1 bg-white rounded overflow-hidden my-2 shadow"
  >
    <div class="relative">
      <carousel :product-image="data.image" height="h-[196px]" />
    </div>

    <div class="flex justify-between items-center relative px-2">
      <p class="flex-auto font-bold text-lg">{{ data.title }}</p>

      <div class="w-fit flex flex-row justify-end">
        <h-dropdown
          class=""
          :leading_icon="EllipsisHorizontalIcon"
          :items="[
            { value: props.data.id, name: 'Edit' },
            { value: props.data.id, name: 'Delete' , discountId:props.data.discountID },
          ]"
          @option-clicked="handleOptionClick"
        ></h-dropdown>
      </div>
    </div>
    <div class="flex justify-between px-2">
      <p class="font-bold text-md capitalize">{{ data.category }}</p>
      <p class="text-gray">PostDate : {{ data.postDate }}</p>
    </div>
    <p class="px-2 text-gray">{{ data.desc }}</p>
    <div class="grid grid-cols-2 lg:grid-cols-3 gap-y-2 my-3 px-2">
      <p>
        <span class="text-green400 font-semibold">Price</span> :
        {{ data.price }}
      </p>
      <p>
        <span class="text-green400 font-semibold">Discount</span> :
        {{ data.discount ? data.discount + " % " : " - " }}
      </p>
      <p>
        <span class="text-green400 font-semibold">Amount</span> :
        {{ data.amount }}
      </p>
      <p>
        <span class="text-green400 font-semibold">Status</span> :
        {{ data.status }}
      </p>
      <p>
        <span class="text-green400 font-semibold">Location</span> :
        {{ data.address }}
      </p>
      <Rating :rate-value="data.rate" :readonly="true" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { EllipsisHorizontalIcon } from "@heroicons/vue/24/solid";
import deleteProduct from "~/graphQL/mutation/product/realtime/deleteProduct.gql";
interface images {
  image: string;
}
interface productDataInterface {
  id: number;
  title: string;
  category: string;
  postDate: string;
  desc: string;
  price: number;
  discount: number;
  amount: number;
  status: string;
  rate: number;
  address: string;
  discountID:number;
  image: Array<images>;
}
interface productData {
  data: productDataInterface;
}
const props = defineProps<productData>();
interface MenuInterface {
  name: string;
  value: number;
  discountId:number;
}
const router = useRouter();
const emit = defineEmits(["onDeleteImage"]);
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
const {
  mutate: mutateDeleteProduct,
  onDone: onDeleteProductResult,
  onError: onDeleteProductError,
} = await useCustomMutation(deleteProduct);
onDeleteProductResult((data) => {
  emit('onDeleteImage');
  console.log("mutation Result");
  showModalPopup("You have successfully delete a product.", false);
});
onDeleteProductError((error) => {
  console.log("mutation Error", error.message);
  showModalPopup(error.message, true);
});

const handleOptionClick = (value: MenuInterface) => {
  if (value.name === "Edit") {
    router.push("/products/edit/realtime-" + `${value.value}`);
  }
  if(value.name === "Delete"){
     mutateDeleteProduct({id:value.value,discountId:value.discountId});
  }
};
</script>
