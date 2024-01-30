<template>
    <slot></slot>
</template>

<script setup lang="ts">
import { useRouter } from "@/hooks";
import { EAppEvents, TRouter } from "@/helpers"
import { provide } from "vue";

const router = useRouter();

provide<TRouter>(EAppEvents.ROUTER, router);
</script>