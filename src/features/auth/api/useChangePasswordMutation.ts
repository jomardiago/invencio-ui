import { useMutation } from "@tanstack/react-query";
import axiosInstance, {
  getApiHeaders,
} from "../../../libs/axios/axiosInstance";

type ChangePasswordPayload = {
  oldPassword: string;
  newPassword: string;
};

const changePassword = (
  data: ChangePasswordPayload,
): Promise<{ message: string }> => {
  return axiosInstance
    .post("/auth/change-password", data, getApiHeaders())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: changePassword,
    onError: (error: { message: string }) => error,
  });
};
