import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import classes from "./App.module.css";
import Feed from "./components/Feed/Feed";
import RightPanel from "./components/RightPanel/RightPanel";
import Sidebar from "./components/Sidebar/Sidebar";

import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login/Login";

// services
import { userLogin } from "./redux/services";

function App() {
  let history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [showSideBar, setShowSideBar] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem("userLogin"))
      ? JSON.parse(localStorage.getItem("userLogin"))
      : false;
    if (userLogin.data) {
      setIsLoggedIn(true);
      history.push("/home");
    } else {
      setIsLoggedIn(false);
    }
    showRightPanelHandler();
    window.addEventListener("resize", showRightPanelHandler);
  }, [history]);

  const loginHandler = async (username, password) => {
    let body = {
      userName: username,
      userPassword: password,
    };
    const loginResult = await userLogin(body);
    if (loginResult.data.data) {
      localStorage.setItem("userLogin", JSON.stringify(loginResult.data));
      setIsLoggedIn(true);
      setShowAlert(false);
      history.push("/home");
    } else {
      setShowAlert(true);
    }
  };
  const logoutHandler = () => {
    localStorage.removeItem("userLogin");
    setIsLoggedIn(false);
  };

  const showRightPanelHandler = () => {
    if (window.innerWidth <= 960) {
      setShowRightPanel(false);
    } else {
      setShowRightPanel(true);
    }
  };

  const showSideBarHandler = () => {
    setShowSideBar(!showSideBar);
  };

  const getDataSearch = (data) => {
    setSearch(data);
  };

  return (
    <Switch>
      <Route path="/home">
        {isLoggedIn ? (
          <div className={classes.app}>
            <Sidebar showSideBar={showSideBar} />
            <Feed
              onClickLogout={logoutHandler}
              onShowSidebar={showSideBarHandler}
              searchData={search}
            />
            {showRightPanel && <RightPanel onSearch={getDataSearch} />}
          </div>
        ) : (
          <Redirect to="/" />
        )}
      </Route>
      <Route path="/">
        <Login onLogin={loginHandler} showAlert={showAlert} />
      </Route>
    </Switch>
  );
}

export default App;
