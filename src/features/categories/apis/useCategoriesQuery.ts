import { useQuery } from "@tanstack/react-query";
import axiosInstance, {
  getApiHeaders,
} from "../../../libs/axios/axiosInstance";
import { queryKeys } from "./queryKeys";

type Category = {
  id: number;
  name: string;
  createdAt: string;
};

const findCategories = (): Promise<Category[]> => {
  return axiosInstance
    .get("/categories", getApiHeaders())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useCategoriesQuery = (userId: number | undefined) => {
  return useQuery({
    queryKey: queryKeys.byUserId(userId),
    queryFn: findCategories,
  });
};
