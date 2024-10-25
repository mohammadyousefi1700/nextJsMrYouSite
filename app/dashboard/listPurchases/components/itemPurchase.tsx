import React from "react";

async function ItemPurchase({ data }: { data: any }) {
  let parsedData: any[] = [];

  try {
    parsedData = JSON.parse(data);
  } catch (error) {
    console.error("Invalid JSON format:", error);
  }

  return (
    parsedData &&
    parsedData.map((item) => {
      return (
        <div key={item.productName} className="flex">
          <img
            className="w-20 h-20 rounded-full"
            src={item.images}
            alt={item.productName}
          />

          <div className="flex flex-col">
            <span className="mt-2">{item.productName}</span>
            <div className="flex items-center text-gray-600">
              <span className="text-xl">{item.qty}</span>
              <span className="text-xl">X</span>
              <span className="text-lg font-mono">
                {new Intl.NumberFormat("fa-IR", {
                  style: "decimal",
                  currency: "IRR",
                }).format(Number(item.price))}
              </span>
            </div>
            <span>{item.location}</span>
            <span>
              مبلغ پرداخت شده :
              <span className="text-lg font-mono">
                {new Intl.NumberFormat("fa-IR", {
                  style: "decimal",
                  currency: "IRR",
                }).format(Number(item.totalProductId))}
              </span>
            </span>
          </div>
        </div>
      );
    })
  );
}

export default ItemPurchase;
