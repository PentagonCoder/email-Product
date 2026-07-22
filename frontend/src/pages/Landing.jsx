import React from "react";
import { Link } from "react-router-dom";
function LandingPage(params) {
  return (
    <div className="landing-page">
      <h1>Welcome to Our Application</h1>
      <p>This is the landing page of our application.</p>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
    
  );
}

export default LandingPage;