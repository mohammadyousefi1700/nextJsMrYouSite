import auth from "@/app/auth";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";

export const metadata: Metadata = {
  title: "سبد خرید",
};

export default async function Basket() {
  const CardProduct = dynamic(() => import("./components/CardProduct"), {
    ssr: false, //
    loading: () => <p>Loading...</p>,
  });

  const CardCalculate = dynamic(() => import("./components/CardCalculate"), {
    ssr: false,
    loading: () => <p>Loading...</p>,
  });
  const AddAddressCustomer = dynamic(
    () => import("./components/AddAddressCustomer"),
    {
      ssr: false,
      loading: () => <p>Loading...</p>,
    }
  );
  const user = await (await auth.getUser()).data;

  return (
    <div className="mt-16 md:max-h-screen xs:max-h-screen xs:mt-24 sm:mt-24  sm:max-h-screen md:overflow-y-scroll xs:overflow-y-scroll sm:overflow-y-scroll">
      <Link
        className="  bg-red-600 font-normal text-white p-2 rounded-lg text-[20px] "
        href={"/"}
      >
        بازگشت به صحفه خرید
      </Link>

      <div className="flex  sm:flex-col  mt-6 sm:items-center xs:pb-11 xs:flex-col xs:w-[300px] xs:mx-auto xs:mt-9 md:flex-col lg:gap-16 xl:gap-x-20 xl:pl-2  w-full ">
        <CardProduct />
        <CardCalculate userId={user} />
      </div>
      <AddAddressCustomer />
    </div>
  );
}
