import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export const getApiHeaders = () => {
  const sessionStore = localStorage.getItem("sessionStore")
    ? JSON.parse(localStorage.getItem("sessionStore")!)
    : undefined;
  let token;

  if (sessionStore) {
    token = sessionStore.state.session.token;
  }

  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
};

export default axiosInstance;
