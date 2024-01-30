<template>
    <div>
        <p>Ooooooops!</p>
        pathname: "{{ pathname }}" not found!
    </div>
</template>

<script setup lang="ts">
const pathname = window.location.pathname;
</script>

<style scoped>

</style>