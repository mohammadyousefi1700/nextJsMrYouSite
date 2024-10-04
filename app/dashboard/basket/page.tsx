import dynamic from "next/dynamic";

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
    <div className="flex  sm:flex-col mt-24 sm:items-center xs:pb-11 xs:flex-col xs:w-[300px] xs:mx-auto xs:mt-9 md:flex-col lg:gap-16 xl:gap-x-20  w-full ">
      <CardProduct />
      <CardCalculate />
    </div>
  );
}
