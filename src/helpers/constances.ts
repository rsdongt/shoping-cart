export enum EAppEvents {
  ROUTER = "ROUTER",
  PRODUCT_SERVICES = "PRODUCT_SERVICES",
  CART_SERVICES = "CART_SERVICES",
}

export const productListRegx = /^\/\d+$/;

export enum ELocalStorage {
  CART = "CART",
}

export enum ESortProduct {
  "PRICE" = "sortByPrice",
  "STOCK" = "sortByStock",
}

export enum ESortValue {
  "UP" = "UP",
  "DOWN" = "DOWN",
}
