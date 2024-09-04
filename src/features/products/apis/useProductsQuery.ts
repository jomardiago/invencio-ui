import { useQuery } from "@tanstack/react-query";
import axiosInstance, {
  getApiHeaders,
} from "../../../libs/axios/axiosInstance";
import { queryKeys } from "./queryKeys";
import { Category } from "../../categories/apis/useCategoriesQuery";

export type Product = {
  id: number;
  title: string;
  stock: number;
  buyingPrice: string;
  sellingPrice: string;
  createdAt: string;
  categoryId: number;
  category: Category;
};

const findProducts = (): Promise<Product[]> => {
  return axiosInstance
    .get("/products", getApiHeaders())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useProductsQuery = (userId: number | undefined) => {
  return useQuery({
    queryKey: queryKeys.byUserId(userId),
    queryFn: findProducts,
  });
};
