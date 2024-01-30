<template>
  <div class="header-container center-box">
    <h1 @click="navigate?.('/')" class="shop-name">MONI SHOP</h1>

    <div class="center-box">
      <span>Welcome Guest!</span>
      <div @click="navigate?.('/cart')" class="cart-box">
        <img :src="cartIcon" alt="cart" width="32" />
        <div class="count">{{ totalItems }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import cartIcon from "@/assets/cart-icon.png";
import { EAppEvents, TCartServices, TRouter } from "@/helpers";
import { computed, inject } from "vue";

const { navigate } = inject<TRouter>(EAppEvents.ROUTER) ?? {};

const { cart } = inject<TCartServices>(EAppEvents.CART_SERVICES) ?? {};

const totalItems = computed(() => {
  const { products = []} = cart?.value ?? {};

  return products.reduce((total, current) => total + Number(current.quantity), 0)
})
</script>

<style scoped>
.header-container {
    padding: 1rem;
    justify-content: space-between;
    border-bottom: 1px dashed #9e9898;
}

.cart-box {
    margin-left: 1rem;
    position: relative;
    user-select: none;
    cursor: pointer;
}

.count {
    position: absolute;
    top: -35%;
    right: -40%;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #f1c603;
    line-height: 20px;
    font-size: 12px;
    font-weight: 500;
    color: #fff;
}

.shop-name {
    margin: 0;
    font-size: 2rem;
    user-select: none;
    cursor: pointer;
}
</style>
