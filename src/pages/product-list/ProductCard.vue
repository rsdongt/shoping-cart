<template>
  <div class="product-cart">
    <img
      @click="navigate?.(`/${product.id}`)"
      class="herro-image"
      :src="product.image"
      :alt="product.name"
      width="100%"
      height="175"
    />
    <h4>{{ product.name }}</h4>
    <p>{{ product.description }}</p>
    <div class="cta-box center-box">
      <span>
        <span class="small-text">Price:</span>
        <span class="font-bold">{{ product.price }}$</span></span
      >
      <div @click="handleAddProductToCart" class="cart-button">
        <img :src="cartIcon" :alt="product.name" width="24" />
        <div class="tooltip">ADD TO CART</div>
      </div>
      <span>
        <span class="small-text">Stock:</span>
        <span class="font-bold">{{ product.stock }}</span></span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { EAppEvents, TCartServices, TProduct, TRouter } from "@/helpers";
import cartIcon from "@/assets/cart-icon.png";
import { inject } from "vue";

const { product } = defineProps<{ product: TProduct }>();

const { navigate } = inject<TRouter>(EAppEvents.ROUTER) ?? {};

const { addProductToCart } = inject<TCartServices>(EAppEvents.CART_SERVICES) ?? {};

const handleAddProductToCart = () => {
    const { stock, ...rest} = product ?? {};

    addProductToCart?.({...rest, quantity: 1})
}
</script>

<style scoped>
.product-cart {
  max-width: 175px;
  border: 1px solid #dfd6d6;
  padding: 0.5rem;
  border-radius: 0.5rem;
}

h4,
p {
  margin: 0 0 0.5rem 0;
  text-align: left;
}

img {
  user-select: none;
  cursor: pointer;
}

.cta-box {
  justify-content: space-between;
}

.cart-button {
  position: relative;
}

.tooltip {
  position: absolute;
  top: -75%;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.25rem;
  border-radius: 0.25rem;
  display: none;
  background: #272626;
  color: #fff;
  font-size: 12px;
  width: 75px;
}

.cart-button:hover .tooltip {
  display: block;
}

.herro-image:hover {
  transform: scale(125%);
  transition: 0.5s ease-in-out;
}

.small-text {
  font-size: 12px;
}

.font-bold {
  font-weight: 500;
}
</style>
