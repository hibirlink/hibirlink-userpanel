<template>
  <div
    class="max-h-[500px] min-w-[800px] w-full overflow-x-scroll overflow-y-scroll flex justify-center text-gray"
  >
    <table class="text-md w-full">
      <tr class="bg-green400 sticky top-0 scrollbar-hide">
        <th
          class="font-extrabold py-3 min-w-[200px] text-white"
          v-for="(head, index) in prop.header"
          :key="index"
        >
          {{ head.name }}
        </th>
      </tr>
      <tr>
        <td class="py-1"></td>
      </tr>
      <tr
        class="text-center odd:bg-green-100"
        v-for="(data, index) in prop.tableData"
        :key="index"
      >
        <td class="py-4 font-bold text-sm">{{ data.date }}</td>
        <td class="max-w-[500px] text-start text-base">{{ data.item }}</td>
        <td>{{ data.price }} ETB</td>
      </tr>
    </table>
  </div>
</template>
<script setup lang="ts">
interface TableInterface {
  date: string;
  item: string;
  price: number;
}
interface HeaderInterface {
  name: string;
}

interface TablePropsInterface {
  tableData: Array<TableInterface>;
  header: Array<HeaderInterface>;
}

const prop = defineProps<TablePropsInterface>();
</script>
