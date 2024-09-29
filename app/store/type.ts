import { CartState } from "./order-customer";

export type Product = {
  description: string | null;
  location: string | null;
  price: string;
  images?: string | null;
  productName: string;
  category: string;
  $id: string;
  categories: any | null;
};

export type ActionOrder = {
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  inQty: (productId: string) => void;
  decQty: (productId: string) => void;
  getProductId: (productId: string) => CartProduct | undefined;
  setTotal: (total: number) => void;
  reset: () => void;
  setTotalProductId: (ProductId: string) => void;
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
