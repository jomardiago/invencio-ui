import { useQuery } from "@tanstack/react-query";
import axiosInstance, {
  getApiHeaders,
} from "../../../libs/axios/axiosInstance";
import { queryKeys } from "./queryKeys";

type Profile = {
  id: number;
  firstName?: string;
  lastName?: string;
  contactNumber?: string;
  address?: string;
};

type User = {
  id: number;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  Profile?: Profile;
};

const findUsers = (): Promise<User[]> => {
  return axiosInstance
    .get("/users", getApiHeaders())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useUsersQuery = (userId?: number) => {
  return useQuery({
    queryKey: queryKeys.byUserId(userId),
    queryFn: findUsers,
  });
};
