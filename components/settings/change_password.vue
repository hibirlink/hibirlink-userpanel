Copy code
<template>
  <div class="">
    <h-notification
      class="mt-4"
      @close="messageShow = false"
      :success="messageStatus"
      :show-notification="messageShow"
      >{{ messageContent }}
    </h-notification>
    <popup @close="emits('close')">
      <template v-slot:content>
        <form
          @submit.prevent="handlePasswordChange"
          class="w-full flex flex-col items-center justify-center"
        >
          <h1
            class="text-3xl font-bold font-nunito text-green200 text-left w-full max-w-[27rem] mb-3"
          >
            Change Password
          </h1>
          <h1
            class="text-base font-semibold font-nunito text-gray text-left w-full max-w-[27rem] mb-5"
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias,
            quasi.
          </h1>
          <div class="max-w-[27rem] w-full mx-auto">
            <h-text-field
              class="py-2"
              name="NewPassword"
              placeholder="New password"
              type="password"
              rules="required|password"
              :trailing-icon="EyeSlashIcon"
            />
          </div>
          <div class="max-w-[27rem] w-full mx-auto">
            <h-text-field
              class="py-2"
              name="Confirmation"
              placeholder="Confirm your new password"
              type="password"
              rules="required|confirmPassword:NewPassword"
              :trailing-icon="EyeSlashIcon"
            />
          </div>
          <div class="w-full mx-auto mt-3">
            <HButton
              type="submit"
              name="Change Password"
              button_class="px-7"
              class="w-full"
            ></HButton>
          </div>
        </form>
      </template>
    </popup>
  </div>
</template>

<script setup lang="ts">
import { XCircleIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";
import { useForm } from "vee-validate";
import updatePassword from "../../graphQL/mutation/updatePassword.gql";
import useCustomMutation from "../../composables/useCustomMutation";
import { useAppStore } from "~/store/store";

const {
  mutate: mutateUpdatePassword,
  onDone: onMutateUpdatePasswordResult,
  onError: onMutateUpdatePasswordError,
} = await useCustomMutation(updatePassword);

const { handleSubmit, resetForm } = useForm();
onMutateUpdatePasswordResult((data) => {
  showNotification(
    true,
    "Password updated successfully. Now you can log in with your new password."
  );
  resetForm();
});
onMutateUpdatePasswordError((error) => {
  showNotification(false, error.message);
});

const messageStatus = ref(false);
const messageShow = ref(false);
const messageContent = ref("");

const emits = defineEmits(["close"]);

const handlePasswordChange = handleSubmit(async (value) => {
  mutateUpdatePassword({
    newPassword: value.NewPassword,
    token: useAppStore().token,
  });
});

const showNotification = (status: boolean, message: string) => {
  messageShow.value = true;
  messageStatus.value = status;
  messageContent.value = message;
};
</script>
