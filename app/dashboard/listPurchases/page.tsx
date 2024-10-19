import CmpActiveOrder from "./components/cmpActiveOrder";
import Purchase from "./components/purchase";

export const revalidate = 700; // revalidate at most every hour

function ListPurchases() {
  return (
    <div className="flex flex-col items-center ml-10  space-y-3  mt-2 ">
      <CmpActiveOrder />
      <Purchase />
      {/* {ActiveOrder} */}
      {/* <div>1</div>
      <div> page</div> */}
    </div>
  );
}

export default ListPurchases;
