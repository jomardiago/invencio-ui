import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, {
  getApiHeaders,
} from "../../../libs/axios/axiosInstance";
import { queryKeys } from "./queryKeys";

type UpdateProductPayload = {
  id: number;
  title: string;
  stock: number;
  buyingPrice: number;
  sellingPrice: number;
  categoryId: number;
};

const updateProduct = (
  data: UpdateProductPayload,
): Promise<{ message: string }> => {
  return axiosInstance
    .patch(`/products/${data.id}`, data, getApiHeaders())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useUpdateProductMutation = (userId: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.byUserId(userId) }),
    onError: (error: { message: string }) => error,
  });
};
