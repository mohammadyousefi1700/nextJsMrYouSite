"use client";
import auth from "@/app/auth";
import axiosInstance from "@/app/axiosInstance/axiosInctance";
import { HandleSeparateThreeDigits2 } from "@/app/components/SeparateThreeDigits";
import { useStore } from "@/app/store/store";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { GoSync } from "react-icons/go"; // برای آیکون لودینگ

function CardCalculate({ userId }: { userId: any }) {
  const { total, products, reset, location } = useStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  console.log(total);

  async function handleSendOrder() {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        `/databases/${
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID
        }/collections/${"65bea7a66c63686afbef"}/documents`,
        {
          documentId: "unique()",
          data: {
            totalPrice: String(total),
            CustomerName: userId.name,
            customerAddress: location,
            userIdBuyer: userId.$id,
            status: "Payment and order finalization",
            ordersProduct: [JSON.stringify(products)],
          },
        }
      );
      if (response.status === 201) {
        router.push(`/paymentPage/${response.data.$id}`);
        await setTimeout(() => reset(), 1000);
      }
    } catch (error) {
      console.error("Error sending order:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white xs:mt-5 mt-3 flex flex-col xl:w-[600px] lg:w-[300px] px-4 md:w-[580px] sm:w-[500px] sm:items-center h-fit rounded-lg border-2 shadow-2xl ">
      <span className="font-mono px-4 border-b-2 shadow-sm py-2">
        جمع : {HandleSeparateThreeDigits2(total)}
      </span>
      {total === 0 ? null : (
        <button
          onClick={handleSendOrder}
          className={clsx(
            "mx-4 my-3 text-white disabled:cursor-not-allowed disabled:bg-slate-500 text-center font-medium text-lg bg-[#ef4056] sm:w-full rounded-lg"
          )}
          disabled={isLoading || !location}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-x-2">
              <GoSync className="animate-spin" /> در حال پرداخت...
            </div>
          ) : (
            "پرداخت شود"
          )}
        </button>
      )}
    </div>
  );
}

export default CardCalculate;
