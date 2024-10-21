import CmpActiveOrder from "./components/cmpActiveOrder";
import Purchase from "./components/purchase";

export const revalidate = 700; // revalidate at most every hour

async function ListPurchases() {
  return (
    <div className="flex h-auto overflow-y-scroll !pb-28  mx-auto flex-col md:items-start items-center ml-10  space-y-3 w-full mt-2 ">
      <div className="flex h-fit sm:justify-center justify-center sm:!mt-14 xs:justify-center xs:!px-4 xs:!mt-14 flex-wrap gap-x-3 gap-y-3 w-full">
        <CmpActiveOrder />
      </div>
      <div className="w-full px-9">
        <Purchase />
      </div>
    </div>
  );
}

export default ListPurchases;
