import React, { useState, useEffect } from "react";
import classes from "./Login.module.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Alert from "@mui/material/Alert";

const Login = ({ onLogin, showAlert }) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showLoginLeft, setShowLoginLeft] = useState(true);

  const showLoginFormHandler = (show) => {
    setShowLoginForm(show);
  };

  const showRegisterFormHandler = (show) => {
    setShowLoginForm(show);
  };

  const showLoginLeftHandler = () => {
    if (window.innerWidth <= 960) {
      setShowLoginLeft(false);
    } else {
      setShowLoginLeft(true);
    }
  };

  const getDataLoginHandler = (username, password) => {
    onLogin(username, password);
  };

  useEffect(() => {
    showLoginLeftHandler();
    window.addEventListener("resize", showLoginLeftHandler);
  }, []);

  return (
    <div className={classes.loginWrapper}>
      {showLoginLeft && (
        <div className={classes.loginLeft}>
          <TwitterIcon
            style={{ width: "280px", height: "228px", color: "white" }}
          />
        </div>
      )}
      <div className={classes.loginRight}>
        <TwitterIcon
          style={{ width: "42px", height: "34px", color: "rgb(29, 155, 240)" }}
        />
        <h1 className={classes.happeningNow}>Happening Now</h1>
        <h3 className={classes.joinTwitter}>Join Twitter today.</h3>
        {showAlert && (
          <Alert severity="error" style={{ marginTop: "10px" }}>
            No User Found!
          </Alert>
        )}
        {showLoginForm ? (
          <LoginForm
            onGetDataLogin={getDataLoginHandler}
            showRegister={showRegisterFormHandler}
          />
        ) : (
          <RegisterForm showLogin={showLoginFormHandler} />
        )}
      </div>
    </div>
  );
};

export default Login;
