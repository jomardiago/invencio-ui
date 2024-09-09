import { useQuery } from "@tanstack/react-query";
import axiosInstance, {
  getApiHeaders,
} from "../../../libs/axios/axiosInstance";
import { queryKeys } from "./queryKeys";

export type Profile = {
  id: number;
  firstName?: string;
  lastName?: string;
  contactNumber?: string;
  address?: string;
  profileImgUrl?: string;
  createdAt?: string;
  userId: number;
};

const findProfile = (): Promise<Profile> => {
  return axiosInstance
    .get("/profiles/user-profile", getApiHeaders())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useProfileQuery = (userId: number | undefined) => {
  return useQuery({
    queryKey: queryKeys.byUserId(userId),
    queryFn: findProfile,
  });
};
