import { useQuery } from "@tanstack/react-query";
import axiosInstance, {
  getApiHeaders,
} from "../../../libs/axios/axiosInstance";
import { Product } from "../../products/apis/useProductsQuery";
import { salesQueryKeys } from "./queryKeys";

export type Sale = {
  id: number;
  sellingPrice: string;
  quantity: number;
  total: string;
  createdAt: string;
  productId: number;
  product: Omit<Product, "category">;
};

const findSales = (): Promise<Sale[]> => {
  return axiosInstance
    .get("/sales", getApiHeaders())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useSalesQuery = (userId: number | undefined) => {
  return useQuery({
    queryKey: salesQueryKeys.byUserId(userId),
    queryFn: findSales,
  });
};
