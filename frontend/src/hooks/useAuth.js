import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { loginRequest, fetchProfile, logoutRequest } from "../services/authService";

export function useAuth() {

  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (data) => {
    setLoading(true);
    setError(null);
    
    try {
      await loginRequest(data);
      const res = await fetchProfile();
      login(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutRequest();
    logout();
    navigate("/login");
  };

  return { handleLogin, handleLogout, loading, error };
} 