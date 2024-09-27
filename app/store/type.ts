type Product = {
  description: string;
  location: string;
  price: string;
  images: string;
  productName: string;
  category: string;
  $id: string;
  categories: any | null;
};

export type ActionProduct = {};

export type MainStateProduct = {
  product: Product;
  customerName: string;
  increase: number;
  decrease: number;
  description?: string;
  numbProduct?: number;
};
export type Action = {};
