import { useForm } from "react-hook-form";
import api from "../api/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { useAuth } from "../hooks/useAuth";

function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { handleLogin, loading, error } = useAuth();

  if(loading) {
    return <span>Logging in...</span>
  }
  
  if(error) {
    return <span>{error}</span>
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <h1>Login Page</h1>
      <input
        type="email"
        placeholder="Email"
        {...register("email")}
      />
      {errors.email && <span>Email is required</span>}
      <br />
      <input
        type="password"
        placeholder="Password"
        {...register("password")}
      />
      {errors.password && <span>Password is required</span>}
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default Login;