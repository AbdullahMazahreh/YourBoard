import React, { Fragment, useEffect } from "react";
import "./signinpage.css";
import { Signinform } from "../../components/Index";
import { useNavigate } from "react-router";

function SigninPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token")) || null;
    if (user) {
      navigate("/yourboard");
    }
  }, []);

  return (
    <Fragment>
      <div className="signup-page-container">
        <div className="signup-page-hero">
          <h1 className="signup-page-hero-title">Your Board</h1>
          <div className="signup-page-hero-text">
            Utilize Your Board as a platform to monitor your project and task
            progress effectively. Embark on your journey of tracking projects
            today to accomplish your objectives.
          </div>
        </div>
        <div className="signup-page-form">
          <Signinform />
        </div>
      </div>
    </Fragment>
  );
}

export default SigninPage;
