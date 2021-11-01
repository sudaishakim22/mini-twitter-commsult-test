import React, { useState, useEffect } from "react";
import classes from "./Post.module.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";
import { getUserData } from "../../redux/services";

const Post = (props) => {
  const { tweetListExplore } = useSelector((state) => state.tweetReducer);
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  let letter = userLogin.data.user_name.charAt(0).toUpperCase();
  const [showLetter, setShowLetter] = useState("");
  const [showName, setShowName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(async () => {
    const userData = await getUserData(props.userId);
    if (tweetListExplore) {
      setShowLetter(userData.data.user_name.charAt(0).toUpperCase());
      setShowName(userData.data.user_name);
    }
  }, [tweetListExplore, props.userId]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickDetele = () => {
    props.onDeleteTweet(props.tweetId);
  };

  return (
    <div className={classes.post}>
      <Avatar>{tweetListExplore ? showLetter : letter}</Avatar>
      <div className={classes.post__body}>
        <h4>{tweetListExplore ? showName : userLogin.data.user_name}</h4>
        <span style={{ wordBreak: "break-all" }}>{props.tweet}</span>
      </div>
      <div>
        {!tweetListExplore && (
          <Button
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreHorizIcon />
          </Button>
        )}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => props.onShowModal(true, props.tweetId, props.tweet)}
          >
            Edit
          </MenuItem>
          <MenuItem onClick={handleClickDetele}>Delete</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Post;
