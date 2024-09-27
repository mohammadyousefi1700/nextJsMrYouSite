import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { subscribeWithSelector } from "zustand/middleware";
import { persist } from "zustand/middleware";
import { MainStateProduct } from "./type";
export const useStore = create<MainStateProduct>()(
  persist(
    subscribeWithSelector(
      immer((...a) => ({
        ...createCartSlice(...a),
      }))
    ),
    {
      name: "local-storege",
    }
  )
);
