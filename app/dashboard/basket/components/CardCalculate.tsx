"use client";
import { useStore } from "@/app/store/store";
import React from "react";

function CardCalculate() {
  const { products } = useStore();
  console.log("products", products);

  return <div>CardCalculate</div>;
}

export default CardCalculate;
