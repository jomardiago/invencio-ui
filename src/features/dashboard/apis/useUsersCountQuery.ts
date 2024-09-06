import { useQuery } from "@tanstack/react-query";
import axiosInstance, {
  getApiHeaders,
} from "../../../libs/axios/axiosInstance";
import { queryKeys } from "./queryKeys";

const findUsersCount = (): Promise<number> => {
  return axiosInstance
    .get("/users/count", getApiHeaders())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useUsersCountQuery = (userId: number | undefined) => {
  return useQuery({
    queryKey: queryKeys.byUserId(userId),
    queryFn: findUsersCount,
  });
};
