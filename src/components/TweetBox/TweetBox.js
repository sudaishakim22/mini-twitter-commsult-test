import React, { useState, useEffect } from "react";
import classes from "./TweetBox.module.css";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

const TweetBox = ({ addTweetHandler }) => {
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  const [tweetMessage, setTweetMessage] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  let letter = userLogin.data.user_name.charAt(0).toUpperCase();

  useEffect(() => {
    setTimeout(() => {
      setFormIsValid(tweetMessage.trim().length > 0);
    }, 500);
  }, [tweetMessage]);

  const submitTweetHandler = (e) => {
    e.preventDefault();
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    let id = userLogin.data.user_id;
    let params = {
      userId: id,
      tweetBody: tweetMessage,
    };
    addTweetHandler(params);
    setTweetMessage("");
  };

  const onChangeTweetHandler = (e) => {
    setTweetMessage(e.target.value);
  };

  return (
    <div className={classes.tweetBox}>
      <form onSubmit={submitTweetHandler}>
        <div className={classes.tweetBox__input}>
          <Avatar>{letter}</Avatar>
          <TextField
            type="text"
            id="standard-basic"
            label="What's happening?"
            variant="standard"
            style={{ marginLeft: "10px", width: "100%" }}
            onChange={onChangeTweetHandler}
            value={tweetMessage}
            inputProps={{
              maxLength: 240,
            }}
          />
        </div>
        <Button
          type="submit"
          className={classes.tweetBox__tweetButton}
          disabled={!formIsValid}
        >
          Tweet
        </Button>
      </form>
    </div>
  );
};

export default TweetBox;
