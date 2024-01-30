<template>
  <div>
    <FilterBox />
    
    <div class="product-list-container center-box">
      <div v-for="product of pagination?.data">
        <ProductCard :product="product" />
      </div>
    </div>

    <ProductPagination :pagination="pagination" @on-change-page="onChangePage" />
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref, watch } from "vue";
import { TProductServices, EAppEvents, IPagination } from "@/helpers";
import { TProduct } from "@/helpers/types/product.type";
import ProductCard from "./ProductCard.vue";
import ProductPagination from "./ProductPagination.vue";
import FilterBox from "./FilterBox.vue";

const productServices = inject<TProductServices>(EAppEvents.PRODUCT_SERVICES);

const pagination = ref<IPagination<TProduct>>();

const currentPage = ref(1);

onMounted(() => {
  pagination.value = productServices?.getPagination(1, 20);
});

watch(
  () => [productServices?.products?.value, currentPage.value],
  () => {
    pagination.value = productServices?.getPagination(currentPage.value, 20);
  }
);

const onChangePage = (page: number) => {
    currentPage.value = page
}
</script>

<style scoped>
.product-list-container {
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
}
</style>
