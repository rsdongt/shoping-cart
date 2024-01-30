import { Ref } from "vue";
import { TProduct } from ".";

export type TProductCart = Omit<TProduct, "stock"> & {
  quantity: number;
};

export type TCart = {
  products: TProductCart[];
  price: number;
};

export type TCartServices = {
  addProductToCart: (payload: TProductCart, quantity?: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  cart: Ref<TCart>;
  removeProduct: (id: number) => void;
};
