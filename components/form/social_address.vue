<template>
  <div class="w-full">
    <div class="w-full flex justify-end">
      <button
        @click="showModal"
        class="text-green200 font-bold border-b tracking-wide border-gray-light hover:text-green400 transition-colors ease-in-out duration-300 my-1"
      >
        Add Social Link
      </button>
    </div>

    <modal :isRemoved="isRemoved" @getUpdateParent="updateParent">
      <template #modal="{ isClosed }">
        "
        <div
          v-if="isRemoved"
          :class="{ 'scale-0': !isClosed, 'scale-100': isClosed }"
          class="bg-green1000 relative lg:w-[1000px] transition-all duration-1000 justify-self-center flex flex-col gap-5 md:w-sm w-[80%] h-[30rem] px-[10%] py-[3rem] rounded-md"
        >
          <span
            @click="remove_modal"
            class="w-[2rem] h-[2rem] group rounded-md cursor-pointer hover:bg-gray/30 focus:bg-gray/30 flex justify-center items-center border-[0.1px] border-gray/30 absolute top-3 right-6"
            ><x-mark-icon class="w-6 text-2xl group-hover:text-green1000 h-6"
          /></span>
          <div class="gap-3 flex flex-col pb-6">
            <h2 class="text-xl font-extrabold text-gray">Add Social Address</h2>
            <hr class="h-[0.00001px] w-full border-gray-light" />
          </div>
          <h-select
            :items="['Telegram', 'Facebook', 'Instagram', 'TikTak', 'Twitter']"
            label="Social Media Type"
            name="media type"
          />
          <h-text-field
            class="py-2 w-full"
            name="Social Media"
            type="text"
            rules="required|phone:9"
            label="URL"
            placeholder="e.g https://www.hodfaacebook.com"
          />
          <div class="flex flex-row gap-8 w-full justify-end">
            <button class="bg-transparent">Cancel</button>
            <h-button
              name="Save"
              button_class="px-3 text-white"
              @click="Save"
            ></h-button>
          </div>
        </div>
      </template>
    </modal>
    <div v-if="allSocialAddress && allSocialAddress.length > 0">
      <h1 class="text-xl text-gray font-semibold pb-3">Social Media</h1>
      <div class="flex w-full flex-row flex-wrap gap-4">
        <div
          v-for="(social_media, index) in allSocialAddress"
          :key="social_media"
          class="min-h-[2rem] border-[0.4px] grid grid-cols-2 border-gray/10 rounded-md min-w-[20rem] px-3 py-3 gap-y-[20px]"
        >
          <h3 class="font-bold">{{ social_media?.name }}</h3>
          <trash-icon
            class="w-5 h-7 text-gray justify-self-end"
            @click="deleteSocialAddress(social_media.name)"
          />
          <a
            :href="social_media.url"
            class="text-sm hover:text-blue-800 line-clamp-1 w-[13rem]"
            target="_blank"
          >
            {{ social_media.url }}</a
          >
          <pencil-icon
            class="text-4xl h-[1.3rem] text-gray justify-self-end"
            @click="
              edit({
                name: social_media.name,
                url: social_media.url,
                id: index,
              })
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { XMarkIcon, TrashIcon, PencilIcon } from "@heroicons/vue/24/solid";
const props = defineProps({ social_addresses: Array<any> });
const { value: socialMedia, errorMessage: socialError } = useField(
  "Social Media",
  "required",
  { initialValue: "" }
);
const { value: type } = useField("media type", "required", {
  initialValue: "",
});
const { value: allSocialAddress } = useField("all social address", "required", {
  keepValueOnUnmount: true,
});
if (props.social_addresses?.length) {
  allSocialAddress.value = props.social_addresses;
}
if (!allSocialAddress.value) {
  allSocialAddress.value = [];
}

const isRemoved = ref(false);
const editedID = ref(-1);
const remove_modal = () => {
  isRemoved.value = false;
};
const updateParent = (value: boolean) => {
  isRemoved.value = value;
};
const isEditing = ref(false);
const editedName = ref("");
const showModal = () => {
  isRemoved.value = true;
  (type.value = ""), (socialMedia.value = "");
};

const edit = (initial_value: any) => {
  isRemoved.value = true;
  isEditing.value = true;
  editedID.value = initial_value.id;
  type.value = initial_value.name;
  socialMedia.value = initial_value.url;
  editedName.value = initial_value.name;
};

const Save = () => {
  if (typeof allSocialAddress.value === "object") {
    isRemoved.value = false;
    if (isEditing.value) {
      allSocialAddress.value[editedID.value] = {
        name: type.value,
        url: socialMedia.value,
      };
      isEditing.value = false;

      return;
    } else if (allSocialAddress.value && allSocialAddress.value.length > 0)
      allSocialAddress.value = allSocialAddress.value.filter((element) => {
        return element?.name && element.name !== type.value;
      });

    allSocialAddress.value?.push({ name: type.value, url: socialMedia.value });
  }
};
const deleteSocialAddress = (name: string) => {
  // alert("do you wana delete it?");
  allSocialAddress.value = allSocialAddress.value.filter((value) => {
    return value?.name !== name;
  });
};
</script>
