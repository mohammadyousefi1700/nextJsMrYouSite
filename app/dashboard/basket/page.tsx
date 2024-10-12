import dynamic from "next/dynamic";
import Link from "next/link";

export default async function Basket() {
  const CardProduct = dynamic(() => import("./components/CardProduct"), {
    ssr: false, //
    loading: () => <p>Loading...</p>, // حالت بارگذاری
  });

  const CardCalculate = dynamic(() => import("./components/CardCalculate"), {
    ssr: false,
    loading: () => <p>Loading...</p>, // حالت بارگذاری
  });
  return (
    <div className="mt-16">
      <Link
        className=" bg-red-600 font-normal text-white p-2 rounded-lg text-[20px] "
        href={"/"}
      >
        بازگشت به صحفه خرید
      </Link>
      <div className="flex  sm:flex-col  mt-6 sm:items-center xs:pb-11 xs:flex-col xs:w-[300px] xs:mx-auto xs:mt-9 md:flex-col lg:gap-16 xl:gap-x-20  w-full ">
        <CardProduct />
        <CardCalculate />
      </div>
    </div>
  );
}
