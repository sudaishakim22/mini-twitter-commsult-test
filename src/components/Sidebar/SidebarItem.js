import React from "react";
import classes from "./SidebarItem.module.css";

const SidebarItem = ({ active, text, Icon, onClick }) => {
  return (
    <li
      className={`${classes.sidebarItem} ${active && classes.active}`}
      onClick={() => onClick()}
    >
      <Icon />
      <h2 className={classes.sidebarItem__h2}>{text}</h2>
    </li>
  );
};

export default SidebarItem;
