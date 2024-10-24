// import auth from "@/app/auth";
import axiosInstance from "@/app/axiosInstance/axiosInctance";
import CartCustom from "@/app/components/cartStyle";
import { ConvertDatePersian } from "@/app/components/ConvertDatePersian";
import { FetchData } from "@/app/components/FetchData/FetchData";
import { Query } from "node-appwrite";
import React from "react";
import ItemPurchase from "./itemPurchase";

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
    // const user = (await auth.getUser()).data;

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
          <CartCustom mainDivClass="  flex-col flex  h-screen overflow-y-scroll  !w-[100%]">
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

                      <div>
                        {item &&
                          item?.ListPurchase?.map((itemList, index2) => {
                            return (
                              <ItemPurchase key={index2} data={itemList} />
                            );
                          })}
                      </div>
                    </CartCustom>
                  );
                })}
              </>
            ) : (
              <div>موردی یافت نشد.</div>
            )}
          </CartCustom>
        );
      }}
    </FetchData>
  );
}

export default Purchase;
