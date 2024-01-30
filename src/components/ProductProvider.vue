<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { EAppEvents } from "@/helpers";
import { useProductServices } from "@/hooks";
import { provide } from "vue";

const productServices = useProductServices();

provide(EAppEvents.PRODUCT_SERVICES, productServices);
</script>
