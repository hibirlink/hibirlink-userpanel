<template>
  <main>
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-3">
      <div v-for="(productInf, index) in PResult" :key="index">
        <ProductVCard :data="productInf" @on-delete-image="onDelete()" />
      </div>
    </div>
  </main>
</template>
<script setup>
import digitalProducts from "@/graphQL/query/product/digital/fetchDigitalProducts.gql";
const { result, onError, refetch } = await useCustomQuery(digitalProducts, {
  id: "ecIPwE9HLyMBbDB4t9DtUkCy3M02",
});
onError((error) => {
  console.log(error);
});
const onDelete = () => {
  refetch();
};
const PResult = computed(() => {
  const data = result.value?.supplier?.product ?? [];
  const pData = data.map((products) => {
    const images = [];
    images.push({ image: products?.cover_image });
    products.images.map((otherImages) => {
      images.push({ image: otherImages.imageUrl });
    });
    var rateValue = 0;
    products.rate.map((rates) => {
      rateValue += rates.rate;
    });
    var totalRate = products.rate.length == 0 ? 1 : products.rate.length;

    var description = "";
    products.description.ops.map((txt) => {
      description += txt.insert + " ";
    });
    const singleProductData = {
      id: products.id,
      title: products.title,
      category: products.category.name,
      postDate: products.created_at.substring(
        0,
        products.created_at.lastIndexOf("T")
      ),
      desc: description,
      price: products.unit_price,
      rate: Math.round(rateValue / totalRate),
      image: images,
    };
    return singleProductData;
  });
  return pData;
});
</script>
