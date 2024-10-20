import auth from "@/app/auth";
import axiosInstance from "@/app/axiosInstance/axiosInctance";
import CartCustom from "@/app/components/cartStyle";
import { ConvertDatePersian } from "@/app/components/ConvertDatePersian";
import { FetchData } from "@/app/components/FetchData/FetchData";
import { Query } from "node-appwrite";
import React from "react";
import DataJson from "./dataJson";

const revalidate = 100000;
revalidate;
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
    const user = (await auth.getUser()).data;

    const queryBackend = [
      // Query.equal("user_id", userId),
      // Query.startsWith(
      //   "status",
      //   TypedColumn.PaymentAndOrderFinalizationStatus ||
      //     TypedColumn.AwaitingOrderConfirmation
      //   // TypedColumn.OrderConfirmed ||
      //   // TypedColumn.TheOrderWasSent
      // ),
      // Query.startsWith("userIdBuyer", "6664a58cb5533e374013"),
      // Query.startsWith("user_Id", await user.$id),
    ];

    const response = await axiosInstance.get(
      `/databases/${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}/collections/${process.env.NEXT_LISTPURCHASE_API}/documents`,
      {
        params: {
          queries: queryBackend,
        },
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
          <CartCustom mainDivClass="  flex-col flex  !w-[100%]">
            {data && data.total > 0 ? (
              <>
                {data.documents.map((item, index) => {
                  return (
                    <CartCustom
                      mainDivClass="my-2 w-full flex flex-col"
                      key={index}
                    >
                      <span className="text-left">
                        {ConvertDatePersian(item.$createdAt)}
                      </span>
                      {item &&
                        item?.ListPurchase?.map((itemList) => {
                          // console.log(itemList);
                          // const dataJson = itemList && JSON.parse(itemList);
                          // console.log("dataJson", dataJson);

                          return (
                            <DataJson key={itemList.length} data={itemList} />
                            // <div key={itemList.length && itemList.length}></div>
                          );
                        })}
                      <div>
                        {item &&
                          item?.ListPurchase?.map((itemList, index2) => {
                            let JsonListParse: ListProductParseJson;
                            try {
                              JsonListParse = JSON.parse(itemList);
                            } catch (error) {
                              console.error(
                                "Invalid JSON string: ",
                                itemList,
                                error
                              );
                              return (
                                <span key={index2}>Error parsing data</span>
                              );
                            }

                            return (
                              <div className="flex" key={index2}>
                                {" "}
                                {JsonListParse &&
                                  JsonListParse.map((itemParse, index3) => {
                                    return (
                                      <div className="flex" key={index3}>
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
                                              }).format(
                                                Number(itemParse.price)
                                              )}
                                            </span>
                                          </div>
                                          <span>{itemParse.location}</span>
                                          <span>
                                            مبلغ پرداخت شده :{" "}
                                            {itemParse.totalProductId}
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  })}
                              </div>
                            );
                          })}
                      </div>
                    </CartCustom>
                  );
                })}
              </>
            ) : (
              <div>موردی </div>
            )}
          </CartCustom>
        );
      }}
    </FetchData>
  );
}

export default Purchase;
