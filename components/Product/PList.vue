<template>
  <main>
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-3">
      <div v-for="(productInf, index) in PResult" :key="index">
        <ProductPCard :data="productInf" @on-delete-image="onDelete" />
      </div>
    </div>
  </main>
</template>
<script setup>
import physicalProducts from "@/graphQL/query/product/realtime/fetchPhysicalProducts.gql";
const { result, onError, refetch } = await useCustomQuery(physicalProducts, {
  id: "ecIPwE9HLyMBbDB4t9DtUkCy3M02",
});
const onDelete = () => {
  refetch();
};
const PResult = computed(() => {
  const data = result.value?.supplier?.physical_products;
  const pData = data?.map((products) => {
    const images = [];
    images.push({ image: products?.cover_image });
    products.physical_product_images.map((otherImages) => {
      images.push({ image: otherImages.image_url });
    });
    var rateValue = 0;
    products.physical_product_rates.map((rates) => {
      rateValue += rates.rating;
    });
    var totalRate =
      products.physical_product_rates.length == 0
        ? 1
        : products.physical_product_rates.length;
    var description = "";
    products.description.ops.map((txt) => {
      description += txt.insert + " ";
    });
    const singleProductData = {
      id: products.id,
      discount_id: products.discount_id ?? -1,
      title: products.title,
      category: products.physical_product_subcategory.name,
      postDate: products.created_at.substring(
        0,
        products.created_at.lastIndexOf("T")
      ),
      desc: description,
      price: products.unit_price,
      discount: products.discount?.rate ?? 0,
      amount: products.amount,
      status: products.status,
      rate: Math.round(rateValue / totalRate),
      address: products.product_address[0].sub_city,
      image: images,
    };
    return singleProductData;
  });
  return pData;
});

onError((error) => {
  console.log(error);
});
</script>
