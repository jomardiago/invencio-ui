import { useQuery } from "@tanstack/react-query";
import axiosInstance, {
  getApiHeaders,
} from "../../../libs/axios/axiosInstance";
import { queryKeys } from "./queryKeys";

const findTotalQuantitySoldByProducts = (): Promise<
  { productId: number; title: string; quantity: number }[]
> => {
  return axiosInstance
    .get("/sales/quantity-sold-by-product", getApiHeaders())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useTotalQuantitySoldByProductsQuery = (
  userId: number | undefined,
) => {
  return useQuery({
    queryKey: queryKeys.byWidgetType(userId, "quantityByProductChart"),
    queryFn: findTotalQuantitySoldByProducts,
  });
};
