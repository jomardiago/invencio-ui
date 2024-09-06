import { useQuery } from "@tanstack/react-query";
import axiosInstance, {
  getApiHeaders,
} from "../../../libs/axios/axiosInstance";
import { queryKeys } from "./queryKeys";

const findTotalSales = (): Promise<string> => {
  return axiosInstance
    .get("/sales/total", getApiHeaders())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useTotalSalesQuery = (userId: number | undefined) => {
  return useQuery({
    queryKey: queryKeys.byWidgetType(userId, "sales"),
    queryFn: findTotalSales,
  });
};
