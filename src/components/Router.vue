<template>
  <component :is="currentPage"></component>
</template>

<script setup lang="ts">
import { EAppEvents, TRouter, productListRegx } from "@/helpers";
import { NotFound, Cart, ProductDetail, ProductList } from "@/pages";
import { computed, inject } from "vue";

const { location } = inject<TRouter>(EAppEvents.ROUTER) ?? {};

const currentPage = computed(() => {
  const { pathname = "" } = location?.value ?? {};

  switch (true) {
    case pathname === "/":
      return ProductList;
    case pathname === "/cart":
      return Cart;
    case productListRegx.test(pathname):
      return ProductDetail;
    default:
      return NotFound;
  }
});
</script>
