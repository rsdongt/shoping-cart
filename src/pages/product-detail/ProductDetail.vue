<template>
  <div class="product-detail center-box">
    <div>
      <img
        :src="productDetail?.image"
        :alt="productDetail?.name"
        width="400"
        height="400"
      />
    </div>

    <div class="info-box">
      <h2>{{ productDetail?.name }}</h2>
      <p>{{ productDetail?.description }}</p>
      <p><span>Price: </span> {{ productDetail?.price }} $</p>
      <p><span>Stock: </span> {{ productDetail?.stock }}</p>
      <div class="quantity-box">
        <span>Quantity: </span><input v-model="quantity" type="text" />
      </div>
      <div>
        <button @click="handleAddToCart">ADD TO CART</button>
        <button @click="navigate?.('/')">BACK TO SHOP</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  EAppEvents,
  TCartServices,
  TProduct,
  TProductServices,
  TRouter,
} from "@/helpers";
import { inject, ref, onMounted } from "vue";

const productServices = inject<TProductServices>(EAppEvents.PRODUCT_SERVICES);

const { navigate } = inject<TRouter>(EAppEvents.ROUTER) ?? {};

const { addProductToCart } =
  inject<TCartServices>(EAppEvents.CART_SERVICES) ?? {};

const productDetail = ref<TProduct>();

const quantity = ref(1);

onMounted(() => {
  const { pathname = "" } = window.location;

  const productId = Number(pathname?.replace("/", ""));

  productDetail.value = productServices?.getProductById(productId);
});

const handleAddToCart = () => {
  if (productDetail.value) {
    const { stock, ...productCart } = productDetail.value;

    addProductToCart?.({ ...productCart, quantity: 1 }, quantity.value);

    navigate?.("/cart")
  }
};
</script>

<style scoped>
.product-detail {
  align-items: flex-start;
}

.info-box {
  margin-left: 1rem;
  text-align: left;
}

.quantity-box {
  margin-bottom: 1rem;
}

.quantity-box input {
  width: 50px;
  text-align: center;
}
</style>
