import { useQuery } from "@tanstack/react-query";
import axiosInstance, {
  getApiHeaders,
} from "../../../libs/axios/axiosInstance";
import { queryKeys } from "./queryKeys";

const findCategoriesCount = (): Promise<number> => {
  return axiosInstance
    .get("/categories/count", getApiHeaders())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useCategoriesCountQuery = (userId: number | undefined) => {
  return useQuery({
    queryKey: queryKeys.byWidgetType(userId, "categories"),
    queryFn: findCategoriesCount,
  });
};
