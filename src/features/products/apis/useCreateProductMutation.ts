import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, {
  getApiHeaders,
} from "../../../libs/axios/axiosInstance";
import { queryKeys } from "./queryKeys";

type CreateProductPayload = {
  title: string;
  stock: number;
  buyingPrice: number;
  sellingPrice: number;
  categoryId: number;
};

const createProduct = (
  data: CreateProductPayload,
): Promise<{ message: string }> => {
  return axiosInstance
    .post(`/products`, data, getApiHeaders())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useCreateProductMutation = (userId: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.byUserId(userId) }),
    onError: (error: { message: string }) => error,
  });
};
