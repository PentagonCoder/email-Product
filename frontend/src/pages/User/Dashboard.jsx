import { useEffect, useState } from "react";
import api from "../../api/axios";
import { fetchProfile } from "../../services/authService";
import { useForm } from "react-hook-form";
import { keywordSearch } from "../../services/buyerService";
import {sendEmail} from "../../services/buyerService";

function DashboardUser() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [emailData, setEmailData] = useState(null);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetchProfile();
        setUserProfile(response.data.data);
        console.log("User profile fetched:", response.data.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleKeywordSearch = async (data) => {
    setLoading(true);
    setError(null);
    setData([]);
    
    try {
      const res = await keywordSearch(data);
      setData(res.data.data);
      console.log("Keyword search successful:", res.data);
      reset(); // Reset the form after successful search
    } catch (err) {
      setError(err.response?.data?.message || "Keyword search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSend = async (data) => {

    const formData = new FormData();

    formData.append("subject", data.subject);
    formData.append("text", data.text);
    formData.append("presentation", file);

    try {

      const res = await sendEmail(formData);

      console.log(res.data);

    } catch (err) {
      console.log(err);
    }

  };




  return (
    <div>
      <h1>Dashboard Page</h1>
        <div>
          <p>Email: {userProfile?.email}</p>
        </div>

        <form onSubmit={handleSubmit(handleKeywordSearch)}>
          <h1>Search</h1>

          <input
            type="keyword"
            placeholder="Keyword"
            {...register("keyword")}

          />
          {errors.keyword && <span>Keyword is required</span>}

          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search Buyers"}
          </button>
        </form>
            
        <table className="w-full border mt-5">
          <thead>
            <tr>
              <th>Company</th>
              <th>Email</th>
              <th>Website</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.company}</td>
                <td>{item.email}</td>
                <td><a
                      href={item.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit
                    </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <form onSubmit={handleSubmit(handleEmailSend)}>
          <h1>Send Email</h1>

          <input
            type="text"
            placeholder="text"
            {...register("text")}
          />
          {errors.text && <span>Text is required</span>}

          <input
            type="text"
            placeholder="Subject"
            {...register("subject")}
          />
          {errors.subject && <span>Subject is required</span>}

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {errors.file && <span>File is required</span>}

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Email"}
          </button>
        </form>

    </div>
  );
}

export default DashboardUser;