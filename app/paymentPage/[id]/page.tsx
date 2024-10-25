import axiosInstance from "@/app/axiosInstance/axiosInctance";
import { ConvertDatePersian } from "@/app/components/ConvertDatePersian";
import { FetchData } from "@/app/components/FetchData/FetchData";
import axios from "axios";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { GiSwordsEmblem } from "react-icons/gi";

export const metadata: Metadata = {
  title: "صحفه پرداخت",
};

async function PaymentPage({ params }: { params: { id: string } }) {
  const fetchDocumentId = async () => {
    try {
      const response = await axiosInstance.get(
        `/databases/${
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID
        }/collections/${"65bea7a66c63686afbef"}/documents/${params.id}`
      );
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response;
      }
      throw error;
    }
  };

  return (
    <FetchData request={() => fetchDocumentId()}>
      {(data) => {
        if (data && data.status === 200) {
          return (
            <div className="w-full h-screen justify-center items-center flex flex-col">
              <span className="font-semibold text-lg">
                پرداخت با موفقیت انجام شد
              </span>
              <p className="font-semibold text-lg">
                سفارش شما در تاریخ {ConvertDatePersian(data.data.$createdAt)} با
                آیدی
                <span className="text-gray-400">{data.data.$id}</span> ثبت گردید
              </p>
              <GiSwordsEmblem className="w-52 text-green-800 h-52" />
              <Link
                className="bg-redButton shadow-lg border-2 hover:scale-110 text-white p-2 rounded-lg font-medium text-[17px]"
                href={"/dashboard/listPurchases"}
              >
                برو به لیست خرید
              </Link>
            </div>
          );
        } else if (data && data.status === 404) {
          return (
            <div className="w-full font-sans h-screen justify-center items-center flex flex-col">
              موردی یافت نشد
            </div>
          );
        } else {
          return (
            <div className="w-full bg-yellow-800 h-screen justify-center items-center flex flex-col">
              مشکلی رخ داده است.
            </div>
          );
        }
      }}
    </FetchData>
  );
}

export default PaymentPage;
