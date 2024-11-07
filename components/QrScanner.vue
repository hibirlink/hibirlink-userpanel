<template>
  <div class="w-screen h-screen relative">
    <qrcode-stream
      v-if="!result"
      @init="init"
      @decode="onDecode"
      class="absolute"
    >
      <div v-if="scanStart" class="w-screen h-screen absolute top-0">
        <div
          class="w-[230px] z-10 rounded-lg h-[230px] m-auto mt-[calc(50vh-110px)] border-2 border-green-400 relative"
        >
          <div
            class="absolute -top-2 -right-2 w-[50px] h-[50px] rounded-tr-xl border-t-4 border-r-4 border-white"
          ></div>
          <div
            class="absolute -top-2 -left-2 w-[50px] h-[50px] rounded-tl-xl border-t-4 border-l-4 border-white"
          ></div>
          <div
            class="absolute -bottom-2 -right-2 w-[50px] h-[50px] rounded-br-xl border-b-4 border-r-4 border-white"
          ></div>
          <div
            class="absolute -bottom-2 -left-2 w-[50px] h-[50px] rounded-bl-xl border-b-4 border-l-4 border-white"
          ></div>
          <div
            class="w-full h-[40px] bg-gradient-to-t from-green-300 to-transparent scan absolute"
          ></div>
        </div>
        <div
          class="absolute top-0 bg-black/30 w-full h-[calc(50vh-110px)]"
        ></div>
        <div
          class="absolute left-0 top-[calc(50vh-110px)] bg-black/30 w-[calc(50vw-115px)] h-[230px]"
        ></div>
        <div
          class="absolute right-0 top-[calc(50vh-110px)] bg-black/30 w-[calc(50vw-115px)] h-[230px]"
        ></div>
        <div
          class="absolute bottom-0 bg-black/30 w-full h-[calc(50vh-120px)]"
        ></div>
      </div>
    </qrcode-stream>
    <div
      v-if="result"
      class="w-full h-full flex flex-col gap-4 items-center justify-center"
    >
      <p>{{ result }}</p>
      <button
        class="outline-none py-1 px-3 text-white bg-green-400 border-none rounded-md"
        @click="scanAgain"
      >
        scan again
      </button>
    </div>
  </div>
</template>
<style>
.scan {
  animation: scan;
  animation-duration: 1250ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes scan {
  from {
    margin-top: 0px;
  }
  to {
    margin-top: 190px;
  }
}
</style>
<script setup>
import { QrcodeStream } from "vue3-qrcode-reader";
import scanDelivery from "@/graphQL/mutation/product/realtime/scanDelivery.gql";
const emit = defineEmits(["scanResult"]);
const scanStart = ref(false);
const result = ref("");
const { mutate, onError, onDone } = await useCustomMutation(scanDelivery);
onDone((done) => {
  emit("scanResult");
});
const onDecode = (decodeResult) => {
  const pars = JSON.parse(JSON.stringify(decodeResult)).ids;
  mutate({ ids: pars });
  emit("scanResult");
  scan.value = false;
};

const scanAgain = () => {
  scanStart.value = false;
  result.value = "";
};
const init = async (promise) => {
  await promise;
  scanStart.value = true;
};
</script>
