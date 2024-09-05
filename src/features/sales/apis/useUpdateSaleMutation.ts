import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, {
  getApiHeaders,
} from "../../../libs/axios/axiosInstance";
import { salesQueryKeys } from "./queryKeys";

type UpdateSalePayload = {
  saledId: number;
  productId: number;
  sellingPrice: number;
  quantity: number;
  total: number;
};

const updateSale = (data: UpdateSalePayload): Promise<{ message: string }> => {
  return axiosInstance
    .patch(`/sales/${data.saledId}`, data, getApiHeaders())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useUpdateSaleMutation = (userId: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSale,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: salesQueryKeys.byUserId(userId),
      }),
    onError: (error: { message: string }) => error,
  });
};
