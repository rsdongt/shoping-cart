<template>
  <table v-if="Number(cart?.products?.length) > 0">
    <thead>
      <tr>
        <th>Image</th>
        <th>Product name</th>
        <th>Quantity</th>
        <th>Price ($)</th>
        <th>Total ($)</th>
        <th class="remove-icon">Remove</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="product of cart?.products">
        <td>
          <img :src="product.image" :alt="product.name" width="75" height="75" />
        </td>
        <td>{{ product.name }}</td>
        <td>
          <div class="center-box">
            <button @click="updateQuantity?.(product.id, 1)" class="quantity-button">
              +
            </button>
            <span class="quantity-value">{{ product.quantity }}</span><button @click="updateQuantity?.(product.id, -1)"
              class="quantity-button">
              -
            </button>
          </div>
        </td>
        <td>{{ product.price }}</td>
        <td>{{ product.price * product.quantity }}</td>
        <td class="remove-icon"><span @click="removeProduct?.(product.id)">X</span></td>
      </tr>

      <tr>
        <td colspan="4">Total charge</td>
        <td colspan="2">
          <strong>{{ cart?.price }} $</strong>
        </td>
      </tr>
    </tbody>
  </table>

  <div v-else>
    <p>Empty cart</p>
    <button @click="navigate?.('/')">Shop now</button>
  </div>
</template>

<script setup lang="ts">
import { EAppEvents, TCartServices, TRouter } from "@/helpers";
import { inject } from "vue";

const { cart, updateQuantity, removeProduct } = inject<TCartServices>(EAppEvents.CART_SERVICES) ?? {};

const { navigate } = inject<TRouter>(EAppEvents.ROUTER) ?? {};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

thead,
tr,
td,
th {
  border: 1px solid #000;
}

.remove-icon {
  width: 75px;
  cursor: pointer;
}

.quantity-button {
  display: block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border: 1px solid #000;
  cursor: pointer;
  border-radius: 0;
  padding: 0;
}

.quantity-value {
  margin: 0 1rem;
}
</style>
