import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, {
  getApiHeaders,
} from "../../../libs/axios/axiosInstance";
import { queryKeys } from "./queryKeys";

type UpdateUserRolePayload = {
  id: number;
  isAdmin: boolean;
};

const updateUserRole = (
  data: UpdateUserRolePayload,
): Promise<{ message: string }> => {
  return axiosInstance
    .patch(`/users/${data.id}/role`, { isAdmin: data.isAdmin }, getApiHeaders())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useUpdateUserRoleMutation = (userId: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserRole,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.byUserId(userId),
      });
    },
    onError: (error: { message: string }) => error,
  });
};
