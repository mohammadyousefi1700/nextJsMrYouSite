import axiosInstance from "@/app/axiosInstance/axiosInctance";
import { FetchData } from "@/app/components/FetchData/FetchData";
import { Query } from "node-appwrite";
import React from "react";
import { DataJsonProduct, OrderStatus } from "../../type";
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
        return (
          data &&
          data.documents.map((item) => {
            const dataJson: DataJsonProduct = JSON.parse(item?.ordersProduct);

            return (
              <CartCustom
                key={item.$id}
                mainDivClass=" !w-[390px]  px-0 h-fit flex flex-col "
              >
                <div className="justify-between  w-full flex">
                  <div className="text-lg pr-1">
                    {" "}
                    {ConvertDatePersian(item.$createdAt)}
                  </div>

                  <div className="font-sans bg-green-800 text-white  -mt-2 rounded-tl-lg rounded-br-lg   w-fit pb-2 px-2 pt-0.5">
                    {" "}
                    {OrderStatus[item.status]}
                  </div>
                </div>
                <p className="flex px-2 justify-between w-full">
                  {" "}
                  <span>
                    <span>آدرس تحویل :</span> {item.customerAddress}
                  </span>{" "}
                  <span className="">زمان تحویل : 14:46 </span>
                </p>
                <div>
                  {dataJson &&
                    dataJson.map((itemJson, index) => {
                      return (
                        <div
                          key={index}
                          className="gap-y-3 px-2 h-fit flex w-full justify-between"
                        >
                          <div className="flex gap-x-2 items-center">
                            <img
                              src={itemJson.images}
                              className="w-10 h-10 mt-3 rounded-full "
                              alt=""
                            />
                            <div className="mt-4">
                              <span>نام کالا :</span> {itemJson.productName}
                            </div>{" "}
                            {/* {item.DeliveryTime && <div>زمان تحویل : {} </div>} */}
                          </div>
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
