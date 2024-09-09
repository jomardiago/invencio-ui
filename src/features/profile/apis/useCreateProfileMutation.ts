import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, {
  getApiHeaders,
} from "../../../libs/axios/axiosInstance";
import { queryKeys } from "./queryKeys";

type CreateProfilePayload = {
  firstName?: string;
  lastName?: string;
  contactNumber?: string;
  address?: string;
};

const createProfile = (
  data: CreateProfilePayload,
): Promise<{ message: string }> => {
  return axiosInstance
    .post("/profiles", data, getApiHeaders())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useCreateProfileMutation = (userId: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProfile,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.byUserId(userId) }),
    onError: (error: { message: string }) => error,
  });
};
