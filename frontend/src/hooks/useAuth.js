import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { loginRequest, fetchProfile } from "../services/authService";

export function useAuth() {

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  const handleLogin = async (data) => {
    setLoading(true);
    setError(null);
    
    try {
      await loginRequest(data);
      const res = await fetchProfile();
      login(res.data);

      if (res.data.data.role === "user") {
          navigate(location.state?.from?.pathname || "/user/dashboard");
      } else {
          navigate(location.state?.from?.pathname || "/admin/dashboard");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return { handleLogin, handleLogout, loading, error };
} 