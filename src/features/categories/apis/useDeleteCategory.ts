import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, {
  getApiHeaders,
} from "../../../libs/axios/axiosInstance";
import { Category } from "./useCategoriesQuery";
import { queryKeys } from "./queryKeys";

const deleteCategory = (category: Category): Promise<{ message: string }> => {
  return axiosInstance
    .delete(`/categories/${category.id}`, getApiHeaders())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useDeleteCategoryMutation = (userId: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.byUserId(userId),
      });
    },
    onError: (error: { message: string }) => error,
  });
};
