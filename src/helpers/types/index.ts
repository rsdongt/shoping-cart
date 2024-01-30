export * from "./router.type";
export * from "./pagination.type";
export * from "./product.type";
export * from "./cart.type";

export type TIndexedObject<V = any> = {
  [key: string]: V;
};
