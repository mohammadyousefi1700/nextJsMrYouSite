//صحفه پرداخت فقط یک دکمه پرداخت و  نمایش  تیک پرداخت شده است
import axiosInstance from "@/app/axiosInstance/axiosInctance";
import { FetchData } from "@/app/components/FetchData/FetchData";
import Link from "next/link";
import React from "react";
import { GiSwordsEmblem } from "react-icons/gi";

async function PaymentPage({
  params,
}: {
  params: { id: string; ord: boolean };
}) {
  console.log(params);
  const fetchDataOrder = async (id: string) => {
    if (params.ord === true) {
      const response = axiosInstance.get(
        `/databases/${
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID
        }/collections/${"65bea7a66c63686afbef"}/documents`
      );
    } else {
      return;
    }
  };

  return (
    <FetchData request={() => fetchDataOrder(params.id)}>
      {(data) => {
        if (data) {
          return (
            <div className="w-full  h-screen justify-center items-center flex flex-col">
              <span className="font-semibold text-lg">
                {" "}
                پرداخت با موفقیت انجام شد
              </span>{" "}
              <GiSwordsEmblem className="w-52 text-green-800 h-52" />
              <Link
                className="bg-redButton shadow-lg border-2 hover:scale-110 text-white p-2 rounded-lg font-medium text-[17px]"
                href={"/dashboard/listPurchases"}
              >
                برو به لیست خرید
              </Link>
            </div>
          );
        } else {
          return (
            <div className="w-full  h-screen justify-center items-center flex flex-col">
              موردی یافت نشد
            </div>
          );
        }
      }}
    </FetchData>
  );
}

export default PaymentPage;
