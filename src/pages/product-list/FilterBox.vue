<template>
  <div class="filter-box center-box">
    <input
      v-model="searchtTerm"
      class="search-box"
      type="text"
      placeholder="Searching product name, description ..."
    />

    <div class="center-box">
      <span style="margin-right: 1rem">Sort by:</span>

      <div class="center-box">
        <button @click="toggleSort(ESortProduct.PRICE)" class="center-box">
          <span>Price</span>
          <img
            :src="sortData.sortByPrice === 'UP' ? arrowUp : arrowDown"
            alt="sort-by-price"
            width="24"
            height="24"
          />
        </button>
        <button @click="toggleSort(ESortProduct.STOCK)" class="center-box">
          <span>Stock</span>
          <img
            :src="sortData.sortByStock === 'UP' ? arrowUp : arrowDown"
            alt="sort-by-price"
            width="24"
            height="24"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EAppEvents, ESortProduct, ESortValue, TProductServices } from "@/helpers";
import { inject, ref, watch } from "vue";
import arrowUp from "@/assets/arrow-up.png";
import arrowDown from "@/assets/arrow-down.png";

type TSort = {
  sortByPrice: ESortValue.UP | ESortValue.DOWN;
  sortByStock: ESortValue.UP | ESortValue.DOWN;
};

const searchtTerm = ref("");

const sortData = ref<TSort>({ sortByPrice: ESortValue.UP, sortByStock: ESortValue.UP });

const { searchProductsByName, handleSort } =
  inject<TProductServices>(EAppEvents.PRODUCT_SERVICES) ?? {};

watch([searchtTerm], () => {
  searchProductsByName?.(searchtTerm.value);
});

watch(() => sortData.value.sortByPrice, () => {
    handleSort?.(ESortProduct.PRICE, sortData.value.sortByPrice)
});

watch(() => sortData.value.sortByStock, () => {
    handleSort?.(ESortProduct.STOCK, sortData.value.sortByStock)
});

const toggleSort = (key: ESortProduct.PRICE | ESortProduct.STOCK) => {
  const value = sortData.value[key];

  sortData.value = {
    ...sortData.value,
    [key]: value === ESortValue.UP ? ESortValue.DOWN: ESortValue.UP,
  };
};
</script>

<style scoped>
.filter-box {
  justify-content: space-between;
  margin-bottom: 1rem;
}

.search-box {
  padding: 0.5rem;
  border-radius: 0.5rem;
  width: 275px;
  border: 1px solid #333;
}

.search-box:focus-visible {
  box-shadow: none;
  border: 1px solid #333;
}
</style>
