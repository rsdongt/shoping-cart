<template>
  <div v-if="(pagination?.total ?? 0) > (pagination?.pageSize ?? 0)" class="pagination-container center-box">
    <div v-for="page in pagesList">
      <span @click="emit('on-change-page', page)" :class="`page center-box ${page === pagination?.pageIndex && 'active'}`">{{
        page
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IPagination, TProduct } from "@/helpers";
import { computed } from "vue";

type TProps = {
  pagination?: IPagination<TProduct>;
};

const emit = defineEmits(['on-change-page'])

const props = defineProps<TProps>();

const pagesList = computed(() => {
  const { total = 0, pageSize = 0 } =  props.pagination ?? {};

  const totalPages = Math.ceil(total / pageSize);

  const result = [];

  for (let i = 1; i <= totalPages; i++) {
    result.push(i);
  }

  return result;
});
</script>

<style scoped>
.page {
  color: #333;
  width: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  margin-right: 1rem;
  border: 1px solid #333;
  cursor: pointer;
}

.active {
  color: #fff;
  background: #1607eb;
}
</style>
