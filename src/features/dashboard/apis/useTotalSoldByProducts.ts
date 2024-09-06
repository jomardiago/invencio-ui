import { useQuery } from "@tanstack/react-query";
import axiosInstance, {
  getApiHeaders,
} from "../../../libs/axios/axiosInstance";
import { queryKeys } from "./queryKeys";

const findTotalSoldByProduct = (): Promise<
  { productId: number; title: string; total: number }[]
> => {
  return axiosInstance
    .get("/sales/total-sold-by-product", getApiHeaders())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useTotalSoldByProducts = (userId: number | undefined) => {
  return useQuery({
    queryKey: queryKeys.byWidgetType(userId, "totalByProductChart"),
    queryFn: findTotalSoldByProduct,
  });
};
