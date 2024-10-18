/* eslint-disable @next/next/no-img-element */
import { HandleSeparateThreeDigits } from "@/app/components/SeparateThreeDigits";
import { clsx } from "clsx";

import Link from "next/link";

type PropData = {
  productName: string;
  $id: string;
  description: string;
  location: string;
  images: string;
  price: string;
};

type Props = {
  data?: PropData;
  index: any;
};

function Card(Prop: Props) {
  const { data, index } = Prop;
  const tdClass =
    "w-full text-black font-sans hover:font-sans text-lg hover:text-lg border-b-2 shadow-md py-1";

  return (
    <Link
      className="flex min-w-7 hover:font-sans font-sans  font-black flex-col overflow-hidden !text-lg items-center rounded-xl outline-none   cursor-pointer w-full h-full hover:scale-105   shadow-[0_4px_8px_0px_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] transition-transform transform  "
      key={index}
      href={`/products/${data.$id}`}
    >
      <section className="  flex w-[280px] flex-col items-center  shadow-[0_4px_8px_0px_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] p-2  ">
        <img
          className="w-32 h-32 rounded-full "
          src={data.images}
          alt={data.productName}
        />
        <div className="flex text-center hover:font-normal  flex-col w-full  font-medium   ">
          <span className={clsx(tdClass, "text-black text-[20px]")}>
            {" "}
            <p className="text-black w-full font-sans hover:font-sans !font-medium hover:text-black ">
              نام کالا
            </p>{" "}
            <span className="font-mono !text-lg text-gray-700 font-normal">
              {data.productName}
            </span>
          </span>
          <span className={`${tdClass} `}>
            {" "}
            <p
              className={
                "text-black w-full font-sans hover:font-sans !font-medium hover:text-black "
              }
            >
              قیمت{" "}
            </p>{" "}
            <span className="font-mono !text-lg text-gray-700 font-normal">
              {" "}
              {HandleSeparateThreeDigits(Number(data.price))}
            </span>
          </span>
          <span className={tdClass}>
            {" "}
            <p className="text-black w-full font-sans hover:font-sans !font-medium hover:text-black ">
              مکان{" "}
            </p>{" "}
            <span className="!text-lg text-gray-700 font-normal">
              {data.location}
            </span>{" "}
          </span>
          <div className="flex justify-start  text-right flex-wrap">
            <span
              title={data.description}
              className={clsx(tdClass, "truncate shadow-none border-none")}
            >
              <p className="text-black text-center w-full font-sans hover:font-sans !font-medium hover:text-black ">
                {" "}
                توضیحات
              </p>{" "}
              <span className="mr-3 !text-lg text-gray-700 font-normal ">
                {data.description}
              </span>
            </span>
          </div>{" "}
        </div>{" "}
        <button className="border-gladiatorYellow font-sans hover:font-sans text-lg will-change-auto hover:text-lg shadow-2xl shadow-gray-600 p-2 text-white rounded-lg  border-[3px] bg-gray-800">
          جزئیات محصول
        </button>
      </section>
    </Link>
  );
}
export default Card;
