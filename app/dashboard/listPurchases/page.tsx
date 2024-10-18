import CmpActiveOrder from "./components/cmpActiveOrder";
import Purchase from "./components/purchase";

function ListPurchases() {
  return (
    <div className="flex flex-col items-center space-y-3  mt-2 ">
      <CmpActiveOrder />
      <Purchase />
      {/* {ActiveOrder} */}
      {/* <div>1</div>
      <div> page</div> */}
    </div>
  );
}

export default ListPurchases;
