import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, {
  getApiHeaders,
} from "../../../libs/axios/axiosInstance";
import { salesQueryKeys } from "./queryKeys";

type CreateSalePayload = {
  productId: number;
  sellingPrice: number;
  quantity: number;
  total: number;
};

const createSale = (data: CreateSalePayload) => {
  return axiosInstance
    .post(`/sales`, data, getApiHeaders())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useCreateSaleMutation = (userId: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSale,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: salesQueryKeys.byUserId(userId),
      }),
    onError: (error: { message: string }) => error,
  });
};
