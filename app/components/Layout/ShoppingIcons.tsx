"use client";

import { useStore } from "@/app/store/store";
import Link from "next/link";
import { HiOutlineShoppingCart } from "react-icons/hi";

function ShoppingIcons() {
  const { products } = useStore();

  return (
    <Link
      className=" relative flex justify-center items-center mt-2 border-2 w-[30px] border-[#fffD00] rounded-md h-[30px]"
      href={"/dashboard/basket"}
    >
      {products && (
        <span className="absolute rounded-lg justify-center items-center p-[9px] flex w-4 -top-2 left-5 h-4 bg-red-600 ">
          {products.length}
        </span>
      )}
      <HiOutlineShoppingCart className=" w-6 h-6 items-center  " />
    </Link>
  );
}

export default ShoppingIcons;
