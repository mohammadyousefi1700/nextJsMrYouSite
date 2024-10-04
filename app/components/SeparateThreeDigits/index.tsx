export const HandleSeparateThreeDigits = (data?: any | null) => {
  const number = new Intl.NumberFormat("fa-IR", { style: "decimal" }).format(
    data
  );

  return number;
};
export const HandleSeparateThreeDigits2 = (data?: any | null) => {
  const number = Intl.NumberFormat("fa-IR", { style: "decimal" })
    .format(data)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "٬");
  return number;
};
