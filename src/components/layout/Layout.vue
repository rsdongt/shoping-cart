<template>
  <div class="page-container">
    <div class="page-header">
        <Header />
    </div>

    <div class="page-content">
      <Router />
    </div>

    <div class="page-footer">
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Router } from "@/components";
import Header from "./Header.vue";
import Footer from "./Footter.vue";
</script>

<style scoped>
.page-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100vw;
    max-width: 1366px;
}

.page-content {
    flex-grow: 1;
    padding: 1rem .5rem;
}

.page-footer {
  border-top: 1px dashed #9e9898;
  padding: 1rem;
}
</style>