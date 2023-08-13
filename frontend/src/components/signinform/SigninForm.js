import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { context } from "../../context/ContextProvider";
import "./signinform.css";

function Signinform() {
  const { setCurrentUserToken, refresh, setRefresh } = useContext(context);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [showIsWrongDiv, setShowIsWrongDiv] = useState(false);

  const navigate = useNavigate();

  const signInHandler = async (e) => {
    e.preventDefault();
    try {
      const loggedIn = {
        email: emailValue,
        password: passwordValue,
      };
      const user = await axios.post(
        "http://localhost:3001/api/v1/auth/signin",
        loggedIn
      );
      const token = user.data.token;
      localStorage.setItem("token", JSON.stringify(token));
      setCurrentUserToken(token);
      setRefresh(!refresh);
      navigate("/yourboard");
    } catch (err) {
      setShowIsWrongDiv(true);
      console.log(err);
    }
  };

  return (
    <Fragment>
      <form className="signin-form">
        <input
          type="text"
          className="signin-input"
          placeholder="E-mail"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
        ></input>
        <div className="signin-password-container">
          <input
            type={isPasswordVisible ? "text" : "password"}
            className="signin-input"
            placeholder="Password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
          ></input>
          <div
            className="signin-eye-container"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
          </div>
          <div
            className={
              showIsWrongDiv ? "signin-wrong-info block" : "signin-wrong-info"
            }
          >
            E-mail or password are wrong
          </div>
        </div>
        <div className="signup-btn-container">
          <input
            type="submit"
            value="Sign In"
            className="submit-btn"
            onClick={(e) => signInHandler(e)}
          ></input>
        </div>
        <div>Don't Have An Accout?</div>
        <Link to="/signup" className="create-account">
          Create Your Account
        </Link>
      </form>
    </Fragment>
  );
}

export default Signinform;
