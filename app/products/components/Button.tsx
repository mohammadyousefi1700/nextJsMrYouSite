"use client";

import { HandleSeparateThreeDigits } from "@/app/components/SeparateThreeDigits";
import { useStore } from "@/app/store/store";
import { Product } from "@/app/store/type";
import Link from "next/link";

import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

type Data = {
  productPost: Product;
  user?: string;
};

function ButtonAddOrder(props: Data) {
  const { productPost, user } = props;

  console.log("productPost", productPost);

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
  const product = getProductId(productPost.$id);

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
  if (user) {
    if (product === undefined) {
      return (
        <button
          onClick={() =>
            addProduct({
              $id: productPost.$id,
              categories: productPost.categories,
              description: productPost.description,
              location: productPost.location,
              price: productPost.price,
              productName: productPost.productName,
              saleProvider: productPost.saleProvider,
              images: productPost.images,
              category: productPost.category,
            })
          }
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
  } else {
    return (
      <div className="bg-redButton rounded-lg border-gray-600 border-1 shadow-md shadow-gladiatorYellow  p-2 text-white ">
        <Link className="border-l-2 pl-2 " href={"/login"}>
          ورود
        </Link>
        <Link className="pr-2" href={"/signUp"}>
          ثبت نام
        </Link>
      </div>
    );
  }
}

export default ButtonAddOrder;
