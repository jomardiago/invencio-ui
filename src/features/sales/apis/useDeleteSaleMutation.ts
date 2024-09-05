import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, {
  getApiHeaders,
} from "../../../libs/axios/axiosInstance";
import { salesQueryKeys } from "./queryKeys";

const deleteSale = (saleId: number): Promise<{ message: string }> => {
  return axiosInstance
    .delete(`/sales/${saleId}`, getApiHeaders())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useDeleteSaleMutation = (userId: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSale,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: salesQueryKeys.byUserId(userId),
      }),
    onError: (error: { message: string }) => error,
  });
};
