import { StateCreator } from "zustand";
import { CartProduct, Product } from "./type";

export type CartState = {
  products: CartProduct[];
  total: number;
  location: string;
};

export type CartActions = {
  addLocation: (Address: string) => void;
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  inQty: (productId: string) => void;
  decQty: (productId: string) => void;
  getProductId: (productId: string) => CartProduct | undefined;
  setTotal: (total: number) => void;
  reset: () => void;
};

const initialState: CartState = {
  products: [],
  total: 0,
  location: null,
};

export type CartSlice = CartState & CartActions;

export const createOrder: StateCreator<
  CartSlice,
  [["zustand/immer", never]],
  [],
  CartSlice
> = (set, get) => ({
  ...initialState,

  inQty: (productId) =>
    set((state) => {
      const foundProduct = state.products.find(
        (product) => product.$id === productId
      );
      if (foundProduct) {
        foundProduct.qty += 1;
        foundProduct.totalProductId =
          Number(foundProduct.price) * foundProduct.qty;
      }
    }),

  decQty: (productId) => {
    set((state) => {
      const foundIndex = state.products.findIndex(
        (product) => product.$id === productId
      );
      if (foundIndex !== -1) {
        if (state.products[foundIndex].qty === 1) {
          state.products.splice(foundIndex, 1);
        } else {
          state.products[foundIndex].qty -= 1;
          state.products[foundIndex].totalProductId =
            Number(state.products[foundIndex].price) *
            state.products[foundIndex].qty;
        }
      }
    });
  },

  addProduct: (product) =>
    set((state) => {
      const foundProduct = state.products.find((p) => p.$id === product.$id);

      if (foundProduct) {
        foundProduct.qty += 1;
        foundProduct.totalProductId =
          Number(foundProduct.price) * foundProduct.qty;
      } else {
        state.products.push({
          ...product,
          qty: 1,
          totalProductId: Number(product.price),
        });
      }
    }),

  removeProduct: (productId) =>
    set((state) => {
      state.products = state.products.filter(
        (product) => product.$id !== productId
      );
    }),

  getProductId: (productId) => {
    return get().products.find((product) => product.$id === productId);
  },
  setTotal: (total) =>
    set((state) => {
      state.total = total;
    }),
  addLocation: (Address) => {
    set((state) => {
      state.location = Address;
    });
  },
  reset: () => set(() => initialState),
});
