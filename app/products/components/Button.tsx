"use client";
import { useStore } from "@/app/store/store";
import { Product } from "@/app/store/type";
import React, { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
function ButtonAddOrder(props: Product) {
  //   const { addProduct, products,inQty,decQty } = useStore();
  const { getProductId, decQty, incQty, setTotal, products } = useStore(
    useShallow((state) => ({
      getProductId: state.getProductId,
      decQty: state.decQty,
      incQty: state.inQty,
      setTotal: state.setTotal,
      products: state.products,
    }))
  );
  console.log(props.price);

  const handleIsAddProduct =
    products.length !== 0 ||
    products.some((item) => {
      item.$id === props.$id;
    });
  const addProduct = useStore((state) => state.addProduct);
  const product = getProductId(props.$id);
  console.log(product);

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

  if (handleIsAddProduct === false) {
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
      <>
        <div className="flex  w-full !text-white gap-x-3 justify-center">
          <button
            onClick={() => incQty(product.$id)}
            className="w-12 bg-[#ef4056] rounded-lg"
          >
            +
          </button>
          <span className="text-slate-900 font-medium rounded-lg text-center bg-white px-3 border-2">
            {product.qty}
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
          <p>{Number(product.totalProductId)}</p>
        </div>
      </>
    );
  }
}

export default ButtonAddOrder;
