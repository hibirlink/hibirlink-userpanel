<template>
  <section class="flex flex-col w-full">
    <div class="w-full flex-1 grid grid-cols-1 gap-5 lg:grid-cols-2 py-5">
      <div
        v-if="pendingTransaction && pendingTransaction?.length > 0"
        class="flex flex-col gap-3 justify-center"
      >
        <h1 class="text-lg lg:text-xl xl:text-2xl font-bold">Pending Orders</h1>
        <div
          v-for="(order, index) in pendingTransaction"
          :key="index"
          :class="
            index == currentPendingIndex
              ? 'text-green400 border-l-2 border-green400 fill-green400'
              : 'fill-gray'
          "
          @click="() => updatePendingOrderIndex(index)"
          class="py-3 relative cursor-pointer flex flex-col gap-3 w-full text-md px-4"
        >
          <div
            :class="index == currentPendingIndex ? 'font-bold' : ''"
            class="flex justify-between"
          >
            <p>{{ order?.created_at }}</p>
            <p>{{ order?.data && total_price(order?.data) }} ETB</p>
          </div>
          <p class="pr-[30px] text-sm">
            {{ order?.data && concat(order?.data) }}
          </p>
          <viewfinder-circle-icon
            @click="togglePopup"
            :class="index == currentPendingIndex ? 'animate-pulse' : ''"
            class="w-[25px] lg:hidden h-[25px] absolute right-0 bottom-2"
          />
        </div>
      </div>

      <div
        :class="
          popupShow
            ? 'w-[100vw] fixed min-h-[100vh] overflow-auto left-0 top-0 z-50 flex items-center justify-center bg-black/30'
            : 'hidden'
        "
        class="flex-1 transition-colors duration-700 select-none py-5 items-center justify-center lg:flex"
      >
        <div
          :class="popupShow ? 'bg-white' : ''"
          class="p-5 rounded-md max-w-[400px] max-h-[90vh] h-full overflow-auto"
        >
          <div
            v-if="pendingTransaction"
            class="flex w-full justify-center items-center"
          >
            <qrcode-vue
              :value="
                JSON.stringify({
                  transaction_key:
                    pendingTransaction[currentPendingIndex].transaction_key,
                  ids: showQRWithData(
                    pendingTransaction[currentPendingIndex].data
                  ),
                })
              "
              :size="200"
              level="H"
            />
          </div>
          <h1
            class="text-lg lg:text-xl xl:text-2xl font-bold max-w-[27rem] w-fit mt-4 mb-2"
          >
            Get Scanned This QR Code
          </h1>

          <p class="w-full mx-auto text-sm">
            To receive the package, make sure the delivery person scan the
            bellow QR Code.
          </p>

          <p class="text-lg font-bold text-green300 mt-4 mb-2">
            Package Content
          </p>
          <p
            v-if="
              pendingTransaction &&
              pendingTransaction[currentPendingIndex]?.data
            "
            class="w-full mx-auto text-sm"
          >
            {{ concat(pendingTransaction[currentPendingIndex]?.data) }}
          </p>

          <p class="w-full text-right mx-auto mt-4 mb-2 font-bold">
            Total fee :
            {{
              pendingTransaction &&
              total_price(pendingTransaction[currentPendingIndex]?.data)
            }}
            ETB
          </p>
          <p
            v-if="popupShow"
            @click="togglePopup"
            class="w-full text-right mx-auto mt-4 mb-2 text-red font-bold"
          >
            Close
          </p>
        </div>
      </div>
    </div>
    <h1 class="text-lg lg:text-xl xl:text-2xl font-bold">
      Completed Transactions
    </h1>
    <div class="mt-6 overflow-auto">
      <ve-table :header="headers" :tableData="completed_transaction" />
    </div>
  </section>
</template>
<script setup lang="ts">
import { ViewfinderCircleIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import QrcodeVue from "qrcode.vue";
import transactionQuery from "@/graphQL/query/transaction.gql";
const userId = localStorage.getItem("userID") ?? "";
const { result: transactionQueryResult, onError: onTransactionError } =
  await useCustomQuery(transactionQuery, { userId, "status": {"_eq": "delliverd"} });
onTransactionError((error) => {
  console.log(error);
});

const transactionHistory = computed(() => {
  const data = transactionQueryResult.value?.user.order ?? null;
  if (data) {
    return data.map((order: any, index: number) => {
      let group: any = {};
      order?.detail.map((product: any, index2: number) => {
        if (
          !(
            group[`${product?.product?.supplier.id}`] &&
            group[`${product?.product?.supplier.id}`]?.length >= 0
          )
        ) {
          group[`${product?.product?.supplier.id}`] = [];
        }

        group[`${product?.product?.supplier.id}`].push({
          quantity: product.quantity,
          title: product?.product.title,
          unit_price: product.unit_price,
          order_detail_id: product.id,
        });
      });

      return {
        order_id: order.id,
        transaction_key: order.transaction_key,
        status: order.status,
        created_at: order.created_at,
        data: group,
      };
    });
  }

  return data;
});

const pendingTransaction = computed(() =>
  transactionHistory.value?.filter(
    (transaction: any) => transaction.status == "pending"
  )
);
const completeTransaction = computed(() =>
  transactionHistory.value?.filter(
    (transaction: any) => transaction.status == "completed"
  )
);

watchEffect(() => {
  console.log("watch Effect", transactionHistory.value);
  console.log("pending", pendingTransaction.value);
  console.log("complete", completeTransaction.value);
});

useHead({
  title: "Order & Transactions",
});
definePageMeta({
  middleware: "before-route-entry",
  layout: "custom",
});

const popupShow = ref(false);
const closePopup = () => {
  popupShow.value = !popupShow.value;
};
const togglePopup = (): void => {
  popupShow.value = !popupShow.value;
};
const currentPendingIndex = ref(0);
const updatePendingOrderIndex = (index: number): void => {
  currentPendingIndex.value = index;
};

interface pendingOrdersInterface {
  date: string;
  desc: string;
  price: number;
  qr_code: string;
}

const total_price = (value: any) => {
  value = value[`${Object.keys(value)[0]}`];
  value = value?.map((element: any) => {
    return element.unit_price * element.quantity;
  });
  let temp_data = value?.reduce((previous: any, current: any) => {
    return previous + current;
  }, 0);

  return temp_data;
};

const showQRWithData = (value: any) => {
  if (value[`${Object.keys(value)[0]}`]) {
    value = value[`${Object.keys(value)[0]}`];

    return value.map((e:any) => {
      return e.order_detail_id;
    });
  } else return [];
};

const completed_transaction = computed(() => {
  if (completeTransaction.value)
    return completeTransaction.value.map((value: any) => {
      return {
        date: value.created_at,
        item: concat(value.data),
        price: total_price(value.data),
      };
    });

  return [];
});

const concat = (value: any) => {
  value = value[`${Object.keys(value)[0]}`];
  let concat_name: string = "";
  value?.map((element: any) => {
    if (concat_name) concat_name = concat_name + " , " + element.title;
    else concat_name = concat_name + element.title;
  });
  return concat_name;
};


interface headersInterface {
  name: string;
}
interface tableDataInterface {
  date: string;
  item: string;
  price: number;
}
const headers: Array<headersInterface> = [
  { name: "Issued Date" },
  { name: "Purchased Items" },
  { name: "Total Prices" },
];
</script>
