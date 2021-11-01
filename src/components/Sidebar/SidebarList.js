import React, { useState } from "react";
import SidebarItem from "./SidebarItem";
import classes from "./SidebarList.module.css";
import { useDispatch } from "react-redux";
import { getTweets } from "../../redux/actions";

//icons
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";

const SidebarList = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState("home");

  const onClickExploreHandler = (type) => {
    const getResult = dispatch(getTweets());
    if (type === "explore") {
      setActive("explore");
    } else if (type === "home") {
      setActive("home");
    }
  };

  return (
    <ul className={classes.sidebar__list}>
      <SidebarItem
        active={active === "home" ? true : false}
        Icon={HomeIcon}
        text="Home"
        onClick={() => onClickExploreHandler("home")}
      />
      <SidebarItem
        active={active === "explore" ? true : false}
        Icon={SearchIcon}
        text="Explore"
        onClick={() => onClickExploreHandler("explore")}
      />
    </ul>
  );
};

export default SidebarList;
