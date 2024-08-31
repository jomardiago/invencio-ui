import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

export const getApiHeaders = () => {
  const sessionStore = localStorage.getItem("sessionStore")
    ? JSON.parse(localStorage.getItem("sessionStore")!)
    : undefined;
  let accessToken;

  if (sessionStore) {
    accessToken = sessionStore.state.session.accessToken;
  }

  return {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  };
};

export default axiosInstance;
