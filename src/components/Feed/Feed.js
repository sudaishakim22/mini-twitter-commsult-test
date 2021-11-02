import React, { useEffect, useState } from "react";
import TweetBox from "../TweetBox/TweetBox";
import classes from "./Feed.module.css";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets, addTweet, deleteTweet } from "../../redux/actions";
import CircularProgress from "@mui/material/CircularProgress";
import ModalEdit from "../ModalEdit/ModalEdit";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import { getExploreTweet, getSortTweet } from "../../redux/services";

const Feed = ({ onClickLogout, onShowSidebar, searchData }) => {
  const dispatch = useDispatch();
  const { tweetListExplore } = useSelector((state) => state.tweetReducer);
  const [tweets, setTweets] = useState([]);
  const [editTweet, setEditTweet] = useState();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showMenuBar, setShowMenuBar] = useState(false);

  useEffect(() => {
    console.log("trigger");
    const fetchTweets = async () => {
      const userLogin = JSON.parse(localStorage.getItem("userLogin"));
      setLoading(true);
      const res = tweetListExplore
        ? await getExploreTweet()
        : await dispatch(getAllTweets(userLogin.data.user_id));
      if (res.status === 200) {
        setTweets(res.data);
        setLoading(false);
      }
    };
    if (searchData) {
      filterData(searchData);
    } else {
      fetchTweets();
    }

    showMenuBarHandler();
    window.addEventListener("resize", showMenuBarHandler);
  }, [dispatch, showModal, tweetListExplore, searchData]);

  const addTweetHandler = async (params) => {
    setLoading(true);
    const addResult = await dispatch(addTweet(params));
    if (addResult.status === 200) {
      setTweets((prevState) => [addResult.data.data, ...prevState]);
      setLoading(false);
    }
  };

  const deleteTweetHandler = async (id) => {
    const deleteResult = await dispatch(deleteTweet(id));
    if (deleteResult.status === 200) {
      setTweets(tweets.filter((tweet) => tweet.tweet_id !== id));
    }
  };

  const showModalHandler = (show, tweetId, tweet) => {
    setEditTweet({
      tweetId: tweetId,
      tweet: tweet,
    });
    setShowModal(show);
  };

  const closeModalHandler = (close) => {
    setShowModal(close);
  };

  const showMenuBarHandler = () => {
    if (window.innerWidth <= 660) {
      setShowMenuBar(true);
    } else {
      setShowMenuBar(false);
    }
  };

  const filterData = (searchData) => {
    const result = tweets.filter((data) => {
      return data.tweet_body.search(searchData) != -1;
    });
    setTweets(result);
  };

  const handleSortData = async (type) => {
    const resultSort = await getSortTweet(type);
    setTweets(resultSort.data);
  };

  return (
    <>
      <ModalEdit
        editTweet={editTweet ? editTweet : ""}
        show={showModal}
        onCloseModal={closeModalHandler}
      />
      <div className={classes.feed}>
        <div className={classes.feed__header}>
          {showMenuBar && (
            <MenuIcon
              style={{ cursor: "pointer" }}
              onClick={() => onShowSidebar()}
            />
          )}
          <h2>Home</h2>
          <Button
            variant="outlined"
            size="small"
            onClick={() => onClickLogout()}
          >
            logout
          </Button>
        </div>
        <TweetBox addTweetHandler={addTweetHandler} />
        <span
          onClick={() => handleSortData("ASC")}
          style={{ cursor: "pointer" }}
        >
          sort by ASC
        </span>
        <br />
        <span
          onClick={() => handleSortData("DESC")}
          style={{ cursor: "pointer" }}
        >
          sort by DESC
        </span>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          tweets.map((item) => {
            return (
              <Post
                userId={item.user_id}
                key={item.tweet_id}
                onShowModal={showModalHandler}
                tweetId={item.tweet_id}
                tweet={item.tweet_body}
                onDeleteTweet={deleteTweetHandler}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default Feed;
