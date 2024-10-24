import clsx from "clsx";
import React, { ReactNode } from "react";
type Props = {
  mainDivClass?: string;
  children?: ReactNode;
};
function CartCustom(props: Props) {
  return (
    <div
      id="scroll"
      className={clsx(
        props.mainDivClass,
        "w-full shadow-lg shadow-slate-300 border-2 p-2 rounded-md"
      )}
    >
      {props.children}
    </div>
  );
}

export default CartCustom;
