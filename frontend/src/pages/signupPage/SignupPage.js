import React, { Fragment } from "react";
import "./signuppage.css";
import { Signupform } from "../../components/Index";

function SignupPage() {
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
          <Signupform />
        </div>
      </div>
    </Fragment>
  );
}

export default SignupPage;
