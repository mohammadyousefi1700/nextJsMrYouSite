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
  const tdClass = "w-full";

  return (
    <Link
      className="flex min-w-7 flex-col items-center outline-none cursor-pointer w-full h-full  shadow-[0_4px_8px_0px_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] transition-transform transform hover:scale-105"
      key={index}
      href={`/products/${data.$id}`}
    >
      <section className="  flex w-[280px] flex-col items-center shadow-[0_4px_8px_0px_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] p-2">
        <img
          className="w-32 h-32 rounded-full "
          src={data.images}
          alt={data.productName}
        />
        <div className="flex  flex-col w-full ">
          <span className={tdClass}> نام کالا : {data.productName}</span>
          <span className={tdClass}> قیمت : {data.price}</span>
          <span className={tdClass}> مکان : {data.location}</span>
          <div className="flex flex-wrap">
            <span
              title={data.description}
              className={clsx(tdClass, "truncate")}
            >
              {" "}
              توضیحات : {data.description}
            </span>
          </div>{" "}
        </div>{" "}
      </section>
    </Link>
    // </div>
  );
}
export default Card;
