import CmpActiveOrder from "./components/cmpActiveOrder";
import Purchase from "./components/purchase";

export const revalidate = 700; // revalidate at most every hour

async function ListPurchases() {
  return (
    <div
      id="scroll"
      className=" overflow-y-auto pt-11 overflow-x-hidden h-screen pb-10 mb-10"
    >
      <div
        id="scroll"
        className="flex   mx-auto flex-col md:items-start items-center ml-10  space-y-3 w-full mt-2 "
      >
        <div className="flex h-fit sm:justify-center justify-center sm:!mt-14 xs:justify-center xs:!px-4 xs:!mt-14 flex-wrap gap-x-3 gap-y-3 w-full">
          <CmpActiveOrder />
        </div>
        <div className="w-full px-9">
          {" "}
          <Purchase />{" "}
        </div>
      </div>
    </div>
  );
}

export default ListPurchases;
