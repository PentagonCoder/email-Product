import { useEffect, useState } from "react";
import api from "../api/axios";
import { fetchProfile } from "../services/authService";


function Dashboard() {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetchProfile();
        setUserProfile(response.data);
        console.log("User profile fetched:", response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
      <h1>Dashboard Page</h1>
        <div>
          <p>Email: {userProfile?.data}</p>
        </div>
    </div>
  );
}

export default Dashboard;