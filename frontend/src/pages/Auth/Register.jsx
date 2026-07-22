import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerRequest } from "../../services/authService";


function Register() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
 

  const handleRegister = async (data) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    
    try {
      const res = await registerRequest(data);
      setMessage(res.data.data);
      console.log("Registration successful:", res.data);
      reset(); // Reset the form after successful registration
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };


  if(loading) {
    return <span>Registering...</span>
  }
  
  if(error) {
    return <span>{error}</span>
  }

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
        <form className="space-y-4" onSubmit={handleSubmit(handleRegister)}>
          <input
            type="fullname"
            className="w-full border rounded-lg p-3"
            placeholder="Full Name"
            {...register("fullname")}
            />
          {errors.fullname && <span>Full Name is required</span>}
          <br />
          <input
            type="email"
            className="w-full border rounded-lg p-3"
            placeholder="Email"
            {...register("email")}
            />
          {errors.email && <span>Email is required</span>}
          <br />
          <input
            type="password"
            className="w-full border rounded-lg p-3"
            placeholder="Password"
            {...register("password")}
            />
          {errors.password && <span>Password is required</span>}
          <br />
          <span>Role:</span>
          <select className="w-full border rounded-lg p-3" {...register("role")}>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
          {errors.role && <span>Role is required</span>}
          <br />
          
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-3" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className=""> {message} </div>
      </div>
    </div>
    </>
  );
}

export default Register;

