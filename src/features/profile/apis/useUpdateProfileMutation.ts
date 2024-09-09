import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, {
  getApiHeaders,
} from "../../../libs/axios/axiosInstance";
import { queryKeys } from "./queryKeys";

type UpdateProfilePayload = {
  firstName?: string;
  lastName?: string;
  contactNumber?: string;
  address?: string;
};

const updateProfile = (
  data: UpdateProfilePayload,
): Promise<{ message: string }> => {
  return axiosInstance
    .patch("/profiles", data, getApiHeaders())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useUpdateProfileMutation = (userId: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.byUserId(userId) }),
    onError: (error: { message: string }) => error,
  });
};
