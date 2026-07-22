import { useEffect, useState } from "react";
import api from "../../api/axios";
import { fetchProfile } from "../../services/authService";


function DashboardAdmin() {
  const [userProfile, setUserProfile] = useState(null);

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

  return (
    <div>
      <h1>Dashboard Page</h1>
        <div>
          <p>Email: {userProfile?.email}</p>
        </div>
    </div>
  );
}

export default DashboardAdmin;