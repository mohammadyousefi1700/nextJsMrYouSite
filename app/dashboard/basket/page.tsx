//سبد خرید
// entity orders باید اصلاح شود با  برای دریافت مشخصات با از ای پی ای پستز استفاده بشه و فقط coun برای مقدار سفارش مشتری استفاده میشود این برای پروژه ری اکت هم هست و باید اصلاح بشه
// در اینجا صحفه جمع فروش هم دااریم

import dynamic from "next/dynamic";

export default async function Basket() {
  const CardProduct = dynamic(import("./components/CardProduct"));
  return (
    <div className="flex justify-around mt-7 w-full ">
      <CardProduct />
      <div className="w-96 h-14 border-2 rounded-lg shadow-lg shadow-yellow-100  bg-red-500">
        {" "}
        page
      </div>
    </div>
  );
}
