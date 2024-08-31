import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../axios";

type LoginUserPayload = {
  email: string;
  password: string;
};

type LoginResponseData = {
  id: number;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  token: string;
};

const loginUser = (data: LoginUserPayload): Promise<LoginResponseData> => {
  return axiosInstance
    .post("/auth/login", data)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginUser,
    onError: (error: { message: string }) => {
      return error;
    },
  });
};
