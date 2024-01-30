import { ESortProduct, ESortValue, IPagination } from "@/helpers";
import { TProduct, TProductServices } from "@/helpers/types/product.type";
import { onMounted, ref } from "vue";

export const useProductServices = (): TProductServices => {
  const products = ref<TProduct[]>([]);

  // RETRIEVE DATA FROM JSON FILE
  onMounted(() => {
    fetch("/public/products.json")
      .then((res) => res.json())
      .then((data) => {
        products.value = data;
      });
  });

  // GET PRODUCTS BY PAGINATION
  const getPagination = (
    pageIndex: number,
    pageSize: number = 20
  ): IPagination<TProduct> => {
    const skip = (pageIndex - 1) * pageSize;

    const total = products.value.length;

    if (skip >= total)
      return {
        pageIndex,
        pageSize,
        total,
        data: [],
      };

    return {
      pageIndex,
      pageSize,
      total,
      data: products.value.slice(skip, pageIndex * pageSize),
    };
  };

  // GET PRODUCT BY ID
  const getProductById = (id: number): TProduct | undefined =>
    products.value.find((p) => p.id === id);

  // GET INDEX OF SPECIFY PRODUCT FROM LIST
  const getIndexById = (id: number): number =>
    products.value.findIndex((p) => p.id === id);

  // DELETE PRODUCT BY ID
  const deleteProductById = (id: number): void => {
    const index = getIndexById(id);

    if (index === -1) return;

    products.value = products.value.splice(index, 1);
  };

  // UPDATE PARTIAL PRODUCT BY ID
  const updateProductById = (id: number, payload: Partial<TProduct>): void => {
    const index = getIndexById(id);

    if (index === -1) return;

    products.value = products.value.map((p) => {
      if (p.id === id) {
        return { ...p, ...payload };
      } else {
        return { ...p };
      }
    });
  };

  // SEARCH PRODUCTS BY NAME
  const searchProductsByName = async (searchTerm: string) => {
    const response = await fetch("/public/products.json");

    const fetchedProducts = await response.json();

    const productsMatchedSearchTerm = fetchedProducts.filter((p: TProduct) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      const isNameMatched = p.name.toLowerCase().includes(lowerCaseSearchTerm);

      const isDescriptionMatched = p.description
        .toLowerCase()
        .includes(lowerCaseSearchTerm);

      return isNameMatched || isDescriptionMatched;
    });

    products.value = productsMatchedSearchTerm;
  };

  // HANDLE SORT
  const sortProducts = (
    products: TProduct[],
    key: ESortProduct,
    value: ESortValue
  ) => {
    const sortHandler = (a: TProduct, b: TProduct) => {
      const aValue = key === ESortProduct.PRICE ? a.price : a.stock;
      const bValue = key === ESortProduct.PRICE ? b.price : b.stock;

      // Adjust the comparison based on your sorting criteria

      if (value === ESortValue.UP) {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    };

    return [...products].sort(sortHandler);
  };

  const handleSort = (key: ESortProduct, value: ESortValue) => {
    // Call the utility function to perform the sorting
    const updateProducts = sortProducts(products.value, key, value);

    // Update the products with the sorted array
    products.value = updateProducts;
  };
  return {
    getPagination,
    getProductById,
    deleteProductById,
    updateProductById,
    products,
    searchProductsByName,
    handleSort,
  };
};
