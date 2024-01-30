<template>
  <RouteProvider>
    <ProductProvider>
      <CartProvider>
        <Layout />
      </CartProvider>
    </ProductProvider>
  </RouteProvider>
</template>

<script setup lang="ts">
import { Layout, RouteProvider, ProductProvider, CartProvider } from '@/components';
</script>

<style scoped>

</style>