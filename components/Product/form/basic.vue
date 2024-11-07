<template>
  <section>
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
            v-model="selectedCategory"
          ></h-select>

          <h-select
            :items="subCategories"
            name="subCategory"
            label="Sub Category"
          ></h-select>
        </div>
        <div class="w-full grid grid-cols-2 gap-5">
          <h-select :items="status" name="status" label="Status"></h-select>
          <div class="">
            <h-text-field
              class="py-2"
              label="Amount"
              name="amount"
              placeholder="Amount"
              type="number"
              rules="required"
            />
          </div>
        </div>

        <div class="w-full grid grid-cols-2 gap-5">
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
      </div>
      <div>
        <div class="w-full h-fit">
          <h-rich-text
            cls="min-h-[11rem]"
            placeHolder="Put your product description here."
            name="description"
            rules="quill"
            label="Product Description"
          />
        </div>
        <slot name="thumb"></slot>
      </div>
    </div>
  </section>
</template>
<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import { useField } from "vee-validate";
import selectOptions from "~/graphQL/query/product/realtime/fetchSelectOptions.gql";
const { value } = useField("subCategory", "required");
const { value: catValue } = useField("category");
const selectedCategory = ref(catValue.value);
watch(selectedCategory, (newValue) => {
  value.value = undefined;
});
const subCategories = computed(() => {
  if (selectedCategory.value) {
    const cat = category.value.find(
      (cat) => selectedCategory.value.name === cat.name
    );
    return cat?.subCategory ?? [];
  }
  return [];
});

const categoryList = computed(() => {
  const cat = category.value.map((cat) => {
    return { id: cat.id, name: cat.name };
  });
  return cat;
});

const { result, error } = await useCustomQuery(selectOptions);
const status = computed(() => {
  const data = result.value?.product_status ?? [];

  return data.map((st) => st.value);
});
const category = computed(() => {
  const data = result.value?.physical_product_category ?? [];

  return data.map((ct) => {
    const subCategory = ct.physical_product_subcategories.map((sub) => {
      return { id: sub.id, name: sub.name };
    });
    return { id: ct.id, name: ct.name, subCategory: subCategory };
  });
});
</script>
