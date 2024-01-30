import { Ref } from "vue";
import { IPagination } from ".";
import { ESortProduct, ESortValue } from "../constances";

export type TProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
};

export type TProductServices = {
  getPagination: (pageIndex: number, pageSize: number) => IPagination<TProduct>;
  getProductById: (id: number) => TProduct | undefined;
  deleteProductById: (id: number) => void;
  updateProductById: (id: number, payload: Partial<TProduct>) => void;
  products: Ref<TProduct[]>;
  searchProductsByName: (searchTerm: string) => void;
  handleSort: (key: ESortProduct, value: ESortValue) => void;
};
