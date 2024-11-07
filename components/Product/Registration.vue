<template>
  <section class="min-h-[calc(100vh-3.7rem)] flex flex-col w-full">
    <h-notification
      @close="messageShow = false"
      :success="messageStatus"
      :show-notification="messageShow"
      >{{ messageContent }}
    </h-notification>
    <div class="w-full flex-1">
      <div class="w-full mx-auto flex flex-col gap-3 justify-center mt-2">
        <h1 class="text-3xl font-bold text-green400">Register As A Supplier</h1>
        <p class="text-gray text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima ab
          voluptatibus dolorum voluptates? Quisquam itaque aut asperiores, ipsum
          error cupiditate blanditiis numquam pariatur sapiente explicabo libero
          laborum nam minima accusantium enim nesciunt quidem expedita eaque
          ratione. Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
          id ipsum mollitia culpa, recusandae eligendi aperiam? Error nam, nulla
          odit dignissimos et porro iure nihil, molestias corporis laudantium
          incidunt ab! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Accusantium dolorem consequuntur blanditiis, necessitatibus maxime
          mollitia consequatur magnam iste veniam nemo aspernatur modi unde, ut
          inventore assumenda molestias non minus quisquam!
        </p>
      </div>
      <div class="flex flex-col justify-center mt-8">
        <div class="w-full mx-auto lg:grid lg:grid-cols-2 lg:gap-x-5">
          <h1 class="text-2xl font-bold w-full mx-auto mb-6">
            Submit The Form Below
          </h1>
          <h1 class="text-xl xl:text-2xl font-bold w-full mx-auto mb-6"></h1>
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

            <h1
              class="text-lg font-bold w-full mx-auto mb-6 text-green400"
            ></h1>
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
              :items="['Oromia', 'Amhara', 'Tigray', 'Debub']"
              name="RegionOrCity"
              label="Region/City"
              rules="required"
            ></h-select>

            <h-select
              :items="['Bole', 'Bahir Dar', 'Gojam']"
              name="SubCity"
              label="Sub City"
              rules="required"
            ></h-select>
          </div>

          <h-rich-text
            toolbar="essential"
            name="LocationDescription"
            label="Location Description"
            rules="required"
            placeholder="Put your Store location description here"
          >
          </h-rich-text>

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
                  (payload:any) => {
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
              name="Register"
              button_class="px-7"
              class="ml-auto w-full"
            ></HButton>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useForm } from "vee-validate";
import { XCircleIcon, PlusIcon } from "@heroicons/vue/24/outline";
import registerSupplier from "@/graphQL/mutation/registerAsSupplier.gql";

useHead({
  title: "Register as supplier",
});

const {
  mutate: mutateRegisterSupplier,
  onDone: onMutateRegisterSupplierResult,
  onError: onMutateRegisterSupplierError,
} = await useCustomMutation(registerSupplier);

const showPopUp = ref(false);
const messageStatus = ref(false);
const messageShow = ref(false);
const messageContent = ref("");

onMutateRegisterSupplierResult(async (data) => {
  const id_token = await getUserIdToken();
  const config = useRuntimeConfig().public;
  const result = await useFetch(`${config.WEB_HOOK_BASE_URL}/updateToken`, {
    method: "POST",
    headers: { action_secret: config.ACTION_SECRET_KEY },
    body: {
      input: { credentials: { id_token } },
    },
  });
  const cResult = result.data.value as { success: boolean };
  if (cResult.success) {
    console.log(result.data.value);
    await storeUserToken();
    showNotification(true, "You have successfully registered as supplier.");
  } else {
    showNotification(false, "failed");
  }
});
onMutateRegisterSupplierError((error) => {
  showNotification(false, error.message);
});

interface AccountInterface {
  key?: string;
  value?: string;
}
const accountList = ref<Array<AccountInterface>>([]);

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

const { handleSubmit, resetForm } = useForm();
const submitRegisterSupplierForm = handleSubmit(
  (value) => {
    const id = localStorage.getItem("userID");
    const object = {
      id,
      object: {
        id,
        storeName: value.BusinessName,
        phoneNumber: value.PhoneNumber,
        accountNumber: {
          type: value.PaymentMethod,
          account_number: value.AccountNumber,
          account_holder_name: value.AccountHolderName,
        },
        tinNumber: value.TinNumber,
        socialMedia: accountList.value,
        supplier_addresses: {
          data: {
            regionOrCity: value.RegionOrCity,
            subCity: value.SubCity,
            description: value.LocationDescription,
          },
        },
      },
    };

    console.log(object);

    mutateRegisterSupplier(object);
  },
  (error) => {}
);

const showNotification = (status: boolean, message: string) => {
  messageShow.value = true;
  messageStatus.value = status;
  messageContent.value = message;
};
</script>
