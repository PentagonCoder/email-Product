  import { useEffect, useState, useRef  } from "react";
  import { useForm } from "react-hook-form";
  import { verifyEmailRequest } from "../../services/authService";
  import { useParams } from "react-router-dom";

  function VerifyEmail() {

    const [message, setMessage] = useState([]);
    const [error, setError] = useState(null);
    const { token } = useParams();
    const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const fetchEmailVerification = async () =>  {
      try {
        const response = await verifyEmailRequest(token);
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response?.data?.message || "Something went wrong");
      }
    };

    fetchEmailVerification();
  }, [token]);

    return (
      <div className="min-h-screen bg-[#0F1115] flex items-center justify-center px-4">
      <div className="bg-[#171A21] border border-[#2A2E38] rounded-lg p-6 max-w-sm w-full text-center">
        <p className="text-sm text-[#E8EAED]">{message || "Verifying…"}</p>
      </div>
    </div>
    );
  }

  export default VerifyEmail;