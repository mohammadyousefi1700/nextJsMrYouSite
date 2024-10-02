import { HiClipboardList, HiOutlineShoppingCart } from "react-icons/hi";

type SidebarLinkProps = {
  title: string;
  path: string;
  icons?: JSX.Element;
};
export const sidebarLink: SidebarLinkProps[] = [
  {
    path: "/dashboard/basket",
    title: "سفارشات",
    icons: <HiOutlineShoppingCart className=" w-6 h-6 items-center  " />,
  },
  {
    title: "لیست خرید های قبلی",
    path: "/dashboard/listPurchases",
    icons: <HiClipboardList className="w-5 h-5" />,
  },
];
