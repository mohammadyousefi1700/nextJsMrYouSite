import { CartState } from "./order-customer";

export type Product = {
  saleProvider: string | null;
  description: string | null;
  location: string | null;
  price: number;
  images?: string | null;
  productName: string;
  category: string;
  $id: string;
  categories: any | null;
};

export type ActionOrder = {
  addLocation: (Addres: string) => void;
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  inQty: (productId: string) => void;
  decQty: (productId: string) => void;
  getProductId: (productId: string) => CartProduct | undefined;
  setTotal: (total: number) => void;
  reset: () => void;
};
export type CartProduct = Product & {
  qty?: number | null | undefined;
  totalProductId?: number | null | undefined;
};

export type MainStateProduct = {
  product: Product;
  customerName: string;
  increase: number;
  decrease: number;
  description?: string;
  numbProduct?: number;
};
export type Store = CartState & ActionOrder;
