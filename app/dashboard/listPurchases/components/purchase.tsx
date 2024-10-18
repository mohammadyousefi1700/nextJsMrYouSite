import axiosInstance from "@/app/axiosInstance/axiosInctance";
import CartCustom from "@/app/components/cartStyle";
import { FetchData } from "@/app/components/FetchData/FetchData";
import React from "react";
type ListPurchases = {
  total: number;
  documents: {
    ListPurchase: string[];
    $id: string;
    $createdAt: string;
  }[];
};
type ListProductParseJson = {
  description?: string;
  location?: string;
  price?: string;
  images?: string;
  productName?: string;
  saleProvider?: string;
  qty?: number;
  totalProductId?: string;
}[];

async function Purchase() {
  const fetchDataListPurchase = async (signal?: AbortSignal) => {
    const response = await axiosInstance.get(
      `/databases/${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}/collections/${process.env.NEXT_LISTPURCHASE_API}/documents`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        signal,
      }
    );
    return await response.data;
  };
  
  return (
    <FetchData request={fetchDataListPurchase}>
      {(data: ListPurchases) => {
        return (
          <CartCustom mainDivClass="ml-6 sm:w-[500px] flex-col flex   xs:w-[300px]">
            {/* {data.documents.map((item, index) => {
              return (
                <CartCustom
                  mainDivClass="my-2 w-full flex flex-col"
                  key={index}
                >
                  <span className="text-left">
                    {ConvertDatePersian(item.$createdAt)}
                  </span>
                  <div>
                    {item.ListPurchase.map((itemList, index) => {
                      let JsonListParse: ListProductParseJson;
                      try {
                        JsonListParse = JSON.parse(itemList);
                      } catch (error) {
                        console.error("Invalid JSON string: ", itemList, error);
                        return <span>Error parsing data</span>;
                      }

                      return (
                        <div className="flex" key={index}>
                          {JsonListParse.map((itemParse, index) => {
                            return (
                              <div className="flex" key={index}>
                                <img
                                  className="w-20 h-20 rounded-full"
                                  src={itemParse.images}
                                  alt={itemParse.productName}
                                />

                                <div className="flex flex-col">
                                  <span className="mt-2">
                                    {itemParse.productName}
                                  </span>
                                  <div className="flex items-center text-gray-600">
                                    <span className="text-xl">
                                      {itemParse.qty}
                                    </span>
                                    <span className="text-xl">X</span>
                                    <span className="text-lg font-mono">
                                      {new Intl.NumberFormat("fa-IR", {
                                        style: "decimal",
                                        currency: "IRR",
                                      }).format(Number(itemParse.price))}
                                    </span>
                                  </div>
                                  <span>{itemParse.location}</span>
                                  <span>
                                    مبلغ پرداخت شده : {itemParse.totalProductId}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ); // Render JsonListParse as needed
                    })}
                  </div>
                </CartCustom>
              );
            })} */}
          </CartCustom>
        );
      }}
    </FetchData>
  );
}

export default Purchase;
