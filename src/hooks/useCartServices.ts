import { TCart, TCartServices, TProductCart } from "@/helpers";
import { ref } from "vue";

export const useCartServices = (): TCartServices => {
  const cart = ref<TCart>({ products: [], price: 0 });

  const getTotalPrice = (products: TProductCart[]): number =>
    products.reduce((total, p) => total + p.price * p.quantity, 0);

  // ADD SINGLE PRODUCT TO CART
  const addProductToCart = (
    payload: TProductCart,
    quantity: number = 1
  ): void => {
    const products = cart.value.products;

    const index = products.findIndex((p) => p.id === payload.id);

    if (index !== -1) {
      products[index].quantity += quantity;

      cart.value = {
        products,
        price: getTotalPrice(products),
      };

      return;
    }

    const updatedProducts = [...products, { ...payload, quantity }];

    cart.value = {
      products: updatedProducts,
      price: getTotalPrice(updatedProducts),
    };
  };

  // CLEAR CART
  const clearCart = (): void => {
    cart.value = {
      products: [],
      price: 0,
    };
  };

  // REMOVE PRODUCT OUT OF CART
  const removeProduct = (id: number): void => {
    const updatedProducts = cart.value?.products.filter((p) => p.id !== id);

    cart.value = {
      products: updatedProducts,
      price: getTotalPrice(updatedProducts),
    };
  };

  // UPDATE CART ITEM QUANTITY
  const updateQuantity = (id: number, quantity: number): void => {
    const { products } = cart.value;

    const index = products.findIndex((p) => p.id === id);

    const updatedQuantity = Number(products[index]?.quantity ?? 0) + quantity;

    if (updatedQuantity <= 0) {
      // REMOVE PRODUCT OUT OF CART
      removeProduct(id);
    } else {
      // UPDATE PRODUCT QUANTITY
      const updatedProducts = products.map((p) =>
        p.id === id
          ? { ...p, quantity: Number(p.quantity ?? 0) + quantity }
          : { ...p }
      );

      cart.value = {
        products: updatedProducts,
        price: getTotalPrice(updatedProducts),
      };
    }
  };

  return { addProductToCart, clearCart, updateQuantity, cart, removeProduct };
};
