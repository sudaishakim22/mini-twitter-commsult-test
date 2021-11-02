import React, { useState } from "react";
import classes from "./RightPanel.module.css";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const trendDummyData = [
  {
    trend: "Trending in Indonesia",
    title: "#LittleMom",
    tweets: "1,178 Tweets",
  },
  {
    trend: "Football Trending",
    title: "Man United",
    tweets: "17.2k Tweets",
  },
  {
    trend: "News Trending",
    title: "Najwa Shihab",
    tweets: "-",
  },
  {
    trend: "Trending in Indonesia",
    title: "#Solana",
    tweets: "170k Tweets",
  },
];

const TrendingList = ({ trend, title, tweets }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px",
        marginBottom: "20px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: "12px" }}>{trend}</span>
        <span style={{ fontWeight: "600" }}>{title}</span>
        <span style={{ fontSize: "12px" }}>{tweets}</span>
      </div>
      <div>
        <MoreHorizIcon />
      </div>
    </div>
  );
};

const RightPanel = ({ onSearch }) => {
  const handleSearch = (e) => {
    let search = e.target.value.toLowerCase();
    onSearch(search);
  };

  return (
    <div className={classes.rightPanel}>
      <div className={classes.rightPanel__input}>
        <SearchIcon className={classes.rightPanel__searchIcon} />
        <input
          type="text"
          placeholder="Search Twitter"
          onChange={handleSearch}
        />
      </div>
      <div className={classes.trendForYou}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Trend for You</h3>
          <SettingsIcon />
        </div>
        {trendDummyData.map((item) => (
          <TrendingList
            trend={item.trend}
            title={item.title}
            tweets={item.tweets}
          />
        ))}
      </div>
    </div>
  );
};

export default RightPanel;
