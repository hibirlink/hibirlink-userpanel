<template>
  <div class="flex flex-col justify-center mt-3">
    <h-notification
      @close="messageShow = false"
      :success="messageStatus"
      :show-notification="messageShow"
      >{{ messageContent }}
    </h-notification>
    <div class="w-full mx-auto lg:grid lg:grid-cols-2 lg:gap-x-5">
      <h1 class="text-2xl font-bold w-full mx-auto mb-5 text-green400">
        Supplier Setting
      </h1>
      <qr-scanner v-if="showQrCode" class="fixed top-0 h-screen w-screen" @scanResult="scanResult"/>
      <h-button
         @click="showQrCode = true"
          name="Scan Qr Code"
          type='button'
          class="bg-lemon rounded-md uppercase tracking-wide w-fit px-4 text-white py-1.5  font-semibold self-end ml-auto flex items-center justify-center gap-1 hover:bg-green400 transition-colors ease-in-out duration-300"
        >
          <CheckIcon
            
            class="w-5 h-5 text-green200"
          />
        </h-button>
    </div>

    <form @submit.prevent="submitRegisterSupplierForm" class="w-full">
      <div class="mx-auto lg:grid lg:grid-cols-2 lg:gap-x-5">
        <h1 class="text-lg font-bold w-full mx-auto mb-6 text-green400">
          Basic Info
        </h1>
        <h1 class="text-xl xl:text-2xl font-bold w-full mx-auto mb-6"></h1>
        <div class="w-full mx-auto">
          <h-text-field
            class="py-2"
            name="BusinessName"
            placeholder="Business Name"
            type="text"
            rules="required"
            label="Business/Store Name"
          />
        </div>

        <div class="w-full mx-auto">
          <h-text-field
            class="py-2"
            name="TinNumber"
            placeholder="Tin Number"
            type="text"
            rules="required"
            label="Tin Number"
          />
        </div>

        <div class="w-full mx-auto">
          <h-text-field
            class="py-2"
            name="PhoneNumber"
            placeholder="933-704-978"
            type="tel"
            rules="required"
            label="Phone Number"
            leading-text="+251"
          />
        </div>

        <h1 class="text-lg font-bold w-full mx-auto mb-6 text-green400"></h1>
        <h1 class="text-lg font-bold w-full mx-auto mb-6 text-green400">
          Account Info
        </h1>
        <h1 class="text-xl xl:text-2xl font-bold w-full mx-auto mb-6"></h1>

        <h-select
          :items="[
            'CBE Birr',
            'Awash Birr',
            'Telebirr',
            'Card(Debit/Credit)',
            'Hellocash',
            'Amole',
          ]"
          name="PaymentMethod"
          label="Payment Method"
          rules="required"
        ></h-select>
        <div class="w-full mx-auto">
          <h-text-field
            class="py-2"
            name="AccountNumber"
            placeholder="Account Number"
            type="text"
            rules="required"
            label="Account Number"
          />
        </div>

        <div class="w-full mx-auto">
          <h-text-field
            class="py-2"
            name="AccountHolderName"
            placeholder="Ebelu"
            type="text"
            rules="required"
            label="Account Holder Name"
          />
        </div>

        <h1 class="text-xl xl:text-2xl font-bold w-full mx-auto mb-6"></h1>
        <h1 class="text-lg font-bold w-full mx-auto mb-6 text-green400">
          Location Info
        </h1>
        <h1 class="text-xl xl:text-2xl font-bold w-full mx-auto mb-6"></h1>

        <h-select
          :items="location"
          name="RegionOrCity"
          label="Region/City"
          rules="required"
          v-model="located_at"
        ></h-select>

        <h-select
          :items="subLocation||[]"
          name="SubCity"
          label="Sub City"
          rules="required"
        ></h-select>
      </div>

      <h-quill-editor
        name="LocationDescription"
        label="Location Description"
        rules="required"
        placeholder="Put your Store location description here"
      >
      </h-quill-editor>

      <h1 class="text-lg font-bold w-full mx-auto mb-6 text-green400 mt-8">
        Additional Information (Optional)
      </h1>

      <div
        class="flex w-full items-center my-5 transition-all duration-300 ease-in-out"
      >
        <p
          v-if="accountList.length > 0"
          class="flex-1 font-bold text-green400 cursor-pointer transition-all duration-300 ease-in-out"
        >
          Social Accounts
        </p>
        <p
          @click="showPopUp = !showPopUp"
          class="w-fit font-bold text-gray hover:text-green100 cursor-pointer transition-all duration-300 ease-in-out"
        >
          Add New Social Media
        </p>
      </div>

      <div class="flex fl flex-wrap gap-4 w-full my-5">
        <div
          v-for="account in accountList"
          :key="account.key"
          class="flex flex-wrap items-center text-sm gap-2 w-fit border rounded-full border-green400 bg-opacity border-opacity-50 py-2 px-4"
        >
          <p class="font-bold">{{ account.key }}</p>
          <span class="font-bold"> : </span>
          <span>{{ account.value }} </span>
          <XCircleIcon
            @click="() => removeAccount(account)"
            class="hover:stroke-red transition-colors duration-300 ease-in-out w-6 h-6 cursor-pointer"
          ></XCircleIcon>
        </div>
      </div>

      <popup v-if="showPopUp" @close="showPopUp = !showPopUp">
        <template v-slot:content>
          <ProductAddEditSocialMedia
            @add-account="
              (payload) => {
                showPopUp = !showPopUp;
                addSocialAccount(payload);
              }
            "
          ></ProductAddEditSocialMedia>
        </template>
      </popup>
      <div class="w-full max-w-xs ml-auto my-7">
        <HButton
          type="submit"
          name="Update Supplier Info"
          button_class="px-7"
          class="ml-auto w-full"
        ></HButton>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { XCircleIcon, PlusIcon } from "@heroicons/vue/24/outline";
import updateSupplier from "../../graphQL/mutation/updateSupplier.gql";
import useCustomMutation from "../../composables/useCustomMutation";
import Delta from "quill-delta";
const showQrCode = ref(false);

const scanResult = ()=>{
   showQrCode.value = false;
   showNotification(true, "Item Delivered")
} 
const {
  mutate: mutateUpdateSupplier,
  onDone: onMutateUpdateSupplierResult,
  onError: onMutateUpdateSupplierError,
} = await useCustomMutation(updateSupplier);
interface AccountInterface {
  key?: string;
  value?: string;
}
interface PropsInterface {
  supplierProfile: {
    storeName: string;
    tinNumber: string;
    phoneNumber: string;
    accountNumber: {
      type: string;
      account_number: string;
      account_holder_name: string;
    };
    socialMedia: Array<AccountInterface>;
    supplier_addresses: Array<{
      regionOrCity: string;
      subCity: string;
      description: Delta;
    }>;
  };
}
const props = defineProps<PropsInterface>();

const showPopUp = ref(false);
const messageStatus = ref(false);
const messageShow = ref(false);
const messageContent = ref("");

onMutateUpdateSupplierResult((data) => {
  showNotification(true, "Supplier profile updated successfully");
});
onMutateUpdateSupplierError((error) => {
  showNotification(false, error.message);
});

const accountList = ref<Array<AccountInterface>>([]);
props.supplierProfile.socialMedia.forEach((acc) => {
  accountList.value.push({ ...acc });
});

const addSocialAccount = (account: { type: string; value: string }) => {
  let ignorePush = false;
  accountList.value.forEach((acc) => {
    if (acc.key === account.type) {
      acc.value = account.value;
      ignorePush = true;
      return;
    }
  });
  if (!ignorePush)
    accountList.value?.push({
      key: account.type,
      value: account.value,
    });
};

const removeAccount = (account: AccountInterface) => {
  accountList.value = accountList.value.filter((acc) => acc !== account);
};

const { handleSubmit, resetForm, setValues } = useForm();

setValues({
  BusinessName: props.supplierProfile.storeName,
  TinNumber: props.supplierProfile.tinNumber,
  PhoneNumber: props.supplierProfile.phoneNumber,
  PaymentMethod: props.supplierProfile.accountNumber.type,
  AccountNumber: props.supplierProfile.accountNumber.account_number,
  AccountHolderName: props.supplierProfile.accountNumber.account_holder_name,
  RegionOrCity: props.supplierProfile.supplier_addresses[0].regionOrCity,
  SubCity: props.supplierProfile.supplier_addresses[0].subCity,
  LocationDescription: JSON.parse(
    JSON.stringify(props.supplierProfile.supplier_addresses[0].description)
  ),
});

const submitRegisterSupplierForm = handleSubmit(
  (value) => {
    const id = localStorage.getItem("userID");
    const object = {
      id,
      supplier_info: {
        storeName: value.BusinessName,
        phoneNumber: value.PhoneNumber,
        accountNumber: {
          type: value.PaymentMethod,
          account_number: value.AccountNumber,
          account_holder_name: value.AccountHolderName,
        },
        tinNumber: value.TinNumber,
        socialMedia: accountList.value,
      },
      supplier_address_info: {
        regionOrCity: value.RegionOrCity,
        subCity: value.SubCity,
        description: value.LocationDescription,
      },
    };
    mutateUpdateSupplier(object);
  },
  (error) => {}
);

const location = ["Amhara", "Tigray", "Oromia", "Addis Ababa"];
const { value } = useField("SubCity");
const subLocatedValue: any = {
  Amhara: ["BahirDar", "DebreMarkos", "Gonder", "Debre Birhan"],
  Oromia: ["Ambo", "Adama"],
  Tigray: ["Mekele", "Adigrat"],
  "Addis Ababa": ["Bole", "Saris 22 Mazoria"],
};
const located_at = ref("");

const subLocation = computed(() => {
  return subLocatedValue[`${located_at.value}`];
});

watch(located_at, (newdata) => {
  value.value = "";
});

const showNotification = (status: boolean, message: string) => {
  messageShow.value = true;
  messageStatus.value = status;
  messageContent.value = message;
};
</script>
