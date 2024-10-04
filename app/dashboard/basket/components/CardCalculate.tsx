"use client";
import { HandleSeparateThreeDigits2 } from "@/app/components/SeparateThreeDigits";
import { useStore } from "@/app/store/store";
import Link from "next/link";
import React from "react";

function CardCalculate() {
  const { total } = useStore();

  return (
    <div className="bg-white xs:mt-5 mt-8 flex  flex-col xl:w-[600px] lg:w-[300px] px-4 md:w-[580px] sm:w-[500px] sm:items-center   h-fit  rounded-lg border-2 shadow-2xl ">
      <span className="font-mono px-4 border-b-2 shadow-sm  py-2">
        {" "}
        جمع : {HandleSeparateThreeDigits2(total)}
      </span>
      {total === 0 ? null : (
        <Link
          className={
            "   mx-4 my-3 text-white text-center font-medium text-lg bg-[#ef4056] sm:w-full  rounded-lg"
          }
          href={"/dashboard/PaymentPage"}
        >
          پرداخت شود
        </Link>
      )}
    </div>
  );
}

export default CardCalculate;
