import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, {
  getApiHeaders,
} from "../../../libs/axios/axiosInstance";
import { queryKeys } from "./queryKeys";

const deleteProduct = (id: number): Promise<{ message: string }> => {
  return axiosInstance
    .delete(`/products/${id}`, getApiHeaders())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useDeleteProductMutation = (userId: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.byUserId(userId) }),
    onError: (error: { message: string }) => error,
  });
};
