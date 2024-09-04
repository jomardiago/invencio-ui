export const formatToCurrency = (value: string) => {
  return Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(Number(value));
};
