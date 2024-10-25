export enum TypedColumn {
  PaymentAndOrderFinalizationStatus = "Payment and order finalization",
  AwaitingOrderConfirmation = "Awaiting order confirmation",
  OrderConfirmed = "Order confirmed",
  TheOrderWasSent = "The order was sent",
  OrderCompletions = "Order completion",
}

export const OrderStatus: {
  [key in
    | TypedColumn.AwaitingOrderConfirmation
    | TypedColumn.OrderConfirmed
    | TypedColumn.TheOrderWasSent
    | TypedColumn.OrderCompletions]: string;
} = {
  "Awaiting order confirmation": "در انتظار تایید سفارش",
  "Order confirmed": "تایید سفارش",
  "The order was sent": "سفارش ارسال شد",
  "Order completion": "تکمیل سفارش",
};

export type DataJsonProduct = {
  $id: string;
  description: string;
  location: string;
  price: string;
  productName: string;
  saleProvider: string;
  images: string;
  category: string;
  qty: number;
  totalProductId: number;
}[];
