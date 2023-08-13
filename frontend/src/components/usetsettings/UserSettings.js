import React, { Fragment } from "react";
import "./usersettings.css";
import { Button } from "../Index";
import { useNavigate } from "react-router";

function UserSettings() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Fragment>
      <div className="usersettings-container">
        <Button
          backgroundColor="white"
          color="rgb(89, 83, 177)"
          onClickFunctionality={handleSignOut}
          placeholder="Sign Out"
        />
      </div>
    </Fragment>
  );
}

export default UserSettings;
