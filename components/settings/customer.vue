<template>
  <div class="flex flex-col justify-center mt-3">
    <h-notification
      class="mt-4"
      @close="messageShow = false"
      :success="messageStatus"
      :show-notification="messageShow"
      >{{ messageContent }}
    </h-notification>
    <div class="w-full mx-auto lg:grid lg:grid-cols-2 lg:gap-x-5">
      <h1 class="text-2xl font-bold w-full mx-auto mb-5 text-green400">
        General Setting
      </h1>
    </div>

    <form @submit.prevent="submitUpdateInfo" class="w-full">
      <div class="mx-auto lg:grid lg:grid-cols-2 lg:gap-x-5">
        <h1 class="text-lg font-bold w-full mx-auto mb-6 text-green400">
          Basic Info
        </h1>
        <h1 class="text-xl xl:text-2xl font-bold w-full mx-auto mb-6"></h1>
        <div class="w-full mx-auto">
          <h-text-field
            class="py-2"
            name="FirstName"
            placeholder="First Name"
            type="text"
            rules="required"
            label="First Name"
          />
        </div>

        <div class="w-full mx-auto">
          <h-text-field
            class="py-2"
            name="LastName"
            placeholder="Last Name"
            type="text"
            rules="required"
            label="Last Name"
          />
        </div>

        <div class="w-full mx-auto">
          <h-text-field
            class="py-2"
            name="Email"
            placeholder="example@gmail.com"
            type="email"
            rules="required"
            label="Email Address"
          />
        </div>
      </div>

      <div>
        <h1 class="text-lg font-bold w-full mx-auto mb-6 text-green400 mt-3">
          Privacy
        </h1>
        <p
          @click="showPopUp = !showPopUp"
          class="w-fit text-lg font-bold text-gray hover:text-green100 cursor-pointer transition-colors duration-300 ease-in-out"
        >
          Change password
        </p>
        <SettingsChangePassword
          v-if="showPopUp"
          @close="showPopUp = !showPopUp"
        ></SettingsChangePassword>
      </div>

      <div class="w-full max-w-xs ml-auto my-7">
        <HButton
          type="submit"
          name="Update General Info"
          button_class="px-7"
          class="ml-auto w-full"
        ></HButton>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { useForm } from "vee-validate";
import updateCustomer from "../../graphQL/mutation/updateCustomer.gql";
import useCustomMutation from "../../composables/useCustomMutation";
import { useAppStore } from "~/store/store";

const {
  mutate: mutateUpdateCustomer,
  onDone: onMutateUpdateCustomerResult,
  onError: onMutateUpdateCustomerError,
} = await useCustomMutation(updateCustomer);

interface PropsInterface {
  firstName?: string;
  lastName?: string;
  email?: string;
}

const props = defineProps<PropsInterface>();

const messageStatus = ref(false);
const messageShow = ref(false);
const messageContent = ref("");
const showPopUp = ref(false);

onMutateUpdateCustomerResult((data) => {
  showNotification(true, "Profile Updated Successfully.");
  const newInfo = data.data.userInfo as {
    success: boolean;
    message: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  useAppStore().setUser({
    email: newInfo.email,
    displayName: `${newInfo.firstName} ${newInfo.lastName}`,
  });
});

onMutateUpdateCustomerError((error) => {
  showNotification(false, error.message);
});

const { handleSubmit, resetForm, setValues } = useForm();

setValues({
  FirstName: props.firstName,
  LastName: props.lastName,
  Email: props.email,
});

const submitUpdateInfo = handleSubmit(
  async (value) => {
    mutateUpdateCustomer({
      email: value.Email,
      firstName: value.FirstName,
      lastName: value.LastName,
      token: useAppStore().token,
    });
  },
  (error) => {}
);

const showNotification = (status: boolean, message: string) => {
  messageShow.value = true;
  messageStatus.value = status;
  messageContent.value = message;
};
</script>
