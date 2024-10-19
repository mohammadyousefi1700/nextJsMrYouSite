// import auth from "@/app/auth";
import axiosInstance from "@/app/axiosInstance/axiosInctance";
import { FetchData } from "@/app/components/FetchData/FetchData";
import { Permission, Query, Role } from "node-appwrite";
import React from "react";
import { OrderStatus, TypedColumn } from "../../type";
import auth from "@/app/auth";
import CartCustom from "@/app/components/cartStyle";
import { ConvertDatePersian } from "@/app/components/ConvertDatePersian";

async function CmpActiveOrder() {
  const user = (await auth.getUser()).data;

  const fetchData = async () => {
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
      Query.startsWith("userIdBuyer", await user.$id),
    ];

    try {
      const response = await axiosInstance.get(
        `/databases/${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}/collections/65bea7a66c63686afbef/documents`,
        {
          params: {
            queries: queryBackend,
          },

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      // console.log(response);

      return response.data;
    } catch (error: any) {
      console.error(
        "Error fetching data: ",
        error.response?.data || error.message
      );
    }
  };

  return (
    <FetchData request={() => fetchData()}>
      {(data) => {
        console.log(data.documents);
        // const HandleStatus = (status: any) => {
        //   if (OrderStatus === status) {
        //     console.log(OrderStatus);

        //     return OrderStatus;
        //   }
        // };
        // HandleStatus;
        return (
          data &&
          data.documents.map((item) => {
            const dataJson = JSON.parse(item?.ordersProduct);
            console.log(dataJson);

            return (
              <CartCustom
                key={item.$id}
                mainDivClass=" w-[390px]  px-0 flex flex-col "
              >
                <div className="justify-between w-full flex">
                  <div className="text-lg pr-1">
                    {" "}
                    {ConvertDatePersian(item.$createdAt)}
                  </div>

                  <div className="font-sans bg-green-800 text-white  -mt-2 rounded-tl-lg rounded-br-lg   w-fit pb-2 px-2 pt-0.5">
                    {" "}
                    {OrderStatus[item.status]}
                  </div>
                </div>

                <div>
                  {dataJson &&
                    dataJson.map((item) => {
                      return (
                        <div className="gap-y-3 flex-col ">
                          <img
                            src={item.images}
                            className="w-10 h-10 mt-3 rounded-full "
                            alt=""
                          />
                        </div>
                      );
                    })}
                </div>
              </CartCustom>
            );
          })
        );
      }}
    </FetchData>
  );
}

export default CmpActiveOrder;
