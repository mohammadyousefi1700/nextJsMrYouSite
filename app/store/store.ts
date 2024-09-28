import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { subscribeWithSelector } from "zustand/middleware";
import { persist } from "zustand/middleware";
import { Store } from "./type";
import { createOrder } from "./order-customer";
export const useStore = create<Store>()(
  persist(
    subscribeWithSelector(
      immer((...a) => ({
        ...createOrder(...a),
      }))
    ),
    {
      name: "local-storege",
    }
  )
);
