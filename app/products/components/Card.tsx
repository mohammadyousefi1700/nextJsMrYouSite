/* eslint-disable @next/next/no-img-element */
import {
  HandleSeparateThreeDigits,
  HandleSeparateThreeDigits2,
} from "@/app/components/SeparateThreeDigits";
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
  const tdClass = "w-full text-black text-[20px] border-b-2 shadow-md py-1";

  return (
    <Link
      className="flex min-w-7  font-black flex-col overflow-hidden hover:!text-lg !text-lg items-center rounded-xl outline-none  will-change-transform cursor-pointer w-full h-full   shadow-[0_4px_8px_0px_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] transition-transform transform hover:scale-110 "
      key={index}
      href={`/products/${data.$id}`}
    >
      <section className="  flex w-[280px] flex-col items-center transform-cpu shadow-[0_4px_8px_0px_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] p-2  ">
        <img
          className="w-32 h-32 rounded-full "
          src={data.images}
          alt={data.productName}
        />
        <div className="flex text-center hover:font-normal  flex-col w-full  font-medium   ">
          <span className={clsx(tdClass, "text-black text-[20px]")}>
            {" "}
            <p>نام کالا</p> {data.productName}
          </span>
          <span className={`${tdClass} `}>
            {" "}
            <p className={"text-black w-full !font-medium hover:text-black"}>
              قیمت{" "}
            </p>{" "}
            <span className="font-mono ">
              {" "}
              {HandleSeparateThreeDigits(Number(data.price))}
            </span>
          </span>
          <span className={tdClass}>
            {" "}
            <p>مکان </p> {data.location}
          </span>
          <div className="flex justify-start text-right flex-wrap">
            <span
              title={data.description}
              className={clsx(tdClass, "truncate shadow-none border-none")}
            >
              <p className="!text-center"> توضیحات</p>{" "}
              <span className="mr-3">{data.description}</span>
            </span>
          </div>{" "}
        </div>{" "}
        <button className="border-gladiatorYellow shadow-2xl shadow-gray-600 p-2 text-white rounded-lg  border-[3px] bg-gray-800">
          جزئیات محصول
        </button>
      </section>
    </Link>
  );
}
export default Card;
