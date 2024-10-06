"use client";
import axiosInstance from "@/app/axiosInstance/axiosInctance";
import { HandleSeparateThreeDigits2 } from "@/app/components/SeparateThreeDigits";
import { useStore } from "@/app/store/store";
import { useRouter } from "next/navigation";
import React from "react";

function CardCalculate() {
  const { total, products, reset } = useStore();
  const router = useRouter();
  console.log("router", router);

  async function handleSendOrder() {
    const response = await axiosInstance.post(
      `/databases/${
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID
      }/collections/${"65bea7a66c63686afbef"}/documents`,
      {
        documentId: "unique()",
        data: {
          ordersProduct: [JSON.stringify(products)],
        },
      }
    );
    if (response.status === 201) {
      router.push("/");
      await setTimeout(() => reset(), 1000);
    }
  }

  return (
    <div className="bg-white xs:mt-5 mt-8 flex  flex-col xl:w-[600px] lg:w-[300px] px-4 md:w-[580px] sm:w-[500px] sm:items-center   h-fit  rounded-lg border-2 shadow-2xl ">
      <span className="font-mono px-4 border-b-2 shadow-sm  py-2">
        {" "}
        جمع : {HandleSeparateThreeDigits2(total)}
      </span>
      {total === 0 ? null : (
        <button
          onClick={handleSendOrder}
          className={
            "   mx-4 my-3 text-white text-center font-medium text-lg bg-[#ef4056] sm:w-full  rounded-lg"
          }
        >
          پرداخت شود
        </button>
      )}
    </div>
  );
}

export default CardCalculate;
