"use client";

import { HandleSeparateThreeDigits } from "@/app/components/SeparateThreeDigits";
import { useStore } from "@/app/store/store";
import { Product } from "@/app/store/type";

import { useEffect } from "react";
// import React, { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
function ButtonAddOrder(props: Product) {
  //   const { addProduct, products,inQty,decQty } = useStore();
  const { getProductId, decQty, incQty, products, setTotal } = useStore(
    useShallow((state) => ({
      getProductId: state.getProductId,
      decQty: state.decQty,
      incQty: state.inQty,
      setTotal: state.setTotal,
      products: state.products,
    }))
  );

  const addProduct = useStore((state) => state.addProduct);
  const product = getProductId(props.$id);
  const handleIsAddProduct =
    product === undefined ||
    products.length !== 0 ||
    products.some((item) => {
      item.$id === props.$id;
    });
  console.log("product", handleIsAddProduct);

  useEffect(() => {
    const unSub = useStore.subscribe(
      (state) => state.products,
      (products) => {
        setTotal(
          products.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
        );
      },
      { fireImmediately: true }
    );
    return unSub;
  }, [setTotal]);

  if (product === undefined) {
    return (
      <button
        onClick={() => addProduct(props)}
        className="w-full text-white text-xl bg-[#ef4056] rounded-lg"
      >
        افزودن به سبد خرید
      </button>
    );
  } else {
    return (
      <div>
        <div className="flex  w-full !text-white gap-x-3 justify-center">
          <button
            onClick={() => incQty(product.$id)}
            className="w-12 bg-[#ef4056] rounded-lg"
          >
            +
          </button>
          <span className="text-slate-900 font-medium rounded-lg text-center bg-white px-3 border-2">
            {product && <p> {product.qty}</p>}
          </span>
          <button
            onClick={() => decQty(product.$id)}
            className="w-12 bg-gray-400 rounded-lg"
          >
            -
          </button>
        </div>
        <div className="w-full justify-center flex-col text-center items-center">
          <p>جمع خرید</p>
          {product && (
            <p>{HandleSeparateThreeDigits(product.totalProductId)}</p>
          )}
        </div>
      </div>
    );
  }
}

export default ButtonAddOrder;
