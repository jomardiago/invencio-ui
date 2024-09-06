import { useQuery } from "@tanstack/react-query";
import axiosInstance, {
  getApiHeaders,
} from "../../../libs/axios/axiosInstance";
import { queryKeys } from "./queryKeys";

const findProductsCount = (): Promise<number> => {
  return axiosInstance
    .get("/products/count", getApiHeaders())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useProductsCountQuery = (userId: number | undefined) => {
  return useQuery({
    queryKey: queryKeys.byWidgetType(userId, "products"),
    queryFn: findProductsCount,
  });
};
