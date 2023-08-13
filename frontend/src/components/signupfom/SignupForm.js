import React, { Fragment, useContext, useState } from "react";
import "./signupform.css";
import axios from "axios";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router";
import { context } from "../../context/ContextProvider";

function Signupform() {
  const { isDarkTheme, setCurrentUserToken, setRefresh, refresh } =
    useContext(context);
  const [emailValue, setEmailValue] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [userNameValue, setUserNameValue] = useState("");
  const [validUserName, setValidUserNAme] = useState(false);
  const [firstPasswordValue, setFirstPasswordValue] = useState("");
  const [validFirstPassword, setVaildFirstPassword] = useState(false);
  const [secondPasswordValue, setSecondPasswordValue] = useState("");
  const [validSecondPassword, setValidSecondPassword] = useState(false);
  const [showUserNameDiv, setShowUserNameDiv] = useState(false);
  const [showEmailDiv, setShowEmailDiv] = useState(false);
  const [showFirstPasswordDiv, setShowFirstPasswordDiv] = useState(false);
  const [showSecondPasswordDiv, setShowSecondPasswordDiv] = useState(false);
  const [isFirstPasswordVisible, setIsFirstPasswordVisible] = useState(false);
  const [isSecondPasswordVisible, setIsSecondPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const emailChangeHandler = (e) => {
    const enteredEmail = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValue(enteredEmail);
    setValidEmail(emailRegex.test(enteredEmail));
  };

  const userNameChangeHandler = (e) => {
    const enteredUserName = e.target.value;
    setUserNameValue(enteredUserName);
    setValidUserNAme(enteredUserName.length >= 3);
  };

  const firstPasswordHandler = (e) => {
    const enteredFirstPassword = e.target.value;
    const firstPasswordRegex = /^(?=.*[A-Z]).{8,}$/;
    setFirstPasswordValue(enteredFirstPassword);
    setVaildFirstPassword(firstPasswordRegex.test(enteredFirstPassword));
  };

  const secondPasswordHandler = (e) => {
    const enteredSecondPassword = e.target.value;
    setSecondPasswordValue(enteredSecondPassword);
    setValidSecondPassword(firstPasswordValue === enteredSecondPassword);
  };

  const userNameDivTestHandler = () => {
    if (validUserName && showUserNameDiv) {
      return "register-test correct block";
    }
    if (!validUserName && showUserNameDiv) {
      return "register-test wrong block";
    } else {
      return "register-test none";
    }
  };

  const emailDivTestHandler = () => {
    if (validEmail && showEmailDiv) {
      return "register-test correct block";
    }
    if (!validEmail && showEmailDiv) {
      return "register-test wrong block";
    } else {
      return "register-test none";
    }
  };

  const firstPasswordDivTestHandler = () => {
    if (validFirstPassword && showFirstPasswordDiv) {
      return "register-test correct block";
    }
    if (!validFirstPassword && showFirstPasswordDiv) {
      return "register-test wrong block";
    } else {
      return "register-test none";
    }
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      if (
        validUserName &&
        validEmail &&
        validFirstPassword &&
        validSecondPassword
      ) {
        const newUser = {
          name: userNameValue,
          email: emailValue,
          password: firstPasswordValue,
        };
        const user = await axios.post(
          "http://localhost:3001/api/v1/auth/signup",
          newUser
        );
        const token = user.data.token;
        localStorage.setItem("token", JSON.stringify(token));
        setCurrentUserToken(token);
        setRefresh(!refresh);
        navigate(`/yourboard`);
      }
    } catch (err) {
      setShowEmailDiv(true);
    }
  };

  const isOneUpperCaseHandler = () => {
    if (/[A-Z]/.test(firstPasswordValue)) {
      return "password-rule correct";
    } else {
      return "password-rule false";
    }
  };

  const isEightCharactersLengthHandler = () => {
    if (firstPasswordValue.length >= 8) {
      return "password-rule correct";
    } else {
      return "password-rule false";
    }
  };

  const secondPasswordDivTestHandler = () => {
    if (validSecondPassword && showSecondPasswordDiv) {
      return "register-test correct block";
    }
    if (!validSecondPassword && showSecondPasswordDiv) {
      return "register-test wrong block";
    } else {
      return "register-test none";
    }
  };

  return (
    <Fragment>
      <form className="signup-form">
        <input
          type="text"
          placeholder="User-Name"
          className={isDarkTheme ? "input-field dark-theme" : "input-field"}
          value={userNameValue}
          onChange={(e) => userNameChangeHandler(e)}
          onFocus={() => setShowUserNameDiv(true)}
          onBlur={() =>
            validUserName ? setShowUserNameDiv(false) : setShowUserNameDiv(true)
          }
        ></input>
        <div className={userNameDivTestHandler()}>
          {validUserName
            ? "User-Name is available"
            : "User-Name must be at least 3 characters"}
        </div>
        <input
          type="text"
          placeholder="E-mail"
          className={isDarkTheme ? "input-field dark-theme" : "input-field"}
          value={emailValue}
          onChange={(e) => emailChangeHandler(e)}
          onFocus={() => setShowEmailDiv(true)}
          onBlur={() =>
            validEmail ? setShowEmailDiv(false) : setShowEmailDiv(true)
          }
        ></input>
        <div className={emailDivTestHandler()}>
          {validEmail
            ? "E-mail is available"
            : "E-mail is used or in wrong form"}
        </div>
        <div className="password-input-container">
          <input
            type={isFirstPasswordVisible ? "text" : "password"}
            placeholder="Password"
            className={isDarkTheme ? "input-field dark-theme" : "input-field"}
            value={firstPasswordValue}
            onChange={(e) => firstPasswordHandler(e)}
            onFocus={() => setShowFirstPasswordDiv(true)}
            onBlur={() =>
              validFirstPassword
                ? setShowFirstPasswordDiv(false)
                : setShowFirstPasswordDiv(true)
            }
          ></input>
          <div
            className="eye-container"
            onClick={() => setIsFirstPasswordVisible(!isFirstPasswordVisible)}
          >
            {isFirstPasswordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
          </div>
          <div className={firstPasswordDivTestHandler()}>
            {validFirstPassword ? (
              "Password is Strong"
            ) : (
              <ul className="password-rules">
                <li className={isOneUpperCaseHandler()}>
                  Password must contain one UpperCase character
                </li>
                <li className={isEightCharactersLengthHandler()}>
                  Password must be at least 8 characters
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="password-input-container">
          <input
            type={isSecondPasswordVisible ? "text" : "password"}
            placeholder="Re-type Password"
            className={isDarkTheme ? "input-field dark-theme" : "input-field"}
            value={secondPasswordValue}
            onChange={(e) => secondPasswordHandler(e)}
            onFocus={() => setShowSecondPasswordDiv(true)}
            onBlur={() =>
              validSecondPassword
                ? setShowSecondPasswordDiv(false)
                : setShowSecondPasswordDiv(true)
            }
          ></input>
          <div
            className="eye-container"
            onClick={() => setIsSecondPasswordVisible(!isSecondPasswordVisible)}
          >
            {isSecondPasswordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
          </div>
          <div className={secondPasswordDivTestHandler()}>
            {validSecondPassword
              ? "Passwords do match"
              : "Passwords do not match"}
          </div>
        </div>
        <div className="signup-btn-container">
          <input
            type="submit"
            value="Sign Up"
            className={isDarkTheme ? "submit-btn dark-theme" : "submit-btn"}
            onClick={(e) => signUpHandler(e)}
          ></input>
        </div>
      </form>
    </Fragment>
  );
}

export default Signupform;
