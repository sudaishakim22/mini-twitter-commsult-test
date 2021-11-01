import React from "react";
import classes from "./Sidebar.module.css";

// icons
import TwitterIcon from "@mui/icons-material/Twitter";
import SidebarList from "./SidebarList";

const Sidebar = ({ showSideBar }) => {
  return (
    <div className={`${classes.sidebar} ${showSideBar ? classes.active : ""}`}>
      <TwitterIcon className={classes.sidebar__twitterIcon} />
      <SidebarList />
    </div>
  );
};

export default Sidebar;
