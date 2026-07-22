import axios from "axios";
import useAuthStore from "../store/authStore";
import { refreshTokenRequest } from "../services/authService";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const isRefreshCall = error.config?.url?.includes("/refresh-Token");
    const isLogoutCall = error.config?.url?.includes("/logout");

    if (error.response?.status === 401 && !error.config._retry && !isRefreshCall && !isLogoutCall) {
      error.config._retry = true;
      try {
        await refreshTokenRequest();
        return api(error.config);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;