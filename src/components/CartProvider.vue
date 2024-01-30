<template>
    <slot></slot>
</template>

<script setup lang="ts">
import { EAppEvents, TCartServices } from '@/helpers';
import { useCartServices } from '@/hooks/useCartServices';
import { provide } from 'vue';

const cartServices = useCartServices();

provide<TCartServices>(EAppEvents.CART_SERVICES, cartServices);
</script>

<style scoped>

</style>