import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, {
  getApiHeaders,
} from "../../../libs/axios/axiosInstance";
import { Category } from "./useCategoriesQuery";
import { queryKeys } from "./queryKeys";

const updateCategory = (data: Category) => {
  return axiosInstance
    .patch(`/categories/${data.id}`, { name: data.name }, getApiHeaders())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useUpdateCategoryMutation = (userId: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.byUserId(userId),
      });
    },
    onError: (error: { message: string }) => error,
  });
};
