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
    "w-full text-black font-sans hover:font-sans text-lg  border-b-2 shadow-md py-1";

  return (
    <Link
      className="flex min-w-7 hover:w-[310px] hover:h-[452px] font-sans font-black flex-col overflow-hidden text-lg items-center rounded-xl outline-none cursor-pointer w-full h-full hover:scale-105 shadow-[0_4px_8px_0px_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] transition-transform duration-300 will-change-transform"
      key={index}
      href={`/products/${data.$id}`}
    >
      <section className="flex w-full flex-col items-center shadow-md p-2">
        <img
          className="w-32 h-32 rounded-full"
          src={data.images}
          alt={data.productName}
        />
        <div className="flex text-center flex-col w-full font-medium">
          <span className={clsx(tdClass, "text-black text-[20px]")}>
            <p className="text-black w-full font-sans font-medium">نام کالا</p>
            <span className="font-mono text-lg text-gray-700 font-normal">
              {data.productName}
            </span>
          </span>
          <span className={tdClass}>
            <p className="text-black w-full font-sans font-medium">قیمت</p>
            <span className="font-mono text-lg text-gray-700 font-normal">
              {HandleSeparateThreeDigits(Number(data.price))}
            </span>
          </span>
          <span className={tdClass}>
            <p className="text-black w-full font-sans font-medium">مکان</p>
            <span className="text-lg text-gray-700 font-normal">
              {data.location}
            </span>
          </span>
          <div className="flex justify-start text-right flex-wrap">
            <span
              title={data.description}
              className={clsx(tdClass, "truncate shadow-none border-none")}
            >
              <p className="text-black text-center w-full font-sans font-medium">
                توضیحات
              </p>
              <span className="mr-3 text-lg text-gray-700 font-normal">
                {data.description}
              </span>
            </span>
          </div>
        </div>
        <button className="border-gladiatorYellow font-sans text-lg shadow-2xl shadow-gray-600 p-2 text-white rounded-lg border-3 bg-gray-800">
          جزئیات محصول
        </button>
      </section>
    </Link>
  );
}
export default Card;
