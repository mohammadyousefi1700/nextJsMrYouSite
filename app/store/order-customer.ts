import { StateCreator } from "zustand";
import { CartProduct, Product } from "./type";

export type CartState = {
  products: CartProduct[];
  total: number;
};

export type CartActions = {
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
        }
      }
    });
  },

  addProduct: (product) =>
    set((state) => {
      const foundProduct = state.products.find((p) => p.$id === product.$id);

      if (foundProduct) {
        foundProduct.qty += 1;
      } else {
        state.products.push({ ...product, qty: 1 });
      }
    }),

  removeProduct: (productId) =>
    set((state) => {
      state.products = state.products.filter(
        (product) => product.$id !== productId
      );
    }),

  getProductId: (productId) =>
    get().products.find((product) => product.$id === productId),

  setTotal: (total) =>
    set((state) => {
      state.total = total;
    }),

  reset: () => set(() => initialState),
});
