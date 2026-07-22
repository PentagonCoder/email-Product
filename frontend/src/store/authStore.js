import { create } from "zustand";
import { fetchProfile, logoutRequest } from "../services/authService";

const useAuthStore = create((set) => ({
  user: null, 
  isAuthenticated: false,
  isLoading: true,

  checkAuth: async () => {
    try {
      const res = await fetchProfile();
      set({ user: res.data, isAuthenticated: true, isLoading: false });
    } catch (err) {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  setUser: (userData) => set({ user: userData, isAuthenticated: true, isLoading: false }),

  login: (userData) => set({ user: userData, isAuthenticated: true, isLoading: false }),

  logout: async () => {
    try {
      await logoutRequest();
    } catch (err) {
      console.error("Logout failed", err);
    }
    set({ user: null, isAuthenticated: false });
  }
}));

export default useAuthStore;
