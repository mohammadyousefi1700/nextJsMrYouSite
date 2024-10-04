"use client";

import { useStore } from "@/app/store/store";
import React, { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

function CardProduct() {
  const { products, incQty, decQtys, setTotal } = useStore(
    useShallow((state) => ({
      getProductId: state.getProductId,
      decQtys: state.decQty,
      incQty: state.inQty,
      setTotal: state.setTotal,
      products: state.products,
    }))
  );

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

  return (
    <div className="flex xl:w-[1000px] flex-col lg:w-[700px]  gap-y-4  md:w-[600px] sm:w-[400px]  xs:mt-20 sm:flex-col md:flex-col border-2 xs:flex-col rounded-lg h-full py-4 px-4 shadow-xl  bg-white">
      {products.length ? (
        products.map((item, index) => {
          return (
            <div
              key={index}
              className="p-4 border rounded-lg  shadow-md w-full  flex sm:flex-col xs:flex-col items-center gap-4"
            >
              <img
                src={item.images}
                alt="product"
                className="w-16 h-16 rounded-md object-cover"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.productName}</h2>
                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                <div className="mt-3 flex items-center space-x-2 text-gray-600">
                  <span>{item.qty}</span>
                  <span>X</span>
                  <span className="font-mono">
                    {new Intl.NumberFormat("fa-IR", {
                      style: "decimal",
                      currency: "IRR",
                    }).format(item.price)}
                  </span>
                </div>
              </div>
              <div className="flex items-center text-white gap-x-2">
                <button
                  onClick={() => incQty(item.$id)}
                  className="w-12 bg-[#ef4056] rounded-lg"
                >
                  +
                </button>
                <span className="text-slate-900 font-medium rounded-lg text-center bg-white px-3 border-2">
                  {item && <p> {item.qty}</p>}
                </span>
                <button
                  onClick={() => decQtys(item.$id)}
                  className="w-12 bg-gray-400 rounded-lg"
                >
                  -
                </button>
              </div>
            </div>
            // <div className={`flex gap-x-2 ${index > 0 && "border-t-2"}`}>
            //   <img
            //     src={item.images}
            //     alt="img"
            //     className="w-20 h-20 mb-2 border-4 rounded-lg shadow-xl mt-2"
            //   />
            //   <div className="flex flex-col mt-2">
            //     <span>{item.productName}</span>
            //     <span className="text-xs text-gray-600  ">
            //       {item.description}
            //     </span>
            //     <span className="font-mono">
            //       {`${HandleSeparateThreeDigits2(item.price)}` +
            //         "x" +
            //         HandleSeparateThreeDigits2(item.qty)}
            //     </span>
            //     <div className="flex  w-full !text-white gap-x-3 justify-center">
            //       <button
            //         onClick={() => incQty(item.$id)}
            //         className="w-12 bg-[#ef4056] rounded-lg"
            //       >
            //         +
            //       </button>
            //       <span className="text-slate-900 font-medium rounded-lg text-center bg-white px-3 border-2">
            //         {item && <p> {item.qty}</p>}
            //       </span>
            //       <button
            //         onClick={() => decQtys(item.$id)}
            //         className="w-12 bg-gray-400 rounded-lg"
            //       >
            //         -
            //       </button>
            //     </div>
            //   </div>
            // </div>
          );
        })
      ) : (
        <div>موردی برای نمایش وجود ندارد</div>
      )}
    </div>
  );
}

export default CardProduct;
