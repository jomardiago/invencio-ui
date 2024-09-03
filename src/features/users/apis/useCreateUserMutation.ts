import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, {
  getApiHeaders,
} from "../../../libs/axios/axiosInstance";
import { queryKeys } from "./queryKeys";

type UserPayload = {
  email: string;
  password: string;
};

type CreateUserResponse = {
  message: string;
};

const createUser = (data: UserPayload): Promise<CreateUserResponse> => {
  return axiosInstance
    .post("/users", data, getApiHeaders())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useCreateUserMutation = (id: number | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.byUserId(id),
      });
    },
    onError: (error: { message: string }) => {
      return error;
    },
  });
};
